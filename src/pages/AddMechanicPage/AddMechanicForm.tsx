import React, { useState } from 'react';
import {useApi} from "../../composables/useApi";
import {Client, Mechanic} from '../../models/models';
import {Menu} from "../../components/Menu";

const AddMechanicForm: React.FC = () => {
    const { sendMechanic, postRequestError, successMessage } = useApi();
    const [mechanic, setMechanic] = useState<Mechanic>({
        mechanicId: 0,
        firstName: '',
        secondName: '',
        ifEmployed: '',
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setMechanic((prevMechanic) => ({
            ...prevMechanic,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMechanic(mechanic);
    };

    return (
        <>
            <Menu></Menu>
            <div className="formularz">
                <h2>Add mechanic</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Mechanic data:</h3>
                    <label htmlFor="firstName">FirstName:</label>
                    <input type="text" id="firstName" value={mechanic.firstName} onChange={handleChange}/>
                    <label htmlFor="secondName">LastName:</label>
                    <input type="text" id="secondName" value={mechanic.secondName} onChange={handleChange}/>
                    <label htmlFor="login">Username:</label>
                    <input type="text" id="username" value={mechanic.username} onChange={handleChange}/>
                    <label htmlFor="password">password:</label>
                    <input type="password" id="password" value={mechanic.password} onChange={handleChange}/>
                    <button type="submit">Add Mechanic</button>
                </form>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {postRequestError && (
                    <p style={{ color: 'red' }}>Error adding mechanic. Please try again.</p>
                )}
            </div>
        </>
    )
};

export default AddMechanicForm;