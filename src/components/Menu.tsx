import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const Menu: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by looking for a token in localStorage
        const token = localStorage.getItem('token');
        const roles = localStorage.getItem('roles'); // Assuming roles are stored in localStorage as a JSON string

        setIsLoggedIn(!!token); // Convert token existence to a boolean
        setRole(roles ? JSON.parse(roles)[0] : null); // Assuming roles is an array and we want the first role
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        setIsLoggedIn(false); // Update state to reflect logout
        //window.location.href = '/'; // Redirect to the login page
        console.log('Logged out and navigating to homepage');
        navigate('/');
    };

    return (
    <nav className="menu">
        <ul>
            {isLoggedIn && role === 'ROLE_USER' && (
                <li><a href="/UserPage">Strona użytkownika</a></li>
            )}
            <li><a href="/">Strona główna</a></li>
            <li><a href="/AddTicket">Dodaj zgłoszenie</a></li>
            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_MECHANIC') && (
                <li><a href="/Repairs">Naprawy</a></li>
            )}
            <li><a href="/MechanicPage">Strona mechanika</a></li>
            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_MECHANIC') && (
                <li><a href="/AcceptRepair">Przyjmij naprawę</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN') && (
                <li><a href="/Clients">Klienci</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_MECHANIC') && (
                <li><a href="/Cars">Pojazdy</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN') && (
                <li><a href="/Mechanics">Mechanicy</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN') && (
                <li><a href="/AddVehicle">Dodaj pojazd</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_MECHANIC') && (
                <li><a href="/AddClient">Dodaj klienta</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN') && (
                <li><a href="/AddMechanic">Dodaj mechanika</a></li>
            )}
            {isLoggedIn ? (
                <li><a href="/" onClick={handleLogout}>Wyloguj</a></li>
            ) : (
                <li><a href="/Login">Zaloguj</a></li>
            )}
        </ul>
    </nav>
    );
};