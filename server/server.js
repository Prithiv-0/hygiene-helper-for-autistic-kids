import http from 'http';
import { MongoClient, ObjectId } from 'mongodb';
import { parse } from 'url';

const PORT = 5000;

// MongoDB connection - Update with your MongoDB Atlas connection string
const MONGO_URI = 'mongodb://localhost:27017';
const client = new MongoClient(MONGO_URI);

let db;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db('hygiene_navigator');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

connectDB();

// Helper function to parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  const { pathname } = parse(req.url, true);

  try {
    // ===== CAREGIVER ROUTES =====
    if (req.method === 'POST' && pathname === '/api/caregivers') {
      const data = await parseBody(req);
      const result = await db.collection('caregivers').insertOne({ ...data, createdAt: new Date() });
      res.writeHead(201);
      res.end(JSON.stringify({ _id: result.insertedId, ...data }));
    }
    
    else if (req.method === 'GET' && pathname === '/api/caregivers') {
      const caregivers = await db.collection('caregivers').find({}).toArray();
      res.writeHead(200);
      res.end(JSON.stringify(caregivers));
    }

    // ===== CHILD PROFILE ROUTES =====
    else if (req.method === 'POST' && pathname === '/api/children') {
      const data = await parseBody(req);
      const result = await db.collection('childProfiles').insertOne({ ...data, createdAt: new Date() });
      res.writeHead(201);
      res.end(JSON.stringify({ _id: result.insertedId, ...data }));
    }
    
    else if (req.method === 'GET' && pathname === '/api/children') {
      const children = await db.collection('childProfiles').find({}).toArray();
      res.writeHead(200);
      res.end(JSON.stringify(children));
    }

    else if (req.method === 'GET' && pathname.startsWith('/api/children/')) {
      const id = pathname.split('/')[3];
      const child = await db.collection('childProfiles').findOne({ _id: new ObjectId(id) });
      res.writeHead(200);
      res.end(JSON.stringify(child));
    }

    // ===== ROUTINE ROUTES =====
    else if (req.method === 'POST' && pathname === '/api/routines') {
      const data = await parseBody(req);
      const result = await db.collection('routines').insertOne({ 
        ...data, 
        createdAt: new Date(),
        lastModified: new Date()
      });
      res.writeHead(201);
      res.end(JSON.stringify({ _id: result.insertedId, ...data }));
    }
    
    else if (req.method === 'GET' && pathname === '/api/routines') {
      const routines = await db.collection('routines').find({}).toArray();
      res.writeHead(200);
      res.end(JSON.stringify(routines));
    }

    else if (req.method === 'GET' && pathname.startsWith('/api/routines/child/')) {
      const childId = pathname.split('/')[4];
      const routines = await db.collection('routines').find({ childId }).toArray();
      res.writeHead(200);
      res.end(JSON.stringify(routines));
    }

    // ===== SESSION LOG ROUTES =====
    else if (req.method === 'POST' && pathname === '/api/sessions') {
      const data = await parseBody(req);
      const result = await db.collection('sessionLogs').insertOne({ 
        ...data, 
        timestamp: new Date()
      });
      res.writeHead(201);
      res.end(JSON.stringify({ _id: result.insertedId, ...data }));
    }
    
    else if (req.method === 'GET' && pathname.startsWith('/api/sessions/child/')) {
      const childId = pathname.split('/')[4];
      const sessions = await db.collection('sessionLogs').find({ childId }).sort({ timestamp: -1 }).toArray();
      res.writeHead(200);
      res.end(JSON.stringify(sessions));
    }

    // ===== REWARD SYSTEM ROUTES =====
    else if (req.method === 'POST' && pathname === '/api/rewards') {
      const data = await parseBody(req);
      const existing = await db.collection('rewardSystems').findOne({ childId: data.childId });
      
      if (existing) {
        await db.collection('rewardSystems').updateOne(
          { childId: data.childId },
          { $set: data }
        );
        res.writeHead(200);
        res.end(JSON.stringify({ ...existing, ...data }));
      } else {
        const result = await db.collection('rewardSystems').insertOne(data);
        res.writeHead(201);
        res.end(JSON.stringify({ _id: result.insertedId, ...data }));
      }
    }
    
    else if (req.method === 'GET' && pathname.startsWith('/api/rewards/child/')) {
      const childId = pathname.split('/')[4];
      const rewards = await db.collection('rewardSystems').findOne({ childId });
      res.writeHead(200);
      res.end(JSON.stringify(rewards || { childId, currentStarCount: 0, rewards: [] }));
    }

    else if (req.method === 'PUT' && pathname.startsWith('/api/rewards/child/')) {
      const childId = pathname.split('/')[4];
      const data = await parseBody(req);
      await db.collection('rewardSystems').updateOne(
        { childId },
        { $set: data },
        { upsert: true }
      );
      res.writeHead(200);
      res.end(JSON.stringify({ childId, ...data }));
    }
    
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
