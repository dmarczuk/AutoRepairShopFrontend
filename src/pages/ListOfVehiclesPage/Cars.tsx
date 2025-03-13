import React, {useEffect, useState} from 'react';
import axios from "../../services/axiosConfig";
import {Car} from "../../models/models";
import {Menu} from "../../components/Menu";

const Cars: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfCars, setListOfCars] = useState<Car[]>([]); // React state for the client list
    const [editingCarVin, setEditingCarVin] = useState<string | null>(null);
    const [editedCar, setEditedCar] = useState<Partial<Car>>({});

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;


    const getCars = async () => {
        try {
            const response = await axios.get(`/cars`);
            setListOfCars((prevCars) => {
                return response.data;
            });
            setGetRequestError(false);
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
            await axios.patch(`/modify/car`, editedCar);
            setListOfCars((prevCar) =>
                prevCar.map((car) =>
                    car.vin === editingCarVin ? { ...car, ...editedCar } : car
                )
            );

            setEditingCarVin(null);
            setEditedCar({});
        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingCarVin(null);
        setEditedCar({});
    };

    const filteredCars = searchTerm
        ? listOfCars.filter(car => car.vin.startsWith(searchTerm))
        : listOfCars;

    // Pagination logic
    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);


    return (
        <>
            <Menu></Menu>
            <div className="lista" id="lista">
                <h2>Cars:</h2>
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
                        {currentCars.length > 0 ? (
                            currentCars.map((car) => (
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
                                            <button onClick={handleSaveClick}>Save</button>
                                            <button onClick={handleCancelClick}>Cancel</button>
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
                                            <button id="modify" onClick={() => handleEditClick(car)}>Modify</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td>No data</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
                {filteredCars.length > 0 && (
                    <div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        <span> Page {currentPage} of {totalPages} </span>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cars;