
'use server';

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { DonatedBook } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const supabase = await createClient();
  const formData = await request.formData();

  const rawData = formData.get('data');
  const file = formData.get('file') as File | null;
  
  if (!rawData) {
    return NextResponse.json({ error: 'Missing donation data.' }, { status: 400 });
  }

  const data = JSON.parse(rawData as string);

  const { data: { user } } = await supabase.auth.getUser();

  // 1. Insert into donations table
  const donationPayload: any = {
    user_id: user?.id ?? null,
    donor_name: data.donorName,
    donor_email: data.donorEmail,
    donation_type: data.donationType,
    status: 'pending',
  };
  
  if (data.donationType === 'book') {
    donationPayload.pickup_address = data.address;
    donationPayload.pickup_city = data.city;
    donationPayload.pickup_state = data.state;
    donationPayload.pickup_pincode = data.pincode;
    donationPayload.pickup_phone = data.phone;
    donationPayload.pickup_date = data.pickupDate;
    donationPayload.status = 'pickup_scheduled';
  }

  const { data: donation, error: donationError } = await supabase
    .from('donations')
    .insert(donationPayload)
    .select()
    .single();

  if (donationError) {
    console.error('Error inserting donation:', donationError);
    return NextResponse.json({ error: donationError.message }, { status: 500 });
  }

  // 2. Handle file upload for PDFs
  if (data.donationType === 'pdf' && file) {
    const filePath = `donations/${donation.id}/${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('pdfs')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading PDF:', uploadError);
      // Optional: Delete the donation record if upload fails
      await supabase.from('donations').delete().eq('id', donation.id);
      return NextResponse.json({ error: 'Failed to upload PDF.' }, { status: 500 });
    }
    
    const { data: { publicUrl } } = supabase.storage.from('pdfs').getPublicUrl(filePath);

    // Update donation with file info
    const { error: updateError } = await supabase
      .from('donations')
      .update({ file_name: file.name, file_url: publicUrl, status: 'completed' })
      .eq('id', donation.id);
      
     if (updateError) {
        console.error('Error updating donation with file URL:', updateError);
     }
  }

  // 3. Insert into donated_books table
  const booksToInsert = data.books.map((book: DonatedBook) => ({
    donation_id: donation.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    quantity: book.quantity,
  }));
  
  const { error: booksError } = await supabase
    .from('donated_books')
    .insert(booksToInsert);

  if (booksError) {
    console.error('Error inserting donated books:', booksError);
    // Optional: Clean up created donation record
    await supabase.from('donations').delete().eq('id', donation.id);
    return NextResponse.json({ error: booksError.message }, { status: 500 });
  }

  // 4. Send email confirmation (Resend integration placeholder)
  // try {
  //   await resend.emails.send({
  //     from: 'donations@booksforfosters.com',
  //     to: data.donorEmail,
  //     subject: 'Your Donation to Books For Fosters',
  //     react: <DonationConfirmationEmail donation={data} />,
  //   });
  // } catch (emailError) {
  //   console.error('Failed to send confirmation email:', emailError);
  //   // Don't block the response for email failure
  // }

  return NextResponse.json({ success: true, donationId: donation.id }, { status: 200 });
}
