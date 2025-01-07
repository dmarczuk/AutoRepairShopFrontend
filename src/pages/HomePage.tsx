import React from "react";

const HomePage: React.FC = () => {

    return (
        <>
            <nav className="menu">
                <ul>
                    <li><a href="/HomePage">Strona główna</a></li>
                    <li><a href="/AddTicket">Dodaj zgłoszenie</a></li>
                    <li><a href="/MechanicPage">Strona mechanika</a></li>
                </ul>
            </nav>
            <div>
                <h2>Strona Główna</h2>
            </div>
        </>

    )
        ;
};

export default HomePage;