import React, {useEffect, useState} from 'react';
import {useApi} from "../../composables/useApi";
import {Mechanic} from "../../models/models";
import axios from "../../axiosConfig";

const Mechanics: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfMechanics, setListOfMechanics] = useState<Mechanic[]>([]); // React state for the client list

    const getMechanics = async () => {
        try {
            const response = await axios.get(`/mechanics`);
            setListOfMechanics((prevMechanics) => {
                console.log('Previous mechanic:', prevMechanics);
                console.log('New mechanics:', response.data);
                return response.data;
            });
            setGetRequestError(false);
            console.log("WORKING");
            //navigate('/checkResults/results');
        } catch (error) {
            if (error) setGetRequestError(true);
            else setGetRequestError(false);
        }
    };

    useEffect(() => {
        getMechanics();
    }, []);

    return (
        <>
            <nav className="menu">
                <ul>
                    <li><a href="/">Strona główna</a></li>
                    <li><a href="/AddTicket">Dodaj zgłoszenie</a></li>
                    <li><a href="/Repairs">Naprawy</a></li>
                    <li><a href="/Clients">Klienci</a></li>
                    <li><a href="/Vehicles">Pojazdy</a></li>
                    <li><a href="/Mechanics">Mechanicy</a></li>
                    <li><a href="/Dodaj pojazd">Dodaj pojazd</a></li>
                    <li><a href="/Logout">Wyloguj</a></li>
                </ul>
            </nav>
        <div className="lista_mechaników" id="lista_mechaników">
            <h2>Mechanicy:</h2>
            {getRequestError ? (
                <p>Failed to fetch mechanics. Please try again later.</p>
            ) : (
                <table id="tabela_mechaników">
                    <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Login</th>
                        <th>Czy Zatrudniony</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listOfMechanics.map((mechanic) => (
                        <tr key={mechanic.id}>
                            <td>{mechanic.firstName}</td>
                            <td>{mechanic.secondName}</td>
                            <td>{mechanic.username}</td>
                            <td>{mechanic.ifEmployed}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
);
};

export default Mechanics;