import { Link } from "react-router-dom";
import styles from "../styles/pages-styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>🍔 THE BURGER STATION</h1>
        <p className={styles.description}>
          Bienvenido a la mejor hamburguesería. Personaliza tu hamburguesa ideal con nuestros ingredientes frescos.
        </p>
        <div className={styles.buttonGroup}>
          <Link to="/login" className={`${styles.button} ${styles.login}`}>
            Iniciar Sesión
          </Link>
          <Link to="/register" className={`${styles.button} ${styles.register}`}>
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}

