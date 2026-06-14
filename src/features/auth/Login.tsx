import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import car from '../../assets/car.png';

const API_URL = 'http://localhost:3001/api';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Identifiants invalides');
      }

      const data = await res.json();
      localStorage.setItem('jwt', data.accessToken);

      if (data.user) {
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('role', data.user.role);
      }

      navigate('/quotes');
    } catch (err: any) {
      setError(err.message || 'Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${car})` }}>
      <div className="login-overlay" />

      <div className="login-container">

        <div className="login-header">
          <h1>California Golden Detailers</h1>
          <p>Administration Space</p>
        </div>

        <div className="login-card">
          <form onSubmit={handleSubmit}>

            {error && <div className="login-error">{error}</div>}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Mot de passe</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
            </div>

            <button className="login-btn" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>

          </form>
        </div>

        <p className="login-footer">
          © 2026 Votre Société
        </p>

      </div>
    </div>
  );
};

export default Login;