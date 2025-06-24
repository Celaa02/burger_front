import LoginForm from "../components/Auth/LoginForm";
import styles from "../styles/pages-styles/Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}


