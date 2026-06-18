import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { rateLimit } from 'express-rate-limit';
import { db } from './db.js';

dotenv.config();

// Connect to MongoDB Atlas (or fallback to local database) on startup
db.connect().catch(() => {});

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET || 'buildforge_super_secure_auth_secret_key_2026';

// 1. CORS Configuration (Explicit origin only, credentials allowed, no wildcards)
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 2. Rate Limiting Configurations (Disabled globally for testing)
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  skip: () => true,
  message: { error: 'Too many requests from this IP, please try again after a minute.' },
  standardHeaders: true,
  legacyHeaders: false
});

const geminiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  skip: () => true,
  message: { error: 'Rate limit exceeded. Too many requests. Please wait a moment before retrying.' },
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  skip: () => true,
  message: { error: 'Too many login or registration attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

// 3. Authentication Middleware
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Session token missing.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid or expired session token.' });
    }
    req.user = user;
    next();
  });
}

// 4. GET /api/prices Endpoint
app.get('/api/prices', generalLimiter, (req, res) => {
  res.json({ prices: {} });
});

// 5. POST /api/auth/register Endpoint
app.post('/api/auth/register', authLimiter, async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Validation Error: Name, email, and password are required.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Validation Error: Password must be at least 8 characters long.' });
  }

  try {
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Conflict: This email is already registered.' });
    }

    // Secure password hashing using bcryptjs with cost factor 12
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash
    };

    await db.createUser(newUser);

    // Sign session token (expires in 1 hour)
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set secure httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    return res.status(201).json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Internal Server Error: Failed to register user.' });
  }
});

// 6. POST /api/auth/login Endpoint
app.post('/api/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Validation Error: Email and password are required.' });
  }

  try {
    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Incorrect email or password.' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Unauthorized: Incorrect email or password.' });
    }

    // Sign session token (expires in 1 hour)
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set secure httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal Server Error: Failed to log in.' });
  }
});

// 7. POST /api/auth/logout Endpoint
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// 8. GET /api/auth/me Endpoint (Restores active session)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  return res.json({ user: req.user });
});

// 9. GET /api/builds Endpoint
app.get('/api/builds', authenticateToken, async (req, res) => {
  const builds = await db.getUserBuilds(req.user.id);
  return res.json({ savedBuilds: builds });
});

// 10. POST /api/builds Endpoint
app.post('/api/builds', authenticateToken, async (req, res) => {
  const buildData = req.body;

  if (!buildData) {
    return res.status(400).json({ error: 'Validation Error: Missing build configuration data.' });
  }

  const newBuild = {
    ...buildData,
    id: buildData.id || 'build-' + Date.now(),
    userId: req.user.id,
    date: buildData.date || new Date().toISOString()
  };

  await db.saveBuild(newBuild);
  return res.status(201).json(newBuild);
});

// 11. DELETE /api/builds/:id Endpoint
app.delete('/api/builds/:id', authenticateToken, async (req, res) => {
  const buildId = req.params.id;
  const result = await db.deleteBuild(buildId, req.user.id);

  if (!result.success) {
    return res.status(result.status).json({ error: result.message });
  }

  return res.json({ success: true, message: 'Build deleted successfully.' });
});

// 12. POST /api/gemini Endpoint (Gemini API Proxy)
app.post('/api/gemini', geminiLimiter, async (req, res) => {
  const bodyData = req.body;

  if (!bodyData || !bodyData.contents) {
    return res.status(400).json({ error: 'Bad Request: Missing contents in request body.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is not configured.');
    return res.status(500).json({ error: 'Internal Server Error: Gemini API key is not configured.' });
  }

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
