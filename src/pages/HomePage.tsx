import React from "react";
import {Menu} from "../components/Menu";

const HomePage: React.FC = () => {

    return (
        <>
            <Menu></Menu>
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