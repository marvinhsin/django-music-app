import React, {Component} from "react";
import {render} from "react-dom";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

const App = () => {
    return (
        <div className="center">
            <HomePage />
        </div>
    );
};

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);


