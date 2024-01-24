// App.js

import React, { useState } from 'react';
import './App.css';
import PhoneLobby from './components/PhoneLobby.jsx';
import TvLobby from './components/TvLobby.jsx';
import styled from 'styled-components';

const StyledApp = styled.div`
    font-family: Arial, sans-serif;
    overflow: hidden; 
    min-height: 100vh; // Full view height
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledTabButton = styled.button`
    font-size: 22px; /* Increase font size */
    padding: 12px 0; /* Add more padding */
    width: 125px;
    cursor: pointer;
`;


const App = () => {
    const [activeTab, setActiveTab] = useState('phone');

    return (
        <StyledApp>
        <div className="App">
            <div className="tabs">
                <StyledTabButton
                    className={`tab-button ${activeTab === 'phone' ? 'active' : ''}`}
                    onClick={() => setActiveTab('phone')}
                >
                    Phone
                </StyledTabButton>
                <StyledTabButton
                    className={`tab-button ${activeTab === 'tv' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tv')}
                >
                    TV
                </StyledTabButton>
            </div>
            <div className="tab-content">
                {activeTab === 'phone' && <PhoneLobby />}
                {activeTab === 'tv' && <TvLobby />}
            </div>
        </div>
        </StyledApp>
    );
};

export default App;