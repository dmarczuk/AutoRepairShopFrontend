import React, {useEffect, useState} from 'react';
// import {useApi} from "../../composables/useApi";
import {Client, Mechanic} from "../../models/models";
import axios from "../../services/axiosConfig";
import {Menu} from "../../components/Menu";

const Mechanics: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfMechanics, setListOfMechanics] = useState<Mechanic[]>([]); // React state for the client list
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [editingMechanicUsername, setEditingMechanicUsername] = useState<string | null>(null);
    const [editedMechanic, setEditedMechanic] = useState<Partial<Mechanic>>({});

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

    const getMechanics = async () => {
        try {
            const response = await axios.get(`/mechanics`);
            setListOfMechanics((prevMechanics) => {
                //console.log('Previous mechanic:', prevMechanics);
                //console.log('New mechanics:', response.data);
                return response.data.sort((a: Mechanic, b: Mechanic) => a.mechanicId - b.mechanicId);
            });
            setGetRequestError(false);
           // console.log("WORKING");
            //navigate('/checkResults/results');
        } catch (error) {
            if (error) setGetRequestError(true);
            else setGetRequestError(false);
        }
    };

    useEffect(() => {
        getMechanics();
    }, []);

    const handleEditClick = (mechanic: Mechanic) => {
        setEditingMechanicUsername(mechanic.username);
        setEditedMechanic(mechanic); // Set the client being edited
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedMechanic((prev) => ({
            ...prev,
            [name]: value, // Dynamically update the edited field
        }));
    };

    const handleSaveClick = async () => {
        try {
            const updatedMechanic = {
                ...editedMechanic,
                //ifEmployed: editedMechanic.ifEmployed === 'YES' ? 'NO' : 'YES', // Toggle the value
            };

            // Optionally, send the updated client to the backend
            await axios.patch(`/fire/mechanic`, updatedMechanic);
            //await axios.put(`/clients/${editingClientId}`, editedClient);

            // Update the client in the local state
            setListOfMechanics((prevMechanics) =>
                prevMechanics.map((mechanic) =>
                    mechanic.username === editingMechanicUsername
                        ? { ...mechanic, ...updatedMechanic }
                        : mechanic
                )
            );

            await getMechanics();

            // Clear editing state
            setEditingMechanicUsername(null);
            setEditedMechanic({});
        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingMechanicUsername(null); // Exit editing mode without saving
        setEditedMechanic({});
    };

    // Handle the button click
    // const handleToggleEmployment = () => {
    //     setIfEmployed((prevStatus) => !prevStatus); // Toggle the employment status
    // };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const filteredMechanics = searchTerm
        ? listOfMechanics.filter(mechanic =>
            mechanic.username.toLowerCase().startsWith(searchTerm))
        : listOfMechanics;

    // Pagination logic
    const indexOfLastMechanic = currentPage * itemsPerPage;
    const indexOfFirstMechanic = indexOfLastMechanic - itemsPerPage;
    const currentMechanic = filteredMechanics.slice(indexOfFirstMechanic, indexOfLastMechanic);
    const totalPages = Math.ceil(filteredMechanics.length / itemsPerPage);


    return (
        <>
            <Menu></Menu>
            <div className="lista" id="lista">
                <h2>Mechanics:</h2>

                <input
                    type="text"
                    placeholder="seach by mechanic username"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {getRequestError ? (
                    <p>Failed to fetch mechanics. Please try again later.</p>
                ) : (
                    <table id="tabela_mechaników">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Username</th>
                            <th>If employed</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentMechanic.length > 0 ? (
                            currentMechanic.map((mechanic) => (
                                <tr key={mechanic.username}>
                                    {editingMechanicUsername === mechanic.username ? (
                                        <>
                                            <td>{mechanic.mechanicId}</td>
                                            <td>{mechanic.firstName}</td>
                                            <td>{mechanic.secondName}</td>
                                            <td>{mechanic.username}</td>
                                            <td>{mechanic.ifEmployed}</td>
                                            <td>
                                                <button onClick={handleSaveClick}>Accept</button>
                                                <button onClick={handleCancelClick}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{mechanic.mechanicId}</td>
                                            <td>{mechanic.firstName}</td>
                                            <td>{mechanic.secondName}</td>
                                            <td>{mechanic.username}</td>
                                            <td>{mechanic.ifEmployed}</td>
                                            <td>
                                                <button id="modify"
                                                        onClick={() => handleEditClick(mechanic)}>{mechanic.ifEmployed === 'YES' ? 'Fire' : 'Hire'} {/* Show Zwolnij if employed, Zatrudnij if not */}</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>No result</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
                {filteredMechanics.length > 0 && (
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

export default Mechanics;