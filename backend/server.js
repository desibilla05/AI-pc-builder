import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// 1. CORS Configuration (Explicit origin only, no wildcards in production)
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// 2. Rate Limiting Configurations
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 requests per minute
  message: { error: 'Too many requests from this IP, please try again after a minute.' },
  standardHeaders: true,
  legacyHeaders: false
});

const geminiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute for Gemini API calls
  message: { error: 'Rate limit exceeded. Too many requests. Please wait a moment before retrying.' },
  standardHeaders: true,
  legacyHeaders: false
});

// 3. GET /api/prices Endpoint
app.get('/api/prices', generalLimiter, (req, res) => {
  // Return empty prices object to allow safe client-side fallback to standard component spec prices.
  res.json({ prices: {} });
});

// 4. POST /api/gemini Endpoint
app.post('/api/gemini', geminiLimiter, async (req, res) => {
  const bodyData = req.body;

  // Simple Request Body Validation
  if (!bodyData || !bodyData.contents) {
    return res.status(400).json({ error: 'Bad Request: Missing contents in request body.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is not configured.');
    return res.status(500).json({ error: 'Internal Server Error: Gemini API key is not configured.' });
  }

  // Model Fallbacks matching the frontend logic
  const models = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-flash-latest'
  ];

  let lastError = null;

  for (const model of models) {
    try {
      console.log(`[Proxy] Forwarding request to Gemini API model: ${model}`);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }

      if (response.status === 429) {
        console.warn(`[Proxy] Model ${model} rate limited (429).`);
        return res.status(429).json({ error: 'Gemini API rate limit exceeded. Please try again later.' });
      }

      lastError = new Error(`Model ${model} returned status ${response.status}`);
      console.warn(`[Proxy] Model ${model} failed:`, lastError.message);
    } catch (err) {
      lastError = err;
      console.warn(`[Proxy] Fetch to Model ${model} failed:`, err.message);
    }
  }

  console.error('[Proxy] All fallback Gemini models failed:', lastError?.message);
  return res.status(502).json({ error: 'Bad Gateway: All fallback Gemini models failed to process the request.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`[BuildForge Backend] Secure server listening on port ${PORT}`);
  console.log(`[BuildForge Backend] CORS configured to accept requests from origin: ${FRONTEND_URL}`);
});
