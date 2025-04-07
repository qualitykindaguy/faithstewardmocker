const admin = require("firebase-admin");

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

exports.handler = async function (event, context) {
  const token = event.queryStringParameters.token;

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing token" }),
    };
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    const cookieHeader = `auth_token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=3600`;

    return {
      statusCode: 302,
      headers: {
        "Set-Cookie": cookieHeader,
        Location: "/dashboard",
      },
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid token", details: error.message }),
    };
  }
};
