import React from 'react';

const AdminPage: React.FC = () => {
    return (
        <>
            <nav className="menu">
                <ul>
                    <li><a href="/HomePage">Strona główna</a></li>
                    <li><a href="/AddTicket">Dodaj zgłoszenie</a></li>
                    <li><a href="/Repairs">Naprawy</a></li>
                    <li><a href="/Clients">Klienci</a></li>
                    <li><a href="/Vehicles">Pojazdy</a></li>
                    <li><a href="/Mechanics">Mechanicy</a></li>
                    <li><a href="/Dodaj pojazd">Dodaj pojazd</a></li>
                    <li><a href="/Logout">Wyloguj</a></li>
                </ul>
            </nav>
            <div className="formularz">
                <h2>Dodanie zgłoszenia</h2>
                <form>
                    <h3>Dane klienta:</h3>
                    <label htmlFor="imie">Imię:</label>
                    <input type="text" id="imie"/>
                    <label htmlFor="nazwisko">Nazwisko:</label>
                    <input type="text" id="nazwisko"/>
                    <label htmlFor="telefon">Telefon:</label>
                    <input type="text" id="telefon"/>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email"/>
                    <h3>Dane pojazdu:</h3>
                    <label htmlFor="rejestracja">Rejestracja:</label>
                    <input type="text" id="rejestracja"/>
                    <label htmlFor="marka">Marka:</label>
                    <input type="text" id="marka"/>
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model"/>
                    <label htmlFor="rocznik">Rocznik:</label>
                    <input type="text" id="rocznik"/>
                    <label htmlFor="vin">VIN:</label>
                    <input type="text" id="vin"/>
                    <button type="submit">Dodaj zgłoszenie</button>
                </form>
            </div>
        </>
    );
};

export default AdminPage;