import React, {useEffect, useState} from 'react';
import {useApi} from "../../composables/useApi";
import {Repair, Vehicle} from "../../models/models";
import axios from "../../axiosConfig";

const Repairs: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfRepairs, setListOfRepairs] = useState<Repair[]>([]); // React state for the client list


    const getRepairs = async () => {
        try {
            const response = await axios.get(`/repairs`);
            setListOfRepairs((prevRepairs) => {
                console.log('Previous repairs:', prevRepairs);
                console.log('New repairs:', response.data);
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
        getRepairs();
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
            <div className="lista_napraw" id="lista_napraw">
                <h2>Naprawy:</h2>
                {getRequestError ? (
                    <p>Failed to fetch repairs. Please try again later.</p>
                ) : (
                    <table id="tabela_napraw">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Telefon klienta</th>
                            <th>Mechanik</th>
                            <th>Protokół</th>
                            <th>Stan</th>
                            <th>Opis</th>
                            <th>Data rozpoczęcia</th>
                            <th>Data zakończenia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listOfRepairs.map((repair) => (
                            <tr key={repair.repairId}>
                                <td>{repair.repairId}</td>
                                <td>{repair.phoneNumber}</td>
                                <td>{repair.phoneNumber}</td>
                                {/*<td>{repair.mechanic.username}</td>*/}
                                <td>{repair.repairProtocol}</td>
                                <td>{repair.state}</td>
                                <td>{repair.description}</td>
                                <td>{repair.startDate}</td>
                                <td>{repair.endDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Repairs;