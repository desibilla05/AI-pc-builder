import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const BUILDS_FILE = path.join(DATA_DIR, 'builds.json');

// Initialize database directories and files if they do not exist
function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
  if (!fs.existsSync(BUILDS_FILE)) {
    fs.writeFileSync(BUILDS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

// Read helper (JSON)
function readData(filePath) {
  try {
    initDb();
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading database file: ${filePath}`, err.message);
    return [];
  }
}

// Write helper (JSON)
function writeData(filePath, data) {
  try {
    initDb();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing to database file: ${filePath}`, err.message);
    return false;
  }
}

// MongoDB Setup
let mongoClient = null;
let mongoDb = null;
let isMongoConnected = false;

async function getMongoDb() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) return null;
  if (mongoDb) return mongoDb;
  
  try {
    console.log('[Database] Connecting to MongoDB Atlas...');
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    
    // Extract DB name from URI or default to 'buildforge'
    const dbName = MONGODB_URI.includes('.mongodb.net/') 
      ? MONGODB_URI.split('.mongodb.net/')[1]?.split('?')[0] || 'buildforge'
      : 'buildforge';
      
    mongoDb = mongoClient.db(dbName || 'buildforge');
    isMongoConnected = true;
    console.log(`[Database] Connected successfully to MongoDB Atlas database: ${dbName}`);
    return mongoDb;
  } catch (err) {
    console.error('[Database] Failed to connect to MongoDB Atlas, falling back to JSON storage.', err.message);
    mongoDb = null;
    isMongoConnected = false;
    return null;
  }
}

// DB Methods
export const db = {
  async connect() {
    return await getMongoDb();
  },
  // --- User operations ---
  async createUser(user) {
    const mongo = await getMongoDb();
    if (mongo) {
      await mongo.collection('users').insertOne(user);
      return user;
    }

    const users = readData(USERS_FILE);
    users.push(user);
    writeData(USERS_FILE, users);
    return user;
  },

  async findUserByEmail(email) {
    const mongo = await getMongoDb();
    const searchEmail = email.toLowerCase().trim();
    if (mongo) {
      // Case-insensitive regex check for query email
      return await mongo.collection('users').findOne({ 
        email: { $regex: new RegExp(`^${searchEmail}$`, 'i') } 
      });
    }

    const users = readData(USERS_FILE);
    return users.find(u => u.email.toLowerCase().trim() === searchEmail) || null;
  },

  async findUserById(id) {
    const mongo = await getMongoDb();
    if (mongo) {
      return await mongo.collection('users').findOne({ id });
    }

    const users = readData(USERS_FILE);
    return users.find(u => u.id === id) || null;
  },

  // --- Saved builds operations ---
  async saveBuild(build) {
    const mongo = await getMongoDb();
    if (mongo) {
      await mongo.collection('builds').insertOne(build);
      return build;
    }

    const builds = readData(BUILDS_FILE);
    builds.unshift(build); // Add new builds to the front
    writeData(BUILDS_FILE, builds);
    return build;
  },

  async getUserBuilds(userId) {
    const mongo = await getMongoDb();
    if (mongo) {
      return await mongo.collection('builds').find({ userId }).sort({ date: -1 }).toArray();
    }

    const builds = readData(BUILDS_FILE);
    return builds.filter(b => b.userId === userId);
  },

  async deleteBuild(buildId, userId) {
    const mongo = await getMongoDb();
    if (mongo) {
      const build = await mongo.collection('builds').findOne({ id: buildId });
      if (!build) {
        return { success: false, status: 404, message: 'Build not found.' };
      }
      if (build.userId !== userId) {
        return { success: false, status: 403, message: 'Forbidden: You do not own this build configuration.' };
      }
      await mongo.collection('builds').deleteOne({ id: buildId });
      return { success: true };
    }

    const builds = readData(BUILDS_FILE);
    const index = builds.findIndex(b => b.id === buildId);
    
    if (index === -1) {
      return { success: false, status: 404, message: 'Build not found.' };
    }
    
    // Check ownership (security check)
    if (builds[index].userId !== userId) {
      return { success: false, status: 403, message: 'Forbidden: You do not own this build configuration.' };
    }

    builds.splice(index, 1);
    writeData(BUILDS_FILE, builds);
    return { success: true };
  }
};
