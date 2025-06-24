import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/RegisterForm.module.css";
import { registerUser } from "../../services/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Correo inválido.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await registerUser({ name, email, password });
      if (response.success) {
        setSuccess("Registro exitoso. Redirigiendo...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(response.message || "Error desconocido.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Link to="/" className={styles.homeIcon}>🏠</Link>
      <h2 className={styles.title}>Registro</h2>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        className={styles.input}
        onChange={handleChange}
        value={formData.name}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        className={styles.input}
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        className={styles.input}
        onChange={handleChange}
        value={formData.password}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        className={styles.input}
        onChange={handleChange}
        value={formData.confirmPassword}
      />

      <button type="submit" className={styles.button}>
        Registrarse
      </button>

      <Link to="/login" className={styles.link}>
        ¿Ya tienes una cuenta? Inicia sesión
      </Link>
    </form>
  );
};

export default RegisterForm;




