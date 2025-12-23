import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Section,
  Hr,
} from '@react-email/components';
import type { DonatedBook } from '@/lib/types';

type DonationData = {
  donationType: 'book' | 'pdf';
  books?: string; // This will be a JSON string
  pdfTitle?: string;
  pdfAuthor?: string;
  pdfGenre?: string;
  pdfFile?: File;
  donorName: string;
  donorEmail: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
};

const DonationNotificationEmail: React.FC<{ donationData: DonationData }> = ({ donationData }) => {
  const isBookDonation = donationData.donationType === 'book';
  const books: DonatedBook[] = donationData.books ? JSON.parse(donationData.books) : [];

  return (
    <Html>
      <Head>
        <title>New Donation Submission</title>
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>📚 New Donation Received</Heading>
          
          <Section style={section}>
            <Heading as="h2" style={subheading}>Donation Type</Heading>
            <Text style={text}><strong style={capitalize}>{donationData.donationType}</strong></Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>Donor Information</Heading>
            <Text style={text}><strong>Name:</strong> {donationData.donorName}</Text>
            <Text style={text}><strong>Email:</strong> <a href={`mailto:${donationData.donorEmail}`}>{donationData.donorEmail}</a></Text>
            {isBookDonation && <Text style={text}><strong>Phone:</strong> {donationData.phone}</Text>}
          </Section>
          
          <Hr style={hr} />

          {isBookDonation ? (
            <>
              <Section style={section}>
                <Heading as="h2" style={subheading}>Donated Books</Heading>
                {books.map((book: DonatedBook, index: number) => (
                  <div key={index} style={bookItem}>
                    <Text style={bookText}><strong>Title:</strong> {book.title}</Text>
                    <Text style={bookText}><strong>Author:</strong> {book.author}</Text>
                    {book.genre && <Text style={bookText}><strong>Genre:</strong> {book.genre}</Text>}
                    <Text style={bookText}><strong>Quantity:</strong> {book.quantity}</Text>
                  </div>
                ))}
              </Section>

              <Hr style={hr} />

              <Section style={section}>
                <Heading as="h2" style={subheading}>Pickup Address</Heading>
                <Text style={text}>{donationData.address}</Text>
                <Text style={text}>{donationData.city}, {donationData.state} - {donationData.pincode}</Text>
              </Section>
            </>
          ) : (
             <Section style={section}>
                <Heading as="h2" style={subheading}>PDF Details</Heading>
                <Text style={text}><strong>Title:</strong> {donationData.pdfTitle}</Text>
                <Text style={text}><strong>Author:</strong> {donationData.pdfAuthor}</Text>
                {donationData.pdfGenre && <Text style={text}><strong>Genre:</strong> {donationData.pdfGenre}</Text>}
                <Text style={{ ...text, marginTop: '10px' }}>The PDF file is attached to this email.</Text>
             </Section>
          )}

          <Hr style={hr} />

          <Text style={footer}>This is an automated notification from the Books For Fosters donation form.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default DonationNotificationEmail;


// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
};

const heading = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const subheading = {
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 15px',
}

const section = {
  padding: '0 24px',
};

const text = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 10px',
};

const bookItem = {
    borderLeft: '3px solid #eee',
    paddingLeft: '15px',
    marginBottom: '15px',
};

const bookText = {
  ...text,
  margin: '0 0 5px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};

const capitalize = {
    textTransform: 'capitalize' as const
}
