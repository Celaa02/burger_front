import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "../../styles/OrderForm.module.css";
import { FiArrowLeft } from "react-icons/fi";


interface Burger {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const extrasList = [
    { name: "Huevo frito 🍳", price: 1.0 },
    { name: "Jalapeños 🌶️", price: 0.5 },
    { name: "Guacamole 🥑", price: 1.5 },
    { name: "Piña caramelizada 🍍", price: 0.75 },
    { name: "Extra queso 🧀", price: 0.8 },
];

const salsasList = [
    { name: "Kétchup 🍅", price: 0 },
    { name: "Mayonesa 🥚", price: 0 },
    { name: "Mostaza Dijón 🟡", price: 0 },
    { name: "Salsa BBQ ahumada 🍖", price: 0.6 },
    { name: "Mayonesa picante 🌶️", price: 0.6 },
];

const sidesList = [
    { name: "Papas Fritas Corte Casero 🍟", price: 2.75 },
    { name: "Papas en Cascos con Piel 🥔", price: 3.25 },
    { name: "Batatas Fritas 🍠", price: 3.5 },
];

const drinksList = [
    { name: "Limonada Natural 🍋", price: 2.25 },
    { name: "Gaseosa 🥤", price: 2.0 },
    { name: "Té Helado 🍹", price: 2.0 },
    { name: "Agua Embotellada 💧", price: 1.5 },
    { name: "Cerveza Artesanal sin alcohol 🍺", price: 4.0 },
];

export default function OrderForm() {
    const { id: burgerId } = useParams();
    const navigate = useNavigate();
    const [burger, setBurger] = useState<Burger | null>(null);
    const [extras, setExtras] = useState<string[]>([]);
    const [salsas, setSalsas] = useState<string[]>([]);
    const [side, setSide] = useState<string>("");
    const [drink, setDrink] = useState<string>("");
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("🍔 ID recibido:", burgerId);
        // Simulando fetch de la hamburguesa seleccionada
        fetch(`http://localhost:3001/burgers/${burgerId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then(setBurger)
            .catch(() => setError("Error al obtener la hamburguesa"));
    }, [burgerId]);

    const toggleExtra = (name: string) => {
        if (extras.includes(name)) {
            setExtras(extras.filter((e) => e !== name));
        } else if (extras.length < 3) {
            setExtras([...extras, name]);
        }
    };

    const toggleSalsa = (name: string) => {
        if (salsas.includes(name)) {
            setSalsas(salsas.filter((s) => s !== name));
        } else if (salsas.length < 2) {
            setSalsas([...salsas, name]);
        }
    };

    const calculateTotal = (): number => {
        if (!burger) return 0;

        let total = typeof burger.price === "number" ? burger.price : parseFloat(burger.price);

        extras.forEach((name) => {
            const item = extrasList.find((e) => e.name === name);
            if (item) total += item.price;
        });

        salsas.forEach((name) => {
            const item = salsasList.find((s) => s.name === name);
            if (item) total += item.price;
        });

        const sideItem = sidesList.find((s) => s.name === side);
        if (sideItem) total += sideItem.price;

        const drinkItem = drinksList.find((d) => d.name === drink);
        if (drinkItem) total += drinkItem.price;

        return total;
    };


    const handleOrder = async () => {
        if (!burger || !side || !drink) {
            setError("Selecciona acompañamiento y bebida");
            return;
        }

        const total = Number(calculateTotal().toFixed(0));
        const price = total;
        const userData = localStorage.getItem("user");
        console.log("🚀 ~ handleOrder ~ userData:", userData)
        if (!userData) {
        setError("No se encontró información del usuario. Por favor vuelve a iniciar sesión.");
        return;
        }
        console.log("🚀 ~ handleOrder ~ email:", userData)

        const payload = {
            email: userData,
            total,
            items: [
                {
                    burgerId: burger.id,
                    side,
                    drink,
                    extras,
                    salsas,
                    price,
                },
            ],
        };
        
        console.log("🚀 ~ handleOrder ~  payload :",  payload )


        try {
            const res = await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Error al realizar el pedido");

            navigate("/order-success");
        } catch (err: any) {
            setError(err.message || "Error inesperado");
        }
    };


    if (!burger) return <p>Cargando...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Ordenar: {burger.name}</h2>
                <div className={styles.imageContainer}>
                    <img src={burger.imageUrl} alt={burger.name} className={styles.image} />
                </div>
                {error && <p className={styles.error}>{error}</p>}

                {/* Extras */}
                <div className={styles.section}>
                    <h4>Extras (máximo 3)</h4>
                    <div className={styles.optionsGrid}>
                        {extrasList.map((ex) => (
                            <label key={ex.name} className={styles.option}>
                                <input
                                    type="checkbox"
                                    checked={extras.includes(ex.name)}
                                    onChange={() => toggleExtra(ex.name)}
                                />
                                {ex.name} (${ex.price})
                            </label>
                        ))}
                    </div>
                </div>

                {/* Salsas */}
                <div className={styles.section}>
                    <h4>Salsas (máximo 2)</h4>
                    <div className={styles.optionsGrid}>
                        {salsasList.map((s) => (
                            <label key={s.name} className={styles.option}>
                                <input
                                    type="checkbox"
                                    checked={salsas.includes(s.name)}
                                    onChange={() => toggleSalsa(s.name)}
                                />
                                {s.name} {s.price > 0 ? `($${s.price})` : "(Gratis)"}
                            </label>
                        ))}
                    </div>
                </div>


                {/* Acompañamiento */}
                <div className={styles.section}>
                    <h4>Acompañamiento</h4>
                    <div className={styles.optionsGrid}>
                        {sidesList.map((s) => (
                            <label key={s.name} className={styles.option}>
                                <input
                                    type="radio"
                                    name="side"
                                    checked={side === s.name}
                                    onChange={() => setSide(s.name)}
                                />
                                {s.name} (${s.price})
                            </label>
                        ))}
                    </div>
                </div>

                {/* Bebida */}
                <div className={styles.section}>
                    <h4>Bebida</h4>
                    <div className={styles.optionsGrid}>
                        {drinksList.map((d) => (
                            <label key={d.name} className={styles.option}>
                                <input
                                    type="radio"
                                    name="drink"
                                    checked={drink === d.name}
                                    onChange={() => setDrink(d.name)}
                                />
                                {d.name} (${d.price})
                            </label>
                        ))}
                    </div>
                </div>

                <p className={styles.total}> 🧾💰 Total: ${calculateTotal().toFixed(2)}</p>
                <div style={{ textAlign: "left", marginTop: "1rem" }}>
                    <Link to="/menu" className={styles.backLink}>
                        <FiArrowLeft className={styles.backIcon} />
                        Volver al menú
                    </Link>
                </div>
                <button onClick={handleOrder} className={styles.button}>Confirmar Pedido</button>
            </div>
        </div>
    );

}
