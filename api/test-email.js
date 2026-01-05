import { Resend } from 'resend';

export default async function handler(req, res) {
  try {
    console.log('🔑 Testing Resend configuration...');
    console.log('🔑 API Key present:', !!process.env.RESEND_API_KEY);
    console.log('🔑 API Key prefix:', process.env.RESEND_API_KEY?.substring(0, 7));
    
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        error: 'RESEND_API_KEY not configured' 
      });
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    console.log('📧 Attempting to send test email...');
    
    const { data, error } = await resend.emails.send({
      from: 'PricingPro <contact@pricingpro.fr>',
      to: ['aldesousa03@gmail.com'],
      subject: '✅ Test Email - PricingPro',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #9333ea;">🎉 Ça marche !</h1>
          <p>Resend est correctement configuré sur votre domaine <strong>pricingpro.fr</strong></p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return res.status(400).json({ 
        success: false, 
        error: error 
      });
    }

    console.log('✅ Test email sent successfully:', data);
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      data: data 
    });
    
  } catch (error) {
    console.error('❌ Catch error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    });
  }
}