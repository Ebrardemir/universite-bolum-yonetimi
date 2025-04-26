import React from 'react';
import Panel from '../components/Panel';


const PanelPage = () => {
    const role = "akademikPersonel";

    return (
        <div >
            <p style={{ margin: "30px", fontSize: "40px", fontFamily: "arial", fontWeight: "bold" }}>Panel</p>
            <Panel role={role} />
        </div>
    );
};

export default PanelPage;
