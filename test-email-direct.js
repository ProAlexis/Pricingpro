import 'dotenv/config';
import { Resend } from 'resend';

async function test() {
  console.log('🔑 Testing Resend configuration...');
  console.log('🔑 API Key present:', !!process.env.RESEND_API_KEY);
  console.log('🔑 API Key prefix:', process.env.RESEND_API_KEY?.substring(0, 7));
  
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not configured');
    return;
  }
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  console.log('📧 Attempting to send test email...');
  
  const { data, error } = await resend.emails.send({
    from: 'PricingPro <contact@pricingpro.fr>',
    to: ['aldesousa03@gmail.com'],
    subject: '✅ Test Email - PricingPro Local',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #9333ea;">🎉 Test Local !</h1>
        <p>Resend fonctionne depuis votre machine locale</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      </div>
    `,
  });
  
  if (error) {
    console.error('❌ Resend error:', error);
    return;
  }
  
  console.log('✅ Test email sent successfully:', data);
}

test().catch(console.error);