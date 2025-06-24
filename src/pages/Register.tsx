import RegisterForm from "../components/Auth/RegisterForm";
import styles from "../styles/pages-styles/Register.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}

