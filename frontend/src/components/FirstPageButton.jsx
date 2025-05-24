import React from 'react'
import { buttonData } from "../components/FirstPageData"
import { buttonData2 } from "../components/FirstPageData"
import { buttonData3 } from "../components/FirstPageData"
import "../css/firstPage.css";


function FirstPageButton() {
    return (
        <div>
            <div className="button-grid">
                {buttonData.map((item, index) => (
                    <button
                        key={index}
                        className={`grid-button ${item.active ? "active" : "disabled"}`}
                        disabled={!item.active}
                        onClick={() => {
                            if (item.active && item.link) {
                                window.location.href = item.link
                            }
                        }}
                    >
                        <span className="icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
            <hr />
            <div className="button-grid">
                {buttonData2.map((item, index) => (
                    <button
                        key={index}
                        className={`grid-button ${item.active ? "active" : "disabled"}`}
                        disabled={!item.active}
                        onClick={() => {
                            if (item.active && item.link) {
                                window.location.href = item.link
                            }
                        }}
                    >
                        <span className="icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
            <hr />
            <div className="button-grid">
                {buttonData3.map((item, index) => (
                    <button
                        key={index}
                        className={`grid-button ${item.active ? "active" : "disabled"}`}
                        disabled={!item.active}
                        onClick={() => {
                            if (item.active && item.link) {
                                window.location.href = item.link
                            }
                        }}
                    >
                        <span className="icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>


    )
}

export default FirstPageButton