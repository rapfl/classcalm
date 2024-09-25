// src/Grid.js
import React, { useState } from 'react';
import './Grid.css'; // Ensure you have this CSS file

const Grid = () => {
    const [selectedDisruption, setSelectedDisruption] = useState(null);
    const [suggestion, setSuggestion] = useState("");

    const buttons = [
        "Low-level Disruption",
        "Challenging Authority",
        "Excessive Talking",
        "Off-Task Behavior",
        "Disrespect",
        "Group Disruption",
        "Tired Students",
        "Fidgeting",
        "Unprepared",
        "Tech Issues",
        "Out of Seat",
        "Excessive Movement",
        "Other"
    ];

    const categoryMap = {
        "Low-level Disruption": "behavioral",
        "Challenging Authority": "behavioral",
        "Excessive Talking": "behavioral",
        "Off-Task Behavior": "behavioral",
        "Disrespect": "engagement",
        "Group Disruption": "engagement",
        "Tired Students": "engagement",
        "Fidgeting": "engagement",
        "Unprepared": "preparation",
        "Tech Issues": "preparation",
        "Out of Seat": "physical",
        "Excessive Movement": "physical",
        "Other": "other"
    };

    const emojiMap = {
        "Low-level Disruption": "🔉", // Speaker
        "Challenging Authority": "🗣️", // Speaking head
        "Excessive Talking": "💬", // Speech bubble
        "Off-Task Behavior": "🧭", // Compass
        "Disrespect": "🙅‍♂️", // Person gesturing no
        "Group Disruption": "👥", // Two people
        "Tired Students": "😴", // Sleepy face
        "Fidgeting": "👐", // Open hands
        "Unprepared": "📚", // Books
        "Tech Issues": "💻", // Laptop
        "Out of Seat": "🚶‍♂️", // Person walking
        "Excessive Movement": "🏃‍♂️", // Running person
        "Other": "❓" // Question mark
    };

    const getSuggestion = (disruption) => {
        switch (disruption) {
            case "Low-level Disruption":
                return "Try to engage them with a question.";
            case "Challenging Authority":
                return "Redirect the conversation by discussing class rules.";
            case "Excessive Talking":
                return "Involve them in a group activity.";
            case "Off-Task Behavior":
                return "Reiterate instructions clearly.";
            case "Disrespect":
                return "Have a private chat after class.";
            case "Group Disruption":
                return "Change the seating arrangement.";
            case "Tired Students":
                return "Incorporate a short physical activity.";
            case "Fidgeting":
                return "Allow use of fidget tools.";
            case "Unprepared":
                return "Offer a quick review of the material.";
            case "Tech Issues":
                return "Have backup materials ready.";
            case "Other":
                return "Discuss with the student to find a solution.";
            case "Out of Seat":
                return "Prompt them to participate actively.";
            case "Excessive Movement":
                return "Create a movement break.";
            default:
                return "";
        }
    };

    const handleDisruptionClick = (label) => {
        setSelectedDisruption(label);
        setSuggestion(getSuggestion(label));
    };

    return (
        <div>
            <div className="grid-container">
                {buttons.slice(0, 12).map((label, index) => (
                    <button
                        key={index}
                        className={`key ${categoryMap[label]}`} // Combine classes
                        onClick={() => handleDisruptionClick(label)}>
                        {emojiMap[label]} {label} {/* Display emoji with label */}
                    </button>
                ))}
                <div className="other-button-container">
                    <button
                        className={`key ${categoryMap["Other"]}`} // Combine classes for 'Other'
                        onClick={() => handleDisruptionClick("Other")}>
                        {emojiMap["Other"]} Other
                    </button>
                </div>
            </div>
            {selectedDisruption && (
                <div className="suggestion-box">
                    <h3>Suggestion for: {selectedDisruption}</h3>
                    <p>{suggestion}</p>
                </div>
            )}
        </div>
    );
};

export default Grid;
