import React, { useState } from 'react';
import {useApi} from "../../composables/useApi";
import {Car, CarClientDto, Client} from '../../models/models';
import {Menu} from "../../components/Menu";

const AddVehicleForm: React.FC = () => {
    const { sendCarClientDto, postRequestError, successMessage } = useApi();
    const [carClient, setCarClientDto] = useState<CarClientDto>({
        car: {
            vehicleRegistration: '',
            mark: '',
            model: '',
            productionYear: 0,
            vin: ''
        },
        phoneNumber: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setCarClientDto((prevCarClient) => {
            if (id in prevCarClient.car) {
                // Update car fields
                return {
                    ...prevCarClient,
                    car: {
                        ...prevCarClient.car,
                        [id]: value,
                    },
                };
            } else if (id === 'phoneNumber') {
                // Update phoneNumber
                return {
                    ...prevCarClient,
                    phoneNumber: value,
                };
            }
            return prevCarClient; // No changes for unmatched ids
        });
    };
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { id, value } = e.target;
    //     setCarClientDto((prevCarClient) => ({
    //         ...prevCarClient,
    //         car: {
    //             ...prevCarClient.car,
    //             [id]: value,
    //         },
    //         ...prevCarClient.phoneNumber,
    //         [id]: value,
    //     }));
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendCarClientDto(carClient);
    };

    return (
        <>
            <Menu></Menu>
            <div className="formularz">
                <h2>Dodanie pojazdu</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Dane klienta:</h3>
                    <label htmlFor="vehicleRegistration">Rejestracja pojazdu:</label>
                    <input type="text" id="vehicleRegistration" value={carClient.car.vehicleRegistration}
                           onChange={handleChange}/>
                    <label htmlFor="mark">Marka:</label>
                    <input type="text" id="mark" value={carClient.car.mark} onChange={handleChange}/>
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" value={carClient.car.model} onChange={handleChange}/>
                    <label htmlFor="productionYear">Rok produkcji:</label>
                    <input type="number" id="productionYear" value={carClient.car.productionYear} onChange={handleChange}/>
                    <label htmlFor="vin">VIN:</label>
                    <input type="text" id="vin" value={carClient.car.vin} onChange={handleChange}/>
                    <label htmlFor="phoneNumber">Telefon:</label>
                    <input type="text" id="phoneNumber" value={carClient.phoneNumber} onChange={handleChange}/>
                    <button type="submit">Add car</button>
                </form>
                {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
                {postRequestError && (
                    <p style={{ color: 'red' }}>Error adding client. Please try again.</p>
                )}
            </div>
        </>
    );
};

export default AddVehicleForm;