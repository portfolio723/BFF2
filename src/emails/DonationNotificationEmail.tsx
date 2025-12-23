type DonationData = {
  donorName: string;
  donorEmail: string;
  books: { title: string; author: string; quantity: number }[];
  donationType: 'book' | 'pdf';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
};

export default function DonationNotificationEmail({
  donationData,
}: {
  donationData: DonationData;
}) {
  const {
    donationType,
    books,
    donorName,
    donorEmail,
    address,
    city,
    state,
    pincode,
    phone,
  } = donationData;

  const isBookDonation = donationType === 'book';

  const booksHtml = books.map(book => `
    <div style="border-left: 3px solid #eee; padding-left: 15px; margin-bottom: 15px;">
      <p style="margin: 0 0 5px;"><strong>Title:</strong> ${book.title}</p>
      <p style="margin: 0 0 5px;"><strong>Author:</strong> ${book.author}</p>
      <p style="margin: 0 0 5px;"><strong>Quantity:</strong> ${book.quantity}</p>
    </div>
  `).join('');

  const addressHtml = isBookDonation ? `
    <hr style="border-color: #e6ebf1; margin: 20px 0;" />
    <div style="padding: 0 24px;">
      <h2 style="color: #333; font-size: 18px; font-weight: bold; margin: 0 0 15px;">Pickup Address</h2>
      <p style="color: #525f7f; font-size: 14px; line-height: 24px; margin: 0 0 10px;">${address}</p>
      <p style="color: #525f7f; font-size: 14px; line-height: 24px; margin: 0 0 10px;">${city}, ${state} ${pincode}</p>
      <p style="color: #525f7f; font-size: 14px; line-height: 24px; margin: 10px 0;">
        Please contact the donor at <strong>${phone}</strong> to coordinate the pickup.
      </p>
    </div>
  ` : '';

  return `
    <html>
      <body style="background-color: #f6f9fc; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Ubuntu,sans-serif;">
        <div style="background-color: #ffffff; margin: 0 auto; padding: 20px 0 48px; margin-bottom: 64px; border: 1px solid #e6ebf1; border-radius: 8px;">
          <h1 style="color: #333; font-size: 24px; font-weight: bold; text-align: center; margin: 30px 0;">New Donation Submission</h1>
          <p style="color: #525f7f; font-size: 16px; line-height: 24px; text-align: center; padding: 0 20px;">A new donation has been submitted on the Books For Fosters website. Please find the details below.</p>
          
          <div style="padding: 0 24px;">
            <h2 style="color: #333; font-size: 18px; font-weight: bold; margin: 0 0 15px;">Donor Information</h2>
            <p style="color: #525f7f; font-size: 14px; line-height: 24px; margin: 0 0 10px;"><strong>Name:</strong> ${donorName}</p>
            <p style="color: #525f7f; font-size: 14px; line-height: 24px; margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${donorEmail}">${donorEmail}</a></p>
            ${isBookDonation ? `<p style="color: #525f7f; font-size: 14px; line-height: 24px; margin: 0 0 10px;"><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>

          <hr style="border-color: #e6ebf1; margin: 20px 0;" />

          <div style="padding: 0 24px;">
            <h2 style="color: #333; font-size: 18px; font-weight: bold; margin: 0 0 15px;">Donation Details</h2>
            <p style="color: #525f7f; font-size: 14px; line-height: 24px; margin: 0 0 10px;"><strong>Type:</strong> <span style="text-transform: capitalize;">${donationType}</span></p>
            <h3 style="color: #333; font-size: 16px; font-weight: bold; margin: 20px 0 10px;">Donated Book(s)</h3>
            ${booksHtml}
          </div>

          ${addressHtml}

          ${donationType === 'pdf' ? `
            <div style="padding: 0 24px;">
              <p style="color: #525f7f; font-size: 14px; line-height: 24px; margin: 0 0 10px;">The submitted PDF is attached to this email.</p>
            </div>
          ` : ''}

          <hr style="border-color: #e6ebf1; margin: 20px 0;" />

          <p style="color: #8898aa; font-size: 12px; line-height: 16px; text-align: center;">This is an automated notification from the Books For Fosters donation form.</p>
        </div>
      </body>
    </html>
  `;
}
