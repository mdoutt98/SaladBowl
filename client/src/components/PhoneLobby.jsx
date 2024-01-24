import React, { useState } from 'react';
import styled from 'styled-components';

const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow:hidden;
`;

const StyledButton = styled.button`
    margin: 10px;
    padding: 10px 15px;
    font-size: 24px;
    cursor: pointer;
`;

const StyledInput = styled.input`
    display: block;
    margin: 10px;
    padding: 15px 15px;
    font-size: 25px;
    font-weight: 700;
    width: 300px; // or any other size you prefer
    color: black;
    background: white;
    border: 2px solid black;
    border-radius: 5px;
    font-family: 'Comic Sans MS', sans-serif; // Example of a fun font
`;

const PhoneLobby = () => {
    const [sessionCode, setSessionCode] = useState('');
    const [playerName, setPlayerName] = useState('');

    const createSession = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Game session created:', data);
                setSessionCode(data.sessionCode); // Automatically fill the session code after creation
            })
            .catch((error) => {
                console.error('Error creating game session:', error);
            });
    };

    const joinSession = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionCode, playerName }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Joined the session successfully:', data);
            })
            .catch((error) => {
                console.error('Error joining session:', error);
            });
    };

    return (
        <CenteredDiv>
            <StyledButton onClick={createSession}>Create New Game Session</StyledButton>
            <StyledInput
                type="text"
                placeholder="Session Code"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
            />
            <StyledInput
                type="text"
                placeholder="Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <StyledButton onClick={joinSession}>Join Session</StyledButton>
        </CenteredDiv>
    );
};

export default PhoneLobby;
