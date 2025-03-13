import React, {useEffect, useState} from 'react';
import {useApi} from "../../composables/useApi";
import { Client } from '../../models/models';
import {Menu} from "../../components/Menu";

const AddClientForm: React.FC = () => {
    const { sendClient, postRequestError, successMessage } = useApi();
    const [client, setClient] = useState<Client>({
        clientId: 0,
        firstName: '',
        secondName: '',
        phoneNumber: '',
        email: '',
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendClient(client);
    };

    return (
        <>
            <Menu></Menu>
            <div className="formularz">
                <h2>Add Client</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Client data:</h3>
                    <label htmlFor="firstName">FirstName:</label>
                    <input type="text" id="firstName" value={client.firstName} onChange={handleChange}/>
                    <label htmlFor="secondName">LastName:</label>
                    <input type="text" id="secondName" value={client.secondName} onChange={handleChange}/>
                    <label htmlFor="phoneNumber">Phone number:</label>
                    <input type="text" id="phoneNumber" value={client.phoneNumber} onChange={handleChange}/>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" value={client.email} onChange={handleChange}/>
                    <button type="submit">Add Client</button>
                </form>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {postRequestError && (
                    <p style={{ color: 'red' }}>Error adding client. Please try again.</p>
                )}
            </div>
        </>
    );
};

export default AddClientForm;