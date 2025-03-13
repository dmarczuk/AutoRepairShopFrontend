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
                <li><a href="/UserPage">User page</a></li>
            )}
            <li><a href="/">Main page</a></li>
            <li><a href="/AddTicket">Add ticket</a></li>
            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_MECHANIC') && (
                <li><a href="/Repairs">Repairs</a></li>
            )}
            <li><a href="/MechanicPage">Mechanic page</a></li>
            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_MECHANIC') && (
                <li><a href="/AcceptRepair">Accept ticket</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN') && (
                <li><a href="/Clients">Clients</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_MECHANIC') && (
                <li><a href="/Cars">Cars</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN') && (
                <li><a href="/Mechanics">Mechanics</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN') && (
                <li><a href="/AddVehicle">Add car</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN' || role === 'ROLE_MECHANIC') && (
                <li><a href="/AddClient">Add client</a></li>
            )}
            {isLoggedIn && (role === 'ROLE_ADMIN') && (
                <li><a href="/AddMechanic">Add mechanic</a></li>
            )}
            {isLoggedIn ? (
                <li><a href="/" onClick={handleLogout}>Log out</a></li>
            ) : (
                <li><a href="/Login">Log in</a></li>
            )}
        </ul>
    </nav>
    );
};