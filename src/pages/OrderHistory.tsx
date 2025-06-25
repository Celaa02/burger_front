import { useEffect, useState } from "react";
import styles from "../styles/pages-styles/OrderHistory.module.css";
import { Link } from "react-router-dom";

interface OrderItem {
    burgerId: number;
    side: string;
    drink: string;
    extras: string[];
    salsas: string[];
    price: number;
}

interface Order {
    id: number;
    total: number;
    items: OrderItem[];
    createdAt: string;
}

export default function OrderHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("https://burger-backend-bbwb.onrender.com/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("No se pudieron obtener las órdenes");
                }

                const data = await res.json();
                setOrders(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className={styles.container}>
            <Link to="/menu" className={styles.historyLink}>🍔🍟 Menu</Link>

            <h2 className={styles.title}>🧾 Historial de Pedidos</h2>

            {error && <p className={styles.error}>{error}</p>}

            {orders.length === 0 ? (
                <p className={styles.message}>No tienes pedidos registrados.</p>
            ) : (
                <div className={styles.list}>
                    {orders.map((order) => (
                        <div key={order.id} className={styles.card}>
                            <h4>Pedido #{order.id}</h4>
                            <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><strong>Total:</strong> ${Number(order.total).toFixed(2)}</p>
                            {order.items.map((item, index) => (
                                <div key={index} className={styles.item}>
                                    <p><strong>Hamburguesa:</strong> #{item.burgerId}</p>
                                    <p><strong>Acompañamiento:</strong> {item.side}</p>
                                    <p><strong>Bebida:</strong> {item.drink}</p>
                                    <p><strong>Extras:</strong> {item.extras.join(", ") || "Ninguno"}</p>
                                    <p><strong>Salsas:</strong> {item.salsas.join(", ") || "Ninguna"}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
