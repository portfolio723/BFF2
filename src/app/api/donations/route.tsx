import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import DonationNotificationEmail from "@/components/emails/DonationNotificationEmail";
import { render } from "@react-email/render";
import type { DonatedBook } from "@/lib/types";

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const supabase = await createClient();
  const formData = await request.formData();

  const { data: { user } } = await supabase.auth.getUser();

  const requiredFieldsBook = ["donorName", "donorEmail", "phone", "address", "city", "state", "pincode", "books"];
  const requiredFieldsPdf = ["donorName", "donorEmail", "pdfTitle", "pdfAuthor", "pdfFile"];

  const donationType = formData.get("donationType") as "book" | "pdf";
  const data: { [key: string]: any } = {
    donation_type: donationType,
    user_id: user?.id ?? null,
    status: 'pending',
  };

  const requiredFields = donationType === 'book' ? requiredFieldsBook : requiredFieldsPdf;
  const missingFields = [];

  for (const field of requiredFields) {
    const value = formData.get(field);
    if (!value) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 });
  }

  // Build the data object for Supabase and email
  const submissionData: any = { donationType };
  formData.forEach((value, key) => {
    submissionData[key] = value;
    if (key === 'books') {
      data['donated_books'] = JSON.parse(value as string);
    } else if (key !== 'pdfFile') {
      const supabaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      if(['donorName', 'donorEmail', 'address', 'city', 'state', 'pincode', 'phone'].includes(key)) {
        data[`pickup_${key.replace('donor', '').toLowerCase()}`] = value;
        if (key === 'donorName') data['donor_name'] = value;
        if (key === 'donorEmail') data['donor_email'] = value;
      } else {
        data[supabaseKey] = value;
      }
    }
  });


  let fileUrl = null;
  let fileName = null;
  const attachments: any[] = [];

  if (donationType === "pdf") {
    const pdfFile = formData.get("pdfFile") as File;
    fileName = `${Date.now()}-${pdfFile.name}`;
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("donations")
      .upload(fileName, pdfFile);

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ error: `Failed to upload PDF: ${uploadError.message}` }, { status: 500 });
    }

    // Get public URL for the email and to store in DB
    const { data: { publicUrl } } = supabase.storage.from("donations").getPublicUrl(fileName);
    fileUrl = publicUrl;
    data.file_url = fileUrl;
    data.file_name = pdfFile.name;

    // Prepare attachment for Resend
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    attachments.push({
      filename: pdfFile.name,
      content: buffer,
    });
  }

  // Insert into Supabase 'donations' table
  const { data: donationRecord, error: dbError } = await supabase
    .from("donations")
    .insert([data])
    .select()
    .single();

  if (dbError) {
    console.error("Supabase DB error:", dbError);
    return NextResponse.json({ error: `Database error: ${dbError.message}` }, { status: 500 });
  }
  
  // Send email with Resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (resend && ADMIN_EMAIL) {
    const emailHtml = render(<DonationNotificationEmail donationData={submissionData} />);

    await resend.emails.send({
      from: 'donation-noreply@booksforfosters.com',
      to: ADMIN_EMAIL,
      subject: `New Book Donation Received: ${data.donation_type === 'book' ? 'Physical Books' : 'PDF'}`,
      html: emailHtml,
      attachments: attachments,
    });
  }

  return NextResponse.json({ 
    message: "Donation submitted successfully!",
    donationId: donationRecord.id 
  }, { status: 201 });
}
