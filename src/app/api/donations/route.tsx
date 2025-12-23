import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import DonationNotificationEmail from '@/emails/DonationNotificationEmail';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Resend API key is not configured.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const rawData = formData.get('data');
    const file = formData.get('file') as File | null;

    if (!rawData) {
      return NextResponse.json(
        { error: 'Missing donation data.' },
        { status: 400 }
      );
    }

    const data = JSON.parse(rawData as string);

    const attachments: any[] = [];

    if (data.donationType === 'pdf' && file) {
      const buffer = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(buffer),
      });
    }

    const emailHtml = render(
      <DonationNotificationEmail donationData={data} />
    );

    await resend.emails.send({
      from: 'donation-noreply@booksforfosters.com',
      to: ADMIN_EMAIL,
      subject: `New Book Donation Received: ${
        data.donationType === 'book' ? 'Physical Book' : 'PDF'
      }`,
      html: emailHtml,
      attachments,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Donation email error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process donation.' },
      { status: 500 }
    );
  }
}
