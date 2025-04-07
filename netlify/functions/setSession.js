const admin = require("firebase-admin");
const cookie = require("cookie");

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
  console.log("🔥 setSession triggered");

  const token = event.queryStringParameters.token;

  if (!token) {
    console.error("❌ No token provided");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing token" }),
    };
  }

  try {
    // Verify token and get user data
    const decoded = await admin.auth().verifyIdToken(token);
    console.log("✅ Firebase ID token verified for UID:", decoded.uid);

    // Create a session cookie valid for 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });

    // Set the cookie
    const headers = {
      "Set-Cookie": cookie.serialize("session", sessionCookie, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
        maxAge: expiresIn / 1000,
      }),
      Location: "/dashboard",
    };

    console.log("✅ Session cookie set. Redirecting to /dashboard");

    return {
      statusCode: 302,
      headers,
      body: "",
    };
  } catch (error) {
    console.error("❌ Failed to verify token or set cookie:", error);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid token", details: error.message }),
    };
  }
};
