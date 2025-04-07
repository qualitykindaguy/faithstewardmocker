exports.handler = async function (event, context) {
    const cookieHeader = event.headers.cookie || "";
  
    // Extract auth_token from cookies
    const match = cookieHeader.match(/auth_token=([^;]+)/);
    const token = match ? match[1] : null;
  
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized - No token found" }),
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
        statusCode: 403,
        body: JSON.stringify({
          error: "Token verification failed",
          details: error.message,
        }),
      };
    }
  };
  