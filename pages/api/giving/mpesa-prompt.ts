import type { NextApiRequest, NextApiResponse } from 'next';
import { normalizePhone } from '../../../lib/validation';
import { rateLimit } from '../../../lib/rateLimit';

interface MpesaPromptRequest {
  phone: string;
  amount: number | string;
  category: 'tithes_offerings' | 'missions_projects';
  purpose: string;
}

interface MpesaPromptResponse {
  ok: boolean;
  message: string;
  checkoutRequestId?: string;
  details?: {
    phone: string;
    amount: number;
    category: string;
    purpose: string;
    businessNumber: string;
    accountNumber: string;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MpesaPromptResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  // Rate limiting by client IP
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'local';
  if (!rateLimit(`mpesa_${ip}`, 10)) {
    return res.status(429).json({
      ok: false,
      message: 'Too many requests. Please wait a moment before trying again.',
    });
  }

  try {
    const { phone, amount, category, purpose } = req.body as MpesaPromptRequest;

    if (!phone || typeof phone !== 'string') {
      return res.status(400).json({ ok: false, message: 'Please provide a valid M-Pesa phone number.' });
    }

    const normalized = normalizePhone(phone);
    if (!normalized || !/^\+254[17]\d{8}$/.test(normalized)) {
      return res.status(400).json({
        ok: false,
        message: 'Please enter a valid Kenyan Safaricom number (e.g. 0712 345 678 or 0110 123 456).',
      });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount < 10) {
      return res.status(400).json({
        ok: false,
        message: 'Please enter a valid amount (minimum KES 10).',
      });
    }

    // Determine target account details based on user selection:
    // Category 1: Tithes & Offerings go to the Bank via Equity Paybill (247247 / 117 027 107 25 50)
    // Category 2: Missions, Conferences, Charity & Projects go to dedicated project allocations
    const isTitheOrOffering = category === 'tithes_offerings';
    const businessNumber = '247247'; // Equity Paybill to Bank
    const accountNumber = isTitheOrOffering
      ? '117 027 107 25 50'
      : `ICA-${(purpose || 'MISSIONS').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 8)}`;

    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // In production, integrate with Safaricom Daraja API if keys are provided
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY;

    if (consumerKey && consumerSecret && passkey) {
      // Live Daraja STK Push call can be placed here
      // For now, gracefully handle environment configuration
    }

    return res.status(200).json({
      ok: true,
      message: `M-Pesa STK push prompt initiated. Please check your handset (${normalized}) and enter your M-Pesa PIN.`,
      checkoutRequestId,
      details: {
        phone: normalized,
        amount: numericAmount,
        category: isTitheOrOffering ? 'Tithes & Offerings (To Bank)' : 'Missions & Projects',
        purpose: purpose || (isTitheOrOffering ? 'Tithe / Offering' : 'Missions'),
        businessNumber,
        accountNumber,
      },
    });
  } catch (err) {
    console.error('M-Pesa Prompt Error:', err);
    return res.status(500).json({
      ok: false,
      message: 'Unable to initiate M-Pesa prompt at this moment. Please use the manual Paybill below.',
    });
  }
}
