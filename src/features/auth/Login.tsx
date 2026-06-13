import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api'; // adapte si tu déploies ailleurs

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
    const res = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Identifiants invalides');
      }
      const data = await res.json();
      localStorage.setItem('jwt', data.accessToken); // adapte le nom si besoin
if (data.user) {
  localStorage.setItem('username', data.user.name);
  localStorage.setItem('role', data.user.role); // si besoin d'afficher le rôle aussi
}
      navigate('/quotes'); // tu peux changer selon ta route dashboard
    } catch (err: any) {
      setError(err.message || 'Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#171a1f',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#23272f', padding: 32, borderRadius: 8, minWidth: 330, boxShadow: '0 2px 18px #0005', color: '#fff'
      }}>
        <h2 style={{ marginBottom: 24, color: '#00aaa1' }}>Connexion Admin</h2>
        {error && <div style={{ color: '#e54', marginBottom: 12 }}>{error}</div>}
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #222' }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4, border: '1px solid #222' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: 10, background: '#00aaa1', color: '#fff', border: 'none',
            borderRadius: 4, fontWeight: 700, cursor: 'pointer'
          }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default Login;