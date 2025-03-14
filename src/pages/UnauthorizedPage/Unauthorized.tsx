import React from 'react';
import {Menu} from "../../components/Menu";

const Unauthorized: React.FC = () => {
    return (
        <>
            <Menu></Menu>
            <div className="main">
                <h2>Unauthorized</h2>
                <p>I have to log in to display this page</p>
            </div>
        </>
    )
};

export default Unauthorized;