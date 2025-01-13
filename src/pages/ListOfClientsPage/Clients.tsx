import React, {useEffect, useState} from 'react';
import {useApi} from "../../composables/useApi";
import {Client} from "../../models/models";
import axios from "../../services/axiosConfig";
import {Menu} from "../../components/Menu";

const Clients: React.FC = () => {
    //const [listOfClients, setListOfClients] = useState<Client[]>([]);
   // const [getRequestError, setGetRequestError] = useState<boolean>(false);
    const [getRequestError, setGetRequestError] = useState(false);
    const [listOfClients, setListOfClients] = useState<Client[]>([]); // React state for the client list
    const [editingClientPhoneNumber, setEditingClientPhoneNumber] = useState<string | null>(null);
    const [editedClient, setEditedClient] = useState<Partial<Client>>({});

    const getClients = async () => {
        try {
            const response = await axios.get(`/clients`);
            setListOfClients((prevClients) => {
                //console.log('Previous clients:', prevClients);
                //.log('New clients:', response.data);
                return response.data.sort((a: Client, b: Client) => a.clientId - b.clientId);
            });
            setGetRequestError(false);
            //console.log("WORKING");
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

    return (
        <>
            <Menu></Menu>
            <div className="lista_klientów" id="lista_klientów">
            <h2>Klienci:</h2>
            {getRequestError ? (
                <p>Failed to fetch clients. Please try again later.</p>
            ) : (
                <table id="tabela_klientów">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Telefon</th>
                        <th>Email</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listOfClients.map((client) => (
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
                                        <button onClick={handleSaveClick}>Zapisz</button>
                                        <button onClick={handleCancelClick}>Anuluj</button>
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
                                        <button id="modify" onClick={() => handleEditClick(client)}>Modyfikuj</button>
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

export default Clients;