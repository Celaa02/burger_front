# 🍔 Burger Station Frontend

Interfaz web de la aplicación **Burger Station**, desarrollada con React + Vite. Permite a los usuarios autenticarse, visualizar el menú de hamburguesas, personalizar pedidos y consultar su historial de compras.

---

## 🚀 Tecnologías usadas

- **React + Vite**
- **TypeScript**
- **React Router DOM**
- **CSS Modules**
- **React Icons**
- [React + Vite](https://React.com/) - Framework principal
- [TypeScript](https://typescriptlang.org//) - Lenguaje de programacion
- [React Router DOM](https://reactrouter.com//) - Declaracion de rutas para react
- [CSS Modules](https://lenguajecss.com) - Definicion de estilos para los componentes
- [AWS Amplify](https://aws.amazon.com/amplify/) - Definicion de estilos para los componentes

---

## 📦 Instalación

1. Clona el repositorio:

Clona el repositorio y entra a la carpeta del frontend:

```bash
git clone https://github.com/Celaa02/burger_front
cd burger_front
```

2. Instala las dependencias:

```bash
npm install
```

## 🧪 Scripts disponibles

```bash
# Correr en desarrollo
npm run dev

# Compilar
npm run build
```

---

## 🧭 Navegación

- `/login` — Inicio de sesión
- `/register` — Registro de usuario
- `/menu` — Menú de hamburguesas
- `/order/:id` — Crear pedido personalizado
- `/order-success` — Generacion de orden exitosa
- `/orders/history` — Historial de ordenes
- 📖 Botón flotante — Ver historial de pedidos
- 🍔🍟 Botón flotante — Ver Menu de pedidos
- 🔒 Botón flotante — Cerrar sesion

---

## 🧑‍💻 Estructura del Proyecto

```
burger_front/
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Vistas principales (Login, Menu, Order, etc)
│   ├── services/          # Peticiones al backend
│   ├── styles/            # Archivos .module.css
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── images/            # Fondo e imágenes estáticas
└── ...
```

---

## 🔐 Autenticación

- El usuario se autentica con email y contraseña
- El token JWT se guarda en `localStorage`
- Se protege el acceso al menú, pedidos y historial

---

## 🎨 Estilos

- Estética inspirada en una app móvil
- Imágenes con `object-fit: cover`
- Fondo con imagen personalizada
- Transiciones y diseño centrado en experiencia de usuario

---

## 🌟 Funcionalidades

- Registro e inicio de sesión
- Visualización del menú de hamburguesas
- Personalización del pedido (extras, salsas, acompañamiento, bebida)
- Cálculo dinámico del total
- Envío del pedido al backend
- Historial de pedidos del usuario autenticado

---

## 📝 Variables de entorno

Por defecto, el frontend asume que el backend corre en `https://burger-backend-bbwb.onrender.com`. Si necesitas cambiarlo, edita directamente los `fetch` o crea una constante baseURL en `services/`.

---

## 🔗 Despliegue

**URL base de producción**:  
`https://main.d1vclgui4mrj1.amplifyapp.com/`

---

## 🧠 Notas

- El Frontend está conectado con un backend NestJS desplegado en Render.
- La base de datos está gestionada con AWS RDS usando MySQL.
- Los pedidos envían correo de confirmación mediante SendGrid.
- Estructura basada en Clean Architecture simplificada.

---

Made with ❤️ by [Celaa02](https://github.com/Celaa02/burger_front)