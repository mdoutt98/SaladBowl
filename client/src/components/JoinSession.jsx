// JoinSession.js
import React, { useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the server

const CenteredDiv = styled.div`
    // ... (styles as needed)
`;

const JoinSession = () => {
    const [sessionCode, setSessionCode] = useState('');
    const [username, setUsername] = useState('');

    const handleJoin = () => {
        socket.emit('joinGame', { sessionCode, player: username });
        // Handle navigation or UI update as needed
    };

    return (
        <CenteredDiv>
            <input
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
                placeholder="Session Code"
            />
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <button onClick={handleJoin}>Join Session</button>
        </CenteredDiv>
    );
};

export default JoinSession;
