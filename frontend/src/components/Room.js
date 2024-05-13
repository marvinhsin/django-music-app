import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from './CreateRoomPage';



const Room = (props) => {
    const [roomCode, setRoomCode] = useState('');
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + roomCode)
            .then((response) => {
                if (!response.ok) {
                    props.leaveRoomCallback();
                    navigate("/");
                } 
                console.log(props);
                return response.json();
            })
            .then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            });
    };

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "applicaiton/json"},
        };
        fetch('/api/leave-room', requestOptions)
            .then((response) => {
                props.leaveRoomCallback();
                console.log(response.data);
                navigate("/");
            })
    };


    const updateShowSettings = (val) => {
        setShowSettings(val);
    };

    const renderSettings = () => {
        return (
            <Grid container spacing={1}> 
                <Grid item xs={12} align="center">
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={votesToSkip} 
                        guestCanPause={guestCanPause} 
                        roomCode={roomCode} 
                        updateCallback={getRoomDetails}
                        />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }


    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    useEffect(() => {
        setRoomCode(params.roomCode);
    }, [params.roomCode]);
    
    useEffect(() => {
        console.log(roomCode);
        if (roomCode) {
            getRoomDetails();
        }
    }, [roomCode]);



    if (showSettings) {
        return renderSettings();
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" compoment="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" compoment="h4">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" compoment="h4">
                    Guest Can Pause: {guestCanPause ? 'Yes' : 'No'}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" compoment="h4">
                    Host: {isHost ? 'Yes' : 'No'}
                </Typography>
            </Grid>
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    );
};

export default Room;
