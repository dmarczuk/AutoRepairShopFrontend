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

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;


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
        setEditingRepairId(null);
        setEditedRepair({});
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredRepairs = searchTerm
        ? listOfRepairs.filter(repair =>
            String(repair.car.vin).toLowerCase().startsWith(searchTerm))
        : listOfRepairs;

    // Pagination logic
    const indexOfLastRepair = currentPage * itemsPerPage;
    const indexOfFirstRepair = indexOfLastRepair - itemsPerPage;
    const currentRepairs = filteredRepairs.slice(indexOfFirstRepair, indexOfLastRepair);
    const totalPages = Math.ceil(filteredRepairs.length / itemsPerPage);

    return (
        <>
            <Menu></Menu>
            <div className="lista" id="listaNapraw">
                <h2>Repairs:</h2>

                <input
                    type="text"
                    placeholder="searching by VIN"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {getRequestError ? (
                    <p>Failed to fetch repairs. Please try again later.</p>
                ) : (
                    <table id="tabela_napraw">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Client phone number</th>
                            <th>Mechanic</th>
                            <th>Vin</th>
                            <th>Protocol</th>
                            <th>State</th>
                            <th>Description</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th id="actionRepair">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentRepairs.length > 0 ? (
                            currentRepairs.map((repair) => (
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
                                                <button onClick={handleSaveClick}>Save</button>
                                                <button onClick={handleCancelClick}>Cancel</button>
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
                                                <button id="modifyRepair"
                                                        onClick={() => handleEditClick(repair)}>Modify
                                                </button>
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

                {filteredRepairs.length > 0 && (
                    <div className="button-container">
                        <button className="button-page"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button className="button-page"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Repairs;