
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const supabase = await createClient();
  const formData = await request.formData();

  const { data: { user } } = await supabase.auth.getUser();

  const donationType = formData.get("donationType") as "book" | "pdf";
  const data: { [key: string]: any } = {
    donation_type: donationType,
    user_id: user?.id ?? null,
    status: 'pending',
  };

  const requiredFieldsBook = ["donorName", "donorEmail", "phone", "address", "city", "state", "pincode", "books"];
  const requiredFieldsPdf = ["donorName", "donorEmail", "pdfTitle", "pdfAuthor", "pdfFile"];

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

  // Build the data object for Supabase
  formData.forEach((value, key) => {
    if (key === 'books') {
      data['donated_books'] = JSON.parse(value as string);
    } else if (key !== 'pdfFile') {
      const supabaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      if(['donorName', 'donorEmail', 'address', 'city', 'state', 'pincode', 'phone'].includes(key)) {
        // Custom mapping for pickup details to match schema
        if (key === 'donorName') data['donor_name'] = value;
        else if (key === 'donorEmail') data['donor_email'] = value;
        else data[`pickup_${key}`] = value;

      } else {
        data[supabaseKey] = value;
      }
    }
  });


  if (donationType === "pdf") {
    const pdfFile = formData.get("pdfFile") as File;
    const fileName = `${Date.now()}-${pdfFile.name}`;
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("donations")
      .upload(fileName, pdfFile);

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ error: `Failed to upload PDF: ${uploadError.message}` }, { status: 500 });
    }

    // Get public URL to store in DB
    const { data: { publicUrl } } = supabase.storage.from("donations").getPublicUrl(fileName);
    data.file_url = publicUrl;
    data.file_name = pdfFile.name;
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

  return NextResponse.json({ 
    message: "Donation submitted successfully!",
    donationId: donationRecord.id 
  }, { status: 201 });
}
