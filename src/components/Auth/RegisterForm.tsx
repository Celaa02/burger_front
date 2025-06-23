import { Link } from "react-router-dom";
import styles from "../../styles/RegisterForm.module.css";

const RegisterForm = () => {
  return (
    <form className={styles.container}>
      <Link to="/" className={styles.homeIcon}>🏠</Link>
      <h2 className={styles.title}>Registro</h2>

      <input
        type="text"
        placeholder="Nombre completo"
        className={styles.input}
      />
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
      <input
        type="password"
        placeholder="Confirmar contraseña"
        className={styles.input}
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

