
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 🔑 Replace these with your actual Supabase project URL and service role key.
// You can find these in your Supabase project's API settings.
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SERVICE_ROLE_KEY = 'YOUR_SERVICE_ROLE_KEY';

// --- Script Configuration ---
// The local directory where your PDFs are stored.
const UPSC_DIR = './UPSC'; 
// The name of your Supabase Storage bucket.
const BUCKET_NAME = 'books-pdfs';
// The name of the database table to store PDF metadata.
const TABLE_NAME = 'pdf_books';
// A category/genre to assign to all uploaded PDFs.
const GENRE = 'UPSC';

async function uploadUPSC() {
  if (SUPABASE_URL.includes('YOUR_PROJECT_ID')) {
    console.error('❌ Error: Please replace placeholder values in scripts/upload_pdfs.js before running.');
    return;
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  if (!fs.existsSync(UPSC_DIR)) {
    console.error(`❌ Error: Directory not found at '${UPSC_DIR}'. Please create it and add your PDF files.`);
    return;
  }

  console.log(`🔍 Reading files from '${UPSC_DIR}'...`);
  const files = fs.readdirSync(UPSC_DIR);
  const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

  if (pdfFiles.length === 0) {
    console.warn('⚠️ No PDF files found in the directory. Exiting.');
    return;
  }
  
  console.log(`Found ${pdfFiles.length} PDF(s) to upload.`);

  for (const file of pdfFiles) {
    const storagePath = `${GENRE}/${file}`;
    const localFilePath = path.join(UPSC_DIR, file);
    const fileBuffer = fs.readFileSync(localFilePath);

    try {
      // 1️⃣ Upload to Storage
      console.log(`  Uploading '${file}' to Supabase Storage...`);
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // 2️⃣ Get Public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);
      
      if (!urlData || !urlData.publicUrl) {
        throw new Error('Could not get public URL for the uploaded file.');
      }

      // 3️⃣ Insert DB record
      console.log(`  Adding record to '${TABLE_NAME}' table...`);
      const { error: insertError } = await supabase.from(TABLE_NAME).insert({
        title: file.replace(/\.pdf$/i, '').replace(/_/g, ' '),
        genre: GENRE,
        file_path: storagePath,
        file_url: urlData.publicUrl,
        is_free: true
      });

      if (insertError) throw insertError;

      console.log(`✅ Successfully uploaded and recorded: ${file}\n`);

    } catch (error) {
      console.error(`❌ Failed to process '${file}':`, error.message);
    }
  }
  console.log('🎉 All files processed.');
}

uploadUPSC();
