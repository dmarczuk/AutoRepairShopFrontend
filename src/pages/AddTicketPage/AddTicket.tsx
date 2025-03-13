import React, {useEffect, useState} from 'react';
import {useApi} from "../../composables/useApi";
import {TicketDto} from "../../models/models";
import {Menu} from "../../components/Menu";

const AddTicket: React.FC = () => {
    const { sendTicketDto, postRequestError, successMessage } = useApi();
    const [ticket, setTicketDto] = useState<TicketDto>({
        client: {
            clientId: 0,
            firstName: '',
            secondName: '',
            phoneNumber: '',
            email: ''
        },
        car: {
            vehicleRegistration: '',
            mark: '',
            model: '',
            productionYear: 0,
            vin: ''
        }
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
        setTicketDto((prevTicketDto) => ({
            ...prevTicketDto,
            client: {
                ...prevTicketDto.client,
                [id]: value,
            },
            car: {
                ...prevTicketDto.car,
                [id]: value,
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendTicketDto(ticket);
    };

    return (
        <>
            <Menu></Menu>
            <div className="formularz">
            <h2>Dodanie zgłoszenia</h2>
            <form onSubmit={handleSubmit}>
                <h3>Dane klienta:</h3>
                <label htmlFor="firstName">Imię:</label>
                <input type="text" id="firstName" value={ticket.client.firstName} onChange={handleChange}/>
                <label htmlFor="secondName">Nazwisko:</label>
                <input type="text" id="secondName" value={ticket.client.secondName} onChange={handleChange}/>
                <label htmlFor="phoneNumber">Numer telefonu:</label>
                <input type="text" id="phoneNumber" value={ticket.client.phoneNumber} onChange={handleChange}/>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={ticket.client.email} onChange={handleChange}/>
                <h3>Dane pojazdu:</h3>
                <label htmlFor="rejestracja">Rejestracja:</label>
                <input type="text" id="vehicleRegistration" value={ticket.car.vehicleRegistration} onChange={handleChange}/>
                <label htmlFor="marka">Marka:</label>
                <input type="text" id="mark" value={ticket.car.mark} onChange={handleChange}/>
                <label htmlFor="model">Model:</label>
                <input type="text" id="model" value={ticket.car.model} onChange={handleChange}/>
                <label htmlFor="rocznik">Rocznik:</label>
                <input type="number" id="productionYear" value={ticket.car.productionYear} onChange={handleChange}/>
                <label htmlFor="vin">VIN:</label>
                <input type="text" id="vin" value={ticket.car.vin} onChange={handleChange}/>
                <button type="submit">Dodaj zgloszenie</button>
            </form>
            {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
            {postRequestError && (
                <p style={{color: 'red'}}>Error adding ticket. Please try again.</p>
            )}
        </div>
        </>
    );
};

export default AddTicket;