import React, { useState } from 'react';
import {useApi} from "../../composables/useApi";
import { RepairMechanicDto } from '../../models/models';
import {Menu} from "../../components/Menu";

const AcceptationRepair: React.FC = () => {
    const { sendAcceptRepair, postRequestError } = useApi();
    const [ticketDto, setTicketDto] = useState<RepairMechanicDto>({
        repairId: 0,
        mechanicUsername: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setTicketDto((prevTicket) => ({
            ...prevTicket,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendAcceptRepair(ticketDto);
    };


    return (
        <>
            <Menu></Menu>
            <div>
            <div className="formularz">
                    <h2>Accept ticket</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="repairId">Repair ID:</label>
                        <input type="text" id="repairId" value={ticketDto.repairId} onChange={handleChange}/>
                        <label htmlFor="mechanicUsername">Mechanic username:</label>
                        <input type="text" id="mechanicUsername" value={ticketDto.mechanicUsername} onChange={handleChange}/>
                        <button type="submit">Accept ticket</button>
                        {/*<Button type="submit" onClick={() => sendNumbers({ inputNumbers: inputs })}*/}
                    </form>
                    {postRequestError && <p>Error submitting client. Please try again.</p>}
                </div>
            </div>
        </>
    );
};

export default AcceptationRepair;