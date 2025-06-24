import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/LoginForm.module.css";
import { loginUser } from "../../services/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const form = e.target as HTMLFormElement;
    console.log("🚀 ~ handleSubmit ~ form:", (form[2] as HTMLInputElement).value)
    const email = (form[0] as HTMLInputElement).value.trim();
    const password = (form[1] as HTMLInputElement).value;
    const access_token = (form[2] as HTMLInputElement).value;
    

    if (!email || !password) {
      setError("Email y contraseña son obligatorios.");
      return;
    }

    try {
      const result = await loginUser({ email, password, access_token});

      console.log("🚀 ~ handleSubmit ~ result:", result)
      if (!result?.access_token) {
        throw new Error("Respuesta inválida del servidor.");
      }

      // Guardar token y usuario en localStorage
      localStorage.setItem("token", result.access_token);
      localStorage.setItem("user", JSON.stringify(result.user));

      // Redirigir al menú
      navigate("/menu");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Link to="/" className={styles.homeIcon}>🏠</Link>
      <h2 className={styles.title}>Login</h2>

      {error && <div className={styles.error}>{error}</div>}

      <input
        type="email"
        placeholder="Correo electrónico"
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Iniciar Sesión
      </button>

      <Link to="/register" className={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Link>
    </form>
  );
};

export default LoginForm;





