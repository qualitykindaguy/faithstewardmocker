
const admin = require('firebase-admin');

// Only initialize once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

exports.handler = async (event, context) => {
  const token = event.queryStringParameters.token;

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token' }),
    };
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return {
      statusCode: 200,
      body: JSON.stringify({
        uid: decoded.uid,
        email: decoded.email,
        emailVerified: decoded.email_verified,
      }),
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Token invalid or expired',
        details: error.message,
      }),
    };
  }
};
