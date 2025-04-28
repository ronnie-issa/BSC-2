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
  Row,
  Column,
} from '@react-email/components';
import type { Product } from '@/contexts/ProductContext';

interface OrderConfirmationEmailProps {
  name: string;
  orderNumber: string;
  products: Product[];
  total: number;
  shippingAddress?: string;
}

const baseUrl = process.env.SITE_URL || 'https://omnis-lb.netlify.app';

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  name,
  orderNumber,
  products,
  total,
  shippingAddress,
}) => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Html>
      <Head />
      <Preview>Your OMNIS Order Confirmation #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>OMNIS</Heading>
          </Section>
          
          <Section style={content}>
            <Heading as="h1" style={heading}>ORDER CONFIRMED</Heading>
            
            <Hr style={divider} />
            
            <Text style={paragraph}>
              Thank you for your purchase
            </Text>
            
            <Text style={paragraph}>
              Your order has been confirmed and will be shipped soon
            </Text>
            
            <Section style={orderDetailsSection}>
              <Row>
                <Column style={column}>
                  <Heading as="h2" style={subheading}>What's Next</Heading>
                  
                  <div style={stepContainer}>
                    <div style={stepNumber}>01</div>
                    <div style={stepContent}>
                      <Text style={stepTitle}>Order Processing</Text>
                      <Text style={stepDescription}>
                        We're preparing your items for shipment. You'll receive a notification when your order ships.
                      </Text>
                    </div>
                  </div>
                  
                  <div style={stepContainer}>
                    <div style={stepNumber}>02</div>
                    <div style={stepContent}>
                      <Text style={stepTitle}>Shipping</Text>
                      <Text style={stepDescription}>
                        Your order will be delivered within 3-5 business days. We'll send tracking information once available.
                      </Text>
                    </div>
                  </div>
                  
                  <div style={stepContainer}>
                    <div style={stepNumber}>03</div>
                    <div style={stepContent}>
                      <Text style={stepTitle}>Enjoy Your Purchase</Text>
                      <Text style={stepDescription}>
                        We hope you love your new items. Tag us on social media with #OMNIS to share your style.
                      </Text>
                    </div>
                  </div>
                </Column>
                
                <Column style={column}>
                  <Heading as="h2" style={subheading}>Order Details</Heading>
                  
                  <div style={orderInfoContainer}>
                    <div style={orderInfoRow}>
                      <Text style={orderInfoLabel}>Order Number</Text>
                      <Text style={orderInfoValue}>{orderNumber}</Text>
                    </div>
                    <div style={orderInfoRow}>
                      <Text style={orderInfoLabel}>Order Date</Text>
                      <Text style={orderInfoValue}>{formattedDate}</Text>
                    </div>
                    <div style={orderInfoRow}>
                      <Text style={orderInfoLabel}>Payment Method</Text>
                      <Text style={orderInfoValue}>WhatsApp Order</Text>
                    </div>
                  </div>
                  
                  <Heading as="h3" style={sectionTitle}>Items Purchased</Heading>
                  
                  {products.map((product, index) => (
                    <div key={index} style={productContainer}>
                      <div style={productImageContainer}>
                        {/* Product image placeholder */}
                      </div>
                      <div style={productDetails}>
                        <Text style={productName}>{product.name}</Text>
                        <Text style={productVariation}>
                          Variation: {product.selectedColor || 'Default'}
                        </Text>
                        <Text style={productPrice}>${product.price.toFixed(2)}</Text>
                      </div>
                    </div>
                  ))}
                  
                  <div style={totalContainer}>
                    <Text style={totalLabel}>Total</Text>
                    <Text style={totalValue}>${total.toFixed(2)}</Text>
                  </div>
                  
                  {shippingAddress && (
                    <>
                      <Heading as="h3" style={sectionTitle}>Shipping Address</Heading>
                      <Text style={shippingAddressText}>{shippingAddress}</Text>
                    </>
                  )}
                </Column>
              </Row>
            </Section>
            
            <Section style={ctaSection}>
              <Button href={`${baseUrl}/shop`} style={button}>
                CONTINUE SHOPPING
              </Button>
            </Section>
          </Section>
          
          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} OMNIS. All rights reserved.
            </Text>
            <Text style={footerText}>
              If you have any questions, please contact us at <Link href="mailto:support@omnis-lb.com" style={link}>support@omnis-lb.com</Link>
            </Text>
            <Text style={footerText}>
              <Link href={`${baseUrl}/legal`} style={link}>Privacy Policy</Link> | 
              <Link href={`${baseUrl}/legal/terms`} style={link}>Terms of Service</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#000',
  fontFamily: 'Arial, sans-serif',
  lineHeight: 1.6,
  color: '#fff',
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
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const logo = {
  margin: '0',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '-1px',
};

const content = {
  padding: '20px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '20px 0',
  letterSpacing: '-0.5px',
};

const divider = {
  width: '40px',
  margin: '0 auto',
  borderColor: '#fff',
};

const paragraph = {
  margin: '8px 0',
  textAlign: 'center' as const,
  color: 'rgba(255, 255, 255, 0.8)',
};

const orderDetailsSection = {
  marginTop: '40px',
};

const column = {
  padding: '0 10px',
  verticalAlign: 'top',
};

const subheading = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const stepContainer = {
  display: 'flex',
  marginBottom: '20px',
};

const stepNumber = {
  backgroundColor: '#fff',
  color: '#000',
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '15px',
  fontSize: '12px',
  fontWeight: 'bold',
  border: '1px solid #000',
};

const stepContent = {
  flex: '1',
};

const stepTitle = {
  fontWeight: 'bold',
  margin: '0 0 5px 0',
};

const stepDescription = {
  margin: '0',
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.8)',
};

const orderInfoContainer = {
  marginBottom: '20px',
};

const orderInfoRow = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '8px 0',
};

const orderInfoLabel = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '14px',
  margin: '0',
};

const orderInfoValue = {
  color: '#fff',
  fontSize: '14px',
  margin: '0',
};

const sectionTitle = {
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  marginTop: '20px',
  marginBottom: '10px',
};

const productContainer = {
  display: 'flex',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '10px 0',
};

const productImageContainer = {
  width: '40px',
  height: '40px',
  backgroundColor: '#333',
  marginRight: '10px',
};

const productDetails = {
  flex: '1',
};

const productName = {
  fontWeight: 'bold',
  margin: '0',
  fontSize: '14px',
};

const productVariation = {
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.8)',
  margin: '4px 0',
};

const productPrice = {
  fontSize: '14px',
  margin: '0',
};

const totalContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '15px 0',
  marginTop: '10px',
  fontWeight: 'bold',
};

const totalLabel = {
  margin: '0',
};

const totalValue = {
  margin: '0',
};

const shippingAddressText = {
  fontSize: '14px',
  margin: '0',
  color: 'rgba(255, 255, 255, 0.8)',
};

const ctaSection = {
  textAlign: 'center' as const,
  marginTop: '40px',
};

const button = {
  backgroundColor: '#fff',
  color: '#000',
  padding: '12px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  borderRadius: '0',
  fontWeight: 'bold',
  border: '1px solid #fff',
};

const hr = {
  borderColor: 'rgba(255, 255, 255, 0.1)',
  margin: '30px 0',
};

const footer = {
  padding: '0 20px 20px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.6)',
  margin: '8px 0',
};

const link = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 5px',
};

export default OrderConfirmationEmail;
