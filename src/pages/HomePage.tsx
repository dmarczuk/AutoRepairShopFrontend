import React from "react";
import {Menu} from "../components/Menu";

const HomePage: React.FC = () => {

    return (
        <>
            <Menu></Menu>
            <div className="main">
                <h2>Main Page</h2>
                <h2>CarShop. Welcome!</h2>
                <p>In bookmark add ticket you can send your ticket</p>
            </div>
        </>

    )
        ;
};

export default HomePage;