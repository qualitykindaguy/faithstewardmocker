import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, sendEmailVerification } from 'firebase/auth';

// ✅ Updated Firebase config for new project
const firebaseConfig = {
  apiKey: "AIzaSyAxZ-g6oZDpGe3jOsYMQ_OZo24iKV8fLfg",
  authDomain: "faithstewardsapp.firebaseapp.com",
  projectId: "faithstewardsapp",
  storageBucket: "faithstewardsapp.firebasestorage.app",
  messagingSenderId: "257227552120",
  appId: "1:257227552120:web:24b70042dffff4cd3a848d"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/.netlify/functions/getUser')
      .then(res => res.json())
      .then(data => {
        if (data.uid) {
          if (!data.emailVerified) {
            setMessage("Please verify your email before accessing the dashboard.");
          } else {
            setUser(data);
          }
        } else {
          navigate('https://faithstewardsapp.firebaseapp.com'); // Updated fallback
        }
      })
      .catch(() => {
        navigate('https://faithstewardsapp.firebaseapp.com'); // Updated fallback
      })
      .finally(() => setLoading(false));
  }, []);

  const resendVerification = () => {
    const currentUser = auth.currentUser;
    if (currentUser && !currentUser.emailVerified) {
      sendEmailVerification(currentUser)
        .then(() => {
          setMessage("📩 A new verification email has been sent.");
        })
        .catch((error) => {
          console.error("Error resending email:", error);
          setMessage("❌ Failed to send verification email.");
        });
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  if (message) {
    return (
      <div style={{ padding: '1rem' }}>
        <p>{message}</p>
        <button onClick={resendVerification}>Resend Verification Email</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Welcome to the Dashboard</h2>
      <p>Logged in as: {user?.email}</p>
    </div>
  );
}
