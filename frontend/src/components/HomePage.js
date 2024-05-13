import React, {Component, useState, useEffect} from 'react';
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import Room from './Room';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
const HomePage = () => {
    const [roomCode, setRoomCode] = useState(null);

    const renderHomePage = () => {
        return (
            <Grid container spacing={3}>
                <Grid item cs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                        <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    };

    const clearRoomCode = () => {
        setRoomCode(null);
    };

    useEffect(() => {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            });
    }, []);

    return (
        <Router>
            <Routes>
                <Route 
                    exact 
                    path="/" 
                    element={
                        roomCode ? (
                            <Navigate replace to={`/room/${roomCode}`} />
                        ) : (
                            renderHomePage()
                        )
                    }
                    /> 
                <Route path='/join' element={<RoomJoinPage />}/>
                <Route path='/create' element={<CreateRoomPage />}/>
                <Route 
                    path='/room/:roomCode' 
                    element={<Room leaveRoomCallback={clearRoomCode}/>}
                    />
            </Routes>
        </Router>
    );
};

export default HomePage