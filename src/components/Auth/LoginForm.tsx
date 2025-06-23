import { Link } from "react-router-dom";
import styles from "../../styles/LoginForm.module.css";

const LoginForm = () => {
  return (
    <form className={styles.container}>
      <Link to="/" className={styles.homeIcon}>🏠</Link>
      <h2 className={styles.title}>Iniciar Sesión</h2>

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
        Entrar
      </button>

      <Link to="/register" className={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Link>
    </form>
  );
};

export default LoginForm;



