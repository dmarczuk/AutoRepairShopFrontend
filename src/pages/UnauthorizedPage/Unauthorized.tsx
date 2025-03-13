import React from 'react';
import {Menu} from "../../components/Menu";

const Unauthorized: React.FC = () => {
    return (
        <>
            <Menu></Menu>
            <div className="main">
                <h2>Brak dostępu</h2>
                <p>Musisz się zalogować, aby wyświetlić tą stronę</p>
            </div>
        </>
    )
};

export default Unauthorized;