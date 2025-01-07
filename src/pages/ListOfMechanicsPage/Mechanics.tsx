import React, {useEffect} from 'react';
import {useApi} from "../../composables/useApi";

const Mechanics: React.FC = () => {
    const {getClients, listOfClients, getRequestError} = useApi();

    // Fetch the list of clients when the component loads
    useEffect(() => {
        getClients();
    }, [getClients]);


    return (
        <div>
            <h2>Clients</h2>
            {getRequestError ? (
                <p>Error fetching client list. Please try again later.</p>
            ) : (
                <ul>
                    {listOfClients.map((client) => (
                        <li key={client.id}>
                            {client.firstName} {client.secondName} - {client.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Mechanics;