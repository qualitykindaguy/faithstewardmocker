const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

exports.handler = async (event) => {
  const authHeader = event.headers.authorization || "";
  const idToken = authHeader.replace("Bearer ", "");

  if (!idToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Missing token" }),
    };
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return {
      statusCode: 200,
      body: JSON.stringify({
        uid: decoded.uid,
        email: decoded.email,
        emailVerified: decoded.email_verified,
      }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid token", message: err.message }),
    };
  }
};
