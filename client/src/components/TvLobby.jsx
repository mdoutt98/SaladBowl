//TvLobby.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the server at the appropriate URL

const LargeLabel = styled.h2`
    font-size: 36px; // Increase the font size for labels
    margin: 10px 0;
`;

const SessionCode = styled.p`
    font-size: 48px; // Increase the font size for the session code
    margin: 10px 0;
    font-weight: bold;
`;

const PlayersList = styled.ul`
    font-size: 24px; // Increase the font size for the players list
    list-style-type: none; // Optional: remove bullet points
    padding: 0;
`;

const PlayerItem = styled.li`
    margin: 5px 0;
`;

const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; // Centers horizontally in a flex container
    align-items: center; // Centers vertically in a flex container
    width: 100vw; // 100% of the viewport width
    height: 100vh; // 100% of the viewport height
    overflow: hidden;
`
const TvLobby = () => {
    const [sessionDetails, setSessionDetails] = useState({ sessionCode: '', players: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [sessionCode, setSessionCode] = useState('');

    // Assuming you have a way to get the current session code (e.g., from URL params or state)

    useEffect(() => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/game/recent`) // Fetch the most recent session
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch the most recent session code.');
                }
            })
            .then((data) => {
                setSessionDetails(data.session); // Assuming you want to display session details
                setIsLoading(false);
                setSessionCode(data.sessionCode)
            })
            .catch((error) => {
                setError('Error fetching the most recent session code.');
                console.error('Error fetching the most recent session code:', error);
                setIsLoading(false);
            });


        // Listen for 'playerJoined' event from the server
        socket.on('playerJoined', (data) => {
            setSessionDetails(prevDetails => ({
                ...prevDetails,
                players: [...prevDetails.players, data.player]
            }));
        });

    }, []); // Empty dependency array means this effect runs once on mount

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <CenteredDiv>
            <LargeLabel>Connection Code:</LargeLabel>
            <SessionCode>{sessionCode || 'Loading...'}</SessionCode>
            <LargeLabel>Players in Lobby:</LargeLabel>
            <PlayersList>
                {sessionDetails.players.length > 0 ? (
                    sessionDetails.players.map((player, index) => (
                        <PlayerItem key={index}>Player {player.number}: {player.name}</PlayerItem>
                    ))
                    ) : (
                    <p>Waiting for players...</p>
                )}
            </PlayersList>
        </CenteredDiv>
    );
};

export default TvLobby;