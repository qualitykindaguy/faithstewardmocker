
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/.netlify/functions/getUser')
      .then(res => res.json())
      .then(data => {
        if (data.uid) {
          setUser(data);
        } else {
          navigate('https://test-auth-3714d.web.app');
        }
      })
      .catch(() => {
        navigate('https://test-auth-3714d.web.app');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>Logged in as: {user?.email}</p>
    </div>
  );
}
