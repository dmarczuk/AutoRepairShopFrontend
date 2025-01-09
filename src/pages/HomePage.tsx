import React from "react";

const HomePage: React.FC = () => {

    return (
        <>
            <nav className="menu">
                <ul>
                    <li><a href="/">Strona główna</a></li>
                    <li><a href="/AddTicket">Dodaj zgłoszenie</a></li>
                    <li><a href="/MechanicPage">Strona mechanika</a></li>
                </ul>
            </nav>
            <div className="main">
                <h2>Strona Główna</h2>
                <h2>Warsztat samochodowy. Zapraszamy!</h2>
                <p>W zakładce Dodaj zgłoszenie możesz wysłać swoje zgłoszenie</p>
            </div>
        </>

    )
        ;
};

export default HomePage;