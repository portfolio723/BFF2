
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force the route to be configured for the Node.js runtime
export const runtime = 'nodejs';

export async function GET() {
  try {
    const dir = path.resolve('./public', 'upsc');

    if (!fs.existsSync(dir)) {
      // If the directory doesn't exist, return an empty array.
      // This prevents errors if the folder hasn't been created yet.
      return NextResponse.json([], { status: 200 });
    }

    const filenames = fs.readdirSync(dir);

    const pdfFiles = filenames
      .filter((file) => file.endsWith('.pdf'))
      .sort((a, b) => a.localeCompare(b)); // Sort alphabetically

    return NextResponse.json(pdfFiles, { status: 200 });

  } catch (error) {
    console.error('Error reading PDF directory:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to list PDFs';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
