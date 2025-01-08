import React, {useEffect, useState} from 'react';
import {useApi} from "../../composables/useApi";
import {Client} from "../../models/models";
import axios from "../../axiosConfig";

const Clients: React.FC = () => {
    //const [listOfClients, setListOfClients] = useState<Client[]>([]);
   // const [getRequestError, setGetRequestError] = useState<boolean>(false);
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfClients, setListOfClients] = useState<Client[]>([]); // React state for the client list

    const getClients = async () => {
        try {
            const response = await axios.get(`/clients`);
            setListOfClients((prevClients) => {
                console.log('Previous clients:', prevClients);
                console.log('New clients:', response.data);
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
        getClients();
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
        <div className="lista_klientów" id="lista_klientów">
            <h2>Klienci:</h2>
            {getRequestError ? (
                <p>Failed to fetch clients. Please try again later.</p>
            ) : (
                <table id="tabela_klientów">
                    <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Telefon</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listOfClients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.firstName}</td>
                            <td>{client.secondName}</td>
                            <td>{client.phoneNumber}</td>
                            <td>{client.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
};

export default Clients;