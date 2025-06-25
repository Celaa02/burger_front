// src/pages/OrderSuccess.tsx
import { Link } from "react-router-dom";
import styles from "../styles/pages-styles/OrderSuccess.module.css";
import { FiCheckCircle, FiArrowLeft } from "react-icons/fi";

export default function OrderSuccess() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <FiCheckCircle className={styles.icon} />
        <h2 className={styles.title}>¡Pedido Realizado con Éxito!</h2>
        <p className={styles.message}>Gracias por tu orden. Estamos preparando tu hamburguesa 🍔</p>
        <Link to="/menu" className={styles.backLink}>
          <FiArrowLeft className={styles.backIcon} />
          Volver al menú
        </Link>
      </div>
    </div>
  );
}
