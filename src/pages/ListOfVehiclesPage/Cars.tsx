import React, {useEffect, useState} from 'react';
import axios from "../../services/axiosConfig";
import {Car} from "../../models/models";
import {Menu} from "../../components/Menu";

const Cars: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfCars, setListOfCars] = useState<Car[]>([]); // React state for the client list
    const [editingCarVin, setEditingCarVin] = useState<string | null>(null);
    const [editedCar, setEditedCar] = useState<Partial<Car>>({});


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

    const handleEditClick = (car: Car) => {
        setEditingCarVin(car.vin);
        setEditedCar(car); // Set the client being edited
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCar((prev) => ({
            ...prev,
            [name]: value, // Dynamically update the edited field
        }));
    };

    const handleSaveClick = async () => {
        try {
            // Optionally, send the updated client to the backend
            await axios.patch(`/modify/car`, editedCar);
            //await axios.put(`/clients/${editingClientId}`, editedClient);

            // Update the client in the local state
            setListOfCars((prevCar) =>
                prevCar.map((car) =>
                    car.vin === editingCarVin ? { ...car, ...editedCar } : car
                )
            );

            // Clear editing state
            setEditingCarVin(null);
            setEditedCar({});
        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingCarVin(null); // Exit editing mode without saving
        setEditedCar({});
    };


    return (
        <>
            <Menu></Menu>
            <div className="lista" id="lista">
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
                            <th>actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listOfCars.map((car) => (
                            <tr key={car.vin}>
                                {editingCarVin === car.vin ? (
                                    <>
                                        <td>{car.vin}</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="vehicleRegistration"
                                                value={editedCar.vehicleRegistration || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="mark"
                                                value={editedCar.mark || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="model"
                                                value={editedCar.model || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="productionYear"
                                                value={editedCar.productionYear || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={handleSaveClick}>Zapisz</button>
                                            <button onClick={handleCancelClick}>Anuluj</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{car.vin}</td>
                                        <td>{car.vehicleRegistration}</td>
                                        <td>{car.mark}</td>
                                        <td>{car.model}</td>
                                        <td>{Number(car.productionYear)}</td>
                                        <td>
                                            <button id="modify" onClick={() => handleEditClick(car)}>Modyfikuj</button>
                                        </td>
                                    </>
                                )}
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