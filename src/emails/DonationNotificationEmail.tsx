import React from 'react';

type DonationData = {
  donorName: string;
  donorEmail: string;
  bookTitle: string;
  donationType: 'book' | 'pdf';
  category: string;
};

export default function DonationNotificationEmail({
  donationData,
}: {
  donationData: DonationData;
}) {
  return (
    <div style={{ fontFamily: 'Arial', padding: '24px' }}>
      <h2>📚 New Donation Submitted</h2>

      <p><strong>Donor:</strong> {donationData.donorName}</p>
      <p><strong>Email:</strong> {donationData.donorEmail}</p>
      <p><strong>Book Title:</strong> {donationData.bookTitle}</p>
      <p><strong>Type:</strong> {donationData.donationType}</p>
      <p><strong>Category:</strong> {donationData.category}</p>

      <hr />
      <p>Please review this donation in the admin dashboard.</p>
    </div>
  );
}
