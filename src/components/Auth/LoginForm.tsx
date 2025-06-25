import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/LoginForm.module.css";
import { loginUser } from '../../services/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const form = e.target as HTMLFormElement;
    const email = (form[0] as HTMLInputElement).value.trim();
    const password = (form[1] as HTMLInputElement).value;
    const access_token = (form[2] as HTMLInputElement).value;
    

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const result = await loginUser({ email, password, access_token});

      if (result.access_token && result.email) {
          localStorage.setItem("token", result.access_token);
          localStorage.setItem("email", result.email);
          localStorage.setItem("user", result.id);
          navigate("/menu");
        } else {
          setError("Credenciales inválidas");
        }

      navigate("/menu");
    } catch (err: any) {
      setError(err.message || "Error logging in.");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Link to="/" className={styles.homeIcon}>🏠</Link>
      <h2 className={styles.title}>Login</h2>

      {error && <div className={styles.error}>{error}</div>}

      <input
        type="email"
        placeholder="E-mail address"
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        login
      </button>

      <Link to="/register" className={styles.link}>
        Don't have an account? Register
      </Link>
    </form>
  );
};

export default LoginForm;





