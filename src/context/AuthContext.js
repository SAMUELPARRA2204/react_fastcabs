import { jwtDecode } from 'jwt-decode';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCart } from './CartContext';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    const { clearCart } = useCart();

    const login = (userData, tokenData) => {
        //BORRAR
        console.log('Token del login:' + ' ' + tokenData);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
        setUser(userData);
        setToken(tokenData);
    };

    const logOut = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        clearCart();
        navigate("/login");
    }, [navigate, clearCart]);

    useEffect(() => {
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
        try {
            const decodeToken = jwtDecode(token);
            const expirationDate = decodeToken.exp * 1000;
            const remainingTime = expirationDate - Date.now();

            if (remainingTime <= 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Sesión expirada",
                    text: "Tu sesión ha expirado. Debes iniciar sesión nuevamente.",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: '#c7a17a',
                    allowOutsideClick: false
                }).then(() => logOut());
            } else {
                setUser(JSON.parse(localStorage.getItem('user')));

                const timeoutId = setTimeout(() => logOut(), remainingTime);
                return () => clearTimeout(timeoutId);
            }
        } catch (error) {
            logOut();
        } finally {
            setLoading(false);
        }
    }, [token, logOut]
);
return (
    <AuthContext.Provider value={{ user, token, login, logOut, loading }}>
        {loading ? <p>Cargando...</p> : children}
    </AuthContext.Provider>
)
};

export default AuthContext