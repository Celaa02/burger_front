import { useEffect, useState } from "react";
import styles from "../../styles/MenuForm.module.css";
import { Link, useNavigate } from "react-router-dom";

interface Burger {
  id: number;
  name: string;
  description: string;
  price: number | string;
  imageUrl: string;
}

export default function Menu() {
  const navigate = useNavigate();
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/burgers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("No se pudieron obtener las hamburguesas");
        }

        const data = await res.json();
        setBurgers(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchBurgers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link to="/orders/history" className={styles.historyLink}>📜 Historial</Link>
        <button onClick={logout} className={styles.logoutButton}>
          🔒 Cerrar sesión
        </button>
      </div>

      <h1 className={styles.title}>🍔 Menú de Hamburguesas</h1>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {burgers.map((burger) => (
          <div
            key={burger.id}
            className={styles.card}
            onClick={() => navigate(`/order/${burger.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={burger.imageUrl} alt={burger.name} className={styles.image} />
            <h3 className={styles.name}>{burger.name}</h3>
            <p className={styles.description}>{burger.description}</p>
            <p className={styles.price}>${Number(burger.price).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );

}
