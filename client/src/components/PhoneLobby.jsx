import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayerLobby from './PlayerLobby';
import io from 'socket.io-client';



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
    const [hasJoined, setHasJoined] = useState(false); // New state to track if the user has joined the session
    const [players, setPlayers] = useState([]); // State to track the players in the session
    const [error, setError] = useState(''); // State to handle error messages
    const [socket, setSocket] = useState(null);


    // Initialize socket connection when player joins the session
    useEffect(() => {
        // Only attempt to create a socket connection if the user has joined
        if (hasJoined) {
            const newSocket = io('http://localhost:4000', {
                query: { sessionCode, playerName }
            });
            setSocket(newSocket);

            newSocket.on('playerJoined', (player) => {
                setPlayers(prevPlayers => [...prevPlayers, player]);
            });

            // Add more event listeners as needed

            // Clean up the socket connection when the component unmounts or the user leaves
            return () => {
                newSocket.disconnect();
            };
        }
    }, [hasJoined, sessionCode, playerName]);


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
                setHasJoined(true); // Set hasJoined to true when the session is joined successfully
                setPlayers(Array.isArray(data.players) ? data.players : []);
            })
            .catch((error) => {
                console.error('Error joining session:', error);
                setError('Error joining session. Please check your session code and try again.');

            });
    };
    const startGame = () => {
        if (socket) {
                socket.emit('startGame', { sessionCode });
            }
        };

    if (hasJoined) {
        // Render the PlayerLobby component when the user has joined the session
        return <PlayerLobby sessionCode={sessionCode} players={players} onStartGame={startGame} />;
    } else {
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
    }
};

export default PhoneLobby;
