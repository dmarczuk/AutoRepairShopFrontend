import React, {useEffect, useState} from 'react';
import axios from "../../services/axiosConfig";
import {Car} from "../../models/models";
import {Menu} from "../../components/Menu";

const Cars: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfCars, setListOfCars] = useState<Car[]>([]); // React state for the client list


    const getCars = async () => {
        try {
            const response = await axios.get(`/cars`);
            setListOfCars((prevCars) => {
                console.log('Previous cars:', prevCars);
                console.log('New cars:', response.data);
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
        getCars();
    }, []);


    return (
        <>
            <Menu></Menu>
            <div className="lista_pojazdów" id="lista_pojazdów">
                <h2>Pojazdy:</h2>
                {getRequestError ? (
                    <p>Failed to fetch cars. Please try again later.</p>
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
                        {listOfCars.map((car) => (
                            <tr key={car.vin}>
                                <td>{car.vin}</td>
                                <td>{car.vehicleRegistration}</td>
                                <td>{car.mark}</td>
                                <td>{car.model}</td>
                                <td>{Number(car.productionYear)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Cars;