import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
    baseURL: "http://localhost:8081/api",
    // baseURL: "https://59d8-191-107-13-11.ngrok-free.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.defaults.withCredentials = true;

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        } else{
            console.error("Token no encontrado");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el error es un 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            console.error("Token inválido o expirado.");
            Swal.fire({
                icon: "warning",
                title: "Sesión expirada",
                text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
                confirmButtonText: "Aceptar"
            }).then(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            });
        } else {
            console.error("Error en la solicitud:", error.response || error.message);
        }
        return Promise.reject(error);
    }
);

export default api;