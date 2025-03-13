import React, {useEffect, useState} from 'react';
import {Menu} from "../../components/Menu";

const AdminPage: React.FC = () => {

    return (
        <>
            <Menu></Menu>
            <div className="main">
                <h2>Admin Page</h2>
            </div>
            {/*<div className="formularz">*/}
            {/*    <h2>Dodanie zgłoszenia</h2>*/}
            {/*    <form>*/}
            {/*        <h3>Dane klienta:</h3>*/}
            {/*        <label htmlFor="imie">Imię:</label>*/}
            {/*        <input type="text" id="imie"/>*/}
            {/*        <label htmlFor="nazwisko">Nazwisko:</label>*/}
            {/*        <input type="text" id="nazwisko"/>*/}
            {/*        <label htmlFor="telefon">Telefon:</label>*/}
            {/*        <input type="text" id="telefon"/>*/}
            {/*        <label htmlFor="email">Email:</label>*/}
            {/*        <input type="text" id="email"/>*/}
            {/*        <h3>Dane pojazdu:</h3>*/}
            {/*        <label htmlFor="rejestracja">Rejestracja:</label>*/}
            {/*        <input type="text" id="rejestracja"/>*/}
            {/*        <label htmlFor="marka">Marka:</label>*/}
            {/*        <input type="text" id="marka"/>*/}
            {/*        <label htmlFor="model">Model:</label>*/}
            {/*        <input type="text" id="model"/>*/}
            {/*        <label htmlFor="rocznik">Rocznik:</label>*/}
            {/*        <input type="text" id="rocznik"/>*/}
            {/*        <label htmlFor="vin">VIN:</label>*/}
            {/*        <input type="text" id="vin"/>*/}
            {/*        <button type="submit">Dodaj zgłoszenie</button>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </>
    );
};

export default AdminPage;