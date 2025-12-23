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
  Button,
} from '@react-email/components';

interface DonationEmailProps {
  donationData: any;
}

const DonationNotificationEmail: React.FC<DonationEmailProps> = ({ donationData }) => {
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

  return (
    <Html>
      <Head>
        <title>New Book Donation Received</title>
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Donation Submission</Heading>
          <Text style={paragraph}>A new donation has been submitted on the Books For Fosters website. Please find the details below.</Text>

          <Section style={section}>
            <Heading as="h2" style={subheading}>Donor Information</Heading>
            <Text style={text}><strong>Name:</strong> {donorName}</Text>
            <Text style={text}><strong>Email:</strong> <a href={`mailto:${donorEmail}`}>{donorEmail}</a></Text>
            {isBookDonation && <Text style={text}><strong>Phone:</strong> {phone}</Text>}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>Donation Details</Heading>
            <Text style={text}><strong>Type:</strong> <span style={{ textTransform: 'capitalize' }}>{donationType}</span></Text>
            
            <Heading as="h3" style={bookHeading}>Donated Book(s)</Heading>
            {books.map((book: any, index: number) => (
              <div key={index} style={bookItem}>
                <Text style={bookText}><strong>Title:</strong> {book.title}</Text>
                <Text style={bookText}><strong>Author:</strong> {book.author}</Text>
                <Text style={bookText}><strong>Genre:</strong> {book.genre}</Text>
                <Text style={bookText}><strong>Quantity:</strong> {book.quantity}</Text>
              </div>
            ))}
          </Section>

          {isBookDonation && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading as="h2" style={subheading}>Pickup Address</Heading>
                <Text style={text}>{address}</Text>
                <Text style={text}>{city}, {state} {pincode}</Text>
                <Text style={{ ...text, marginTop: 10 }}>
                  Please contact the donor at <strong>{phone}</strong> to coordinate the pickup.
                </Text>
              </Section>
            </>
          )}
          
          {donationType === 'pdf' && (
             <Section style={section}>
                <Text style={text}>The submitted PDF is attached to this email.</Text>
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

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  padding: '0 20px',
};

const section = {
  padding: '0 24px',
};

const text = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 10px',
};

const bookHeading = {
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '20px 0 10px',
}

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
