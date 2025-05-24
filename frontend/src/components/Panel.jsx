import React from 'react';
import { panelConfig } from './PanelConfig';
import { useNavigate } from 'react-router-dom';
import '../css/panel.css';

const Panel = ({ role }) => {
    const navigate = useNavigate();
    const items = panelConfig[role];

    return (
        <div className="panel-container">
            {items.map((item, index) => (
                <div key={index} className="panel-card">
                    <div>
                        <h2 className="panel-title">{item.title}</h2>
                        {item.description && <p className="panel-description">{item.description}</p>}
                    </div>
                    <button
                        className="panel-button"
                        onClick={() => navigate(item.path)}
                    >
                        {item.buttonText}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Panel;
