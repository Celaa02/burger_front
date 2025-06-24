import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/RegisterForm.module.css";
import { registerUser } from "../../services/auth";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = form;

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!email || !password || typeof password !== "string") {
      setError("Email and password are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid mail.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Link to="/" className={styles.homeIcon}>🏠</Link>
      <h2 className={styles.title}>Sign Up</h2>

      {error && <div className={styles.error}>{error}</div>}


      <input
        name="name"
        type="text"
        placeholder="Full name"
        className={styles.input}
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="E-mail address"
        className={styles.input}
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        className={styles.input}
        value={form.password}
        onChange={handleChange}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        className={styles.input}
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <button type="submit" className={styles.button}>
        Sign Up
      </button>

      <Link to="/login" className={styles.link}>
        Already have an account? Sign in
      </Link>
    </form>
  );
};

export default RegisterForm;




