export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      error: 'RESEND_API_KEY environment variable is not configured on Vercel. Please add it to your Vercel project settings.' 
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Veloura Security <onboarding@resend.dev>',
        to: email,
        subject: 'Your Veloura OTP Verification Code',
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #222; border-radius: 10px; background-color: #121212; color: #F8F4EE;">
            <h2 style="color: #C9A86A; text-align: center; font-family: serif; font-size: 26px; letter-spacing: 2px; margin-top: 10px;">VELOURA</h2>
            <div style="border-bottom: 1px solid #222; margin-bottom: 25px; margin-top: 15px;"></div>
            <p style="font-size: 15px; color: #F8F4EE;">Hello,</p>
            <p style="font-size: 14px; line-height: 1.6; color: rgba(248, 244, 238, 0.7);">You requested a one-time verification code to sign in to your Veloura account.</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #C9A86A; background-color: rgba(201, 168, 106, 0.08); padding: 12px 24px; border-radius: 6px; border: 1px dashed rgba(201, 168, 106, 0.3); display: inline-block;">${otp}</span>
            </div>
            <p style="font-size: 12px; color: rgba(248, 244, 238, 0.4); text-align: center; margin-top: 20px;">This code is valid for 5 minutes. If you did not request this, you can safely ignore this email.</p>
            <div style="border-top: 1px solid #222; margin-top: 30px; padding-top: 15px; font-size: 11px; color: rgba(248, 244, 238, 0.3); text-align: center;">
              © 2026 Veloura Handcrafted Luxury Candles. All rights reserved.
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
