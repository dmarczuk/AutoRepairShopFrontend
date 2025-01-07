import React, { useState } from 'react';
import {useApi} from "../../composables/useApi";
import { Client } from '../../models/models';

const AddMechanicForm: React.FC = () => {
    const { sendClient, postRequestError } = useApi();
    const [client, setClient] = useState<Client>({
        id: 0,
        firstName: '',
        secondName: '',
        phoneNumber: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendClient(client);
    };

    return (
        <div>
            <h2>Add Client</h2>
    <form onSubmit={handleSubmit}>
        <label>
            First Name:
        <input type="text" name="firstName" value={client.firstName} onChange={handleChange} />
    </label>
    <label>
    Second Name:
        <input type="text" name="secondName" value={client.secondName} onChange={handleChange} />
    </label>
    <label>
    Phone Number:
        <input type="text" name="phoneNumber" value={client.phoneNumber} onChange={handleChange} />
    </label>
    <label>
    Email:
    <input type="email" name="email" value={client.email} onChange={handleChange} />
    </label>
    <button type="submit">Add Client</button>
    </form>
    {postRequestError && <p>Error submitting client. Please try again.</p>}
    </div>
    );
};

export default AddMechanicForm;