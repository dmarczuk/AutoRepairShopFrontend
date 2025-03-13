import React, {useEffect, useState} from 'react';
import {useApi} from "../../composables/useApi";
import {Client} from "../../models/models";
import axios from "../../services/axiosConfig";
import {Menu} from "../../components/Menu";

const Clients: React.FC = () => {
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfClients, setListOfClients] = useState<Client[]>([]); // React state for the client list
    const [editingClientPhoneNumber, setEditingClientPhoneNumber] = useState<string | null>(null);
    const [editedClient, setEditedClient] = useState<Partial<Client>>({});

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const getClients = async () => {
        try {
            const response = await axios.get(`/clients`);
            setListOfClients((prevClients) => {
                return response.data.sort((a: Client, b: Client) => a.clientId - b.clientId);
            });
            setGetRequestError(false);
            //navigate('/checkResults/results');
        } catch (error) {
            if (error) setGetRequestError(true);
            else setGetRequestError(false);
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    const handleEditClick = (client: Client) => {
        setEditingClientPhoneNumber(client.phoneNumber);
        setEditedClient(client); // Set the client being edited
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedClient((prev) => ({
            ...prev,
            [name]: value, // Dynamically update the edited field
        }));
    };

    const handleSaveClick = async () => {
        try {
            // Optionally, send the updated client to the backend
             await axios.patch(`/modify/client`, editedClient);
             //await axios.put(`/clients/${editingClientId}`, editedClient);

            // Update the client in the local state
            setListOfClients((prevClients) =>
                prevClients.map((client) =>
                    client.phoneNumber === editingClientPhoneNumber ? { ...client, ...editedClient } : client
                )
            );

            // Clear editing state
            setEditingClientPhoneNumber(null);
            setEditedClient({});
        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingClientPhoneNumber(null); // Exit editing mode without saving
        setEditedClient({});
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase()); // Convert search input to lowercase
        setCurrentPage(1); // Reset to first page on search
    };

    // Filter clients by phone number if search term is entered
    const filteredClients = searchTerm
        ? listOfClients.filter(client => client.phoneNumber.startsWith(searchTerm))
        : listOfClients;

    // Pagination logic
    const indexOfLastClient = currentPage * itemsPerPage;
    const indexOfFirstClient = indexOfLastClient - itemsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

    return (
        <>
            <Menu></Menu>
            <div className="lista" id="lista">
                <h2>Clients:</h2>
                <input
                    type="text"
                    placeholder="Search by phone..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {getRequestError ? (
                    <p>Failed to fetch clients. Please try again later.</p>
                ) : (
                    <table id="tabela_klientów">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentClients.length > 0 ? (
                            currentClients.map((client) => (
                                <tr key={client.phoneNumber}>
                                    {editingClientPhoneNumber === client.phoneNumber ? (
                                        <>
                                            <td>{client.clientId}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={editedClient.firstName || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="secondName"
                                                    value={editedClient.secondName || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>{client.phoneNumber}</td>
                                            {/* Phone number is not editable */}
                                            <td>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={editedClient.email || ''}
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
                                            <td>{client.clientId}</td>
                                            <td>{client.firstName}</td>
                                            <td>{client.secondName}</td>
                                            <td>{client.phoneNumber}</td>
                                            <td>{client.email}</td>
                                            <td>
                                                <button id="modify" onClick={() => handleEditClick(client)}>Modify
                                                </button>
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

                {/* Pagination Controls */}
                {filteredClients.length > 0 && (
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

export default Clients;