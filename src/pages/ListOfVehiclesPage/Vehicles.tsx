import React, {useEffect, useState} from 'react';
import {useApi} from "../../composables/useApi";
import {Mechanic, Vehicle} from "../../models/models";
import axios from "../../axiosConfig";

const Vehicles: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfVehicles, setListOfVehicles] = useState<Vehicle[]>([]); // React state for the client list


    const getVehicles = async () => {
        try {
            const response = await axios.get(`/cars`);
            setListOfVehicles((prevVehicles) => {
                console.log('Previous vehicles:', prevVehicles);
                console.log('New vehicles:', response.data);
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
        getVehicles();
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
            <div className="lista_pojazdów" id="lista_pojazdów">
                <h2>Pojazdy:</h2>
                {getRequestError ? (
                    <p>Failed to fetch vehicles. Please try again later.</p>
                ) : (
                    <table id="tabela_pojazdow">
                        <thead>
                        <tr>
                            <th>vin</th>
                            <th>vehicleRegistration</th>
                            <th>mark</th>
                            <th>model</th>
                            <th>productionYear</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listOfVehicles.map((vehicle) => (
                            <tr key={vehicle.vin}>
                                <td>{vehicle.vin}</td>
                                <td>{vehicle.vehicleRegistration}</td>
                                <td>{vehicle.mark}</td>
                                <td>{vehicle.model}</td>
                                <td>{Number(vehicle.productionYear)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Vehicles;