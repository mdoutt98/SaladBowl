import React from 'react';
import styled from 'styled-components';

// Styled components (ensure these are defined or import them from your styles file)
const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const LargeLabel = styled.h2`
    font-size: 36px;
    margin: 10px 0;
`;

const SessionCode = styled.p`
    font-size: 48px;
    margin: 10px 0;
    font-weight: bold;
`;

const PlayersList = styled.ul`
    font-size: 24px;
    list-style-type: none;
    padding: 0;
`;

const PlayerItem = styled.li`
    margin: 5px 0;
`;

const StyledButton = styled.button`
    margin: 10px;
    padding: 10px 15px;
    font-size: 24px;
    cursor: pointer;
`;

// PlayerLobby component
const PlayerLobby = ({ sessionCode, players = [], onStartGame }) => {
    return (
        <CenteredDiv>
            <LargeLabel>Successfully joined the Game</LargeLabel>
            <SessionCode>{sessionCode}</SessionCode>
            <LargeLabel>Players in Lobby:</LargeLabel>
            <PlayersList>
                {players.length > 0 ? (
                    players.map((player, index) => (
                        <PlayerItem key={index}>Player {player.number}: {player.name}</PlayerItem>
                    ))
                ) : (
                    <p>Waiting for players...</p>
                )}
            </PlayersList>
            <StyledButton onClick={onStartGame}>Start Game</StyledButton>
        </CenteredDiv>
    );
};

export default PlayerLobby;
