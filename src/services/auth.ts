// src/services/auth.ts
const API_URL = "http://localhost:3001";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = data;

  // Asegura que password sea string
  const payload = {
    name: String(name),
    email: String(email),
    password: String(password),
  };

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Error al registrar");

  return result;
};


export const loginUser = async (data: { email: string; password: string, access_token: string }) => {
  const { email, password } = data;

  const payload = {
    email: String(email),
    password: String(password),
  };

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Error al iniciar sesión");

  const { access_token, user } = result;

  // Guardar en localStorage
  localStorage.setItem("token", access_token);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

