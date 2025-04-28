import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface WelcomeEmailProps {
  name?: string;
}

const baseUrl = process.env.SITE_URL || 'https://omnis-lb.netlify.app';

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name = 'there' }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to OMNIS - Thank you for subscribing!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>OMNIS</Heading>
          </Section>
          
          <Section style={content}>
            <Heading as="h2" style={heading}>Welcome to Our Community!</Heading>
            
            <Text style={paragraph}>
              Thank you for subscribing to the OMNIS newsletter. We're excited to have you join our community of fashion enthusiasts.
            </Text>
            
            <Text style={paragraph}>
              As a subscriber, you'll be the first to know about:
            </Text>
            
            <ul style={list}>
              <li style={listItem}>New collection releases</li>
              <li style={listItem}>Exclusive offers and promotions</li>
              <li style={listItem}>Behind-the-scenes content</li>
              <li style={listItem}>Style tips and inspiration</li>
            </ul>
            
            <Text style={paragraph}>
              Stay tuned for our upcoming releases and special offers!
            </Text>
            
            <Button
              href={`${baseUrl}/shop`}
              style={button}
            >
              EXPLORE OUR COLLECTION
            </Button>
          </Section>
          
          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} OMNIS. All rights reserved.
            </Text>
            <Text style={footerText}>
              You're receiving this email because you subscribed to our newsletter.
            </Text>
            <Text style={footerText}>
              <Link href={`${baseUrl}/legal`} style={link}>Privacy Policy</Link> | 
              <Link href="[unsubscribe_url]" style={link}>Unsubscribe</Link>
            </Text>
            <Text style={footerText}>
              <Link href="https://instagram.com/omnis" style={link}>Instagram</Link> | 
              <Link href="https://facebook.com/omnis" style={link}>Facebook</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif',
  lineHeight: 1.6,
  color: '#333',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '-1px',
};

const content = {
  padding: '20px',
  backgroundColor: '#fff',
};

const heading = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  margin: '16px 0',
};

const list = {
  margin: '16px 0',
  paddingLeft: '20px',
};

const listItem = {
  margin: '8px 0',
};

const button = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '12px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  borderRadius: '0',
  fontWeight: 'bold',
  marginTop: '20px',
};

const hr = {
  borderColor: '#eee',
  margin: '0',
};

const footer = {
  padding: '20px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#777',
  margin: '8px 0',
};

const link = {
  color: '#000',
  textDecoration: 'none',
  margin: '0 5px',
};

export default WelcomeEmail;
