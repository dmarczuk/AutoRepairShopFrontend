import React, {useEffect, useState} from 'react';
// import {useApi} from "../../composables/useApi";
import {Car, Client, formatDate, formatUsername, Repair} from "../../models/models";
import axios from "../../services/axiosConfig";
import {Menu} from "../../components/Menu";

const Repairs: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfRepairs, setListOfRepairs] = useState<Repair[]>([]); // React state for the client list
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [editingRepairId, setEditingRepairId] = useState<number | null>(null);
    const [editedRepair, setEditedRepair] = useState<Partial<Repair>>({});

    useEffect(() => {
        // Check if the user is logged in by looking for a token in localStorage
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Convert token existence to a boolean
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        setIsLoggedIn(false); // Update state to reflect logout
        window.location.href = '/'; // Redirect to the login page
    };

    const getRepairs = async () => {
        try {
            const response = await axios.get(`/repairs`);
            setListOfRepairs((prevRepairs) => {
                console.log('Previous repairs:', prevRepairs);
                console.log('New repairs:', response.data);
                return response.data.sort((a: Repair, b: Repair) => a.repairId - b.repairId);
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


    const handleEditClick = (repair: Repair) => {
        setEditingRepairId(repair.repairId);
        setEditedRepair(repair); // Set the client being edited
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedRepair((prev) => ({
            ...prev,
            [name]: value, // Dynamically update the edited field
        }));
    };

    const handleSaveClick = async () => {
        try {
            // Optionally, send the updated client to the backend
            await axios.patch(`/modify/repair`, editedRepair);
            //await axios.put(`/clients/${editingClientId}`, editedClient);

            // Update the client in the local state
            setListOfRepairs((prevRepair) =>
                prevRepair.map((repair) =>
                    repair.repairId === editingRepairId ? { ...repair, ...editedRepair } : repair
                )
            );

            // Clear editing state
            setEditingRepairId(null);
            setEditedRepair({});
        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingRepairId(null); // Exit editing mode without saving
        setEditedRepair({});
    };

    return (
        <>
            <Menu></Menu>
            <div className="lista" id="listaNapraw">
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
                            <th>Vin pojazdu</th>
                            <th>Protokół</th>
                            <th>Stan</th>
                            <th>Opis</th>
                            <th>Data rozpoczęcia</th>
                            <th>Data zakończenia</th>
                            <th id="actionRepair">Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listOfRepairs.map((repair) => (
                            <tr key={repair.repairId}>
                                {editingRepairId === repair.repairId ? (
                                    <>
                                        <td>{repair.repairId}</td>
                                        <td>{repair.phoneNumber}</td>
                                        <td>{formatUsername(repair.mechanic)}</td>
                                        <td>{repair.car.vin}</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="repairProtocol"
                                                value={editedRepair.repairProtocol || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="state"
                                                value={editedRepair.state || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="description"
                                                value={editedRepair.description || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="startDate"
                                                value={editedRepair.startDate || ''}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="endDate"
                                                value={editedRepair.endDate || ''}
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
                                        <td>{repair.repairId}</td>
                                        <td>{repair.phoneNumber}</td>
                                        <td>{formatUsername(repair.mechanic)}</td>
                                        <td>{repair.car.vin}</td>
                                        <td>{repair.repairProtocol}</td>
                                        <td>{repair.state}</td>
                                        <td>{repair.description}</td>
                                        <td>{formatDate(repair.startDate)}</td>
                                        <td>{formatDate(repair.endDate)}</td>
                                        <td>
                                            <button id="modifyRepair" onClick={() => handleEditClick(repair)}>Modyfikuj</button>
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

export default Repairs;