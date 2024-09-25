import React, { useState } from 'react';
import './Grid.css';
import Replicate from 'replicate';

// Load API token from .env file
const replicate = new Replicate({
    auth: process.env.REACT_APP_REPLICATE_API_TOKEN
});

const Grid = () => {
    const [selectedDisruption, setSelectedDisruption] = useState(null);
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);

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
        "Low-level Disruption": "🔉",
        "Challenging Authority": "🗣️",
        "Excessive Talking": "💬",
        "Off-Task Behavior": "🧭",
        "Disrespect": "🙅‍♂️",
        "Group Disruption": "👥",
        "Tired Students": "😴",
        "Fidgeting": "👐",
        "Unprepared": "📚",
        "Tech Issues": "💻",
        "Out of Seat": "🚶‍♂️",
        "Excessive Movement": "🏃‍♂️",
        "Other": "❓"
    };

    const fetchSuggestion = async (disruption) => {
        setLoading(true);
        try {
            const output = await replicate.run(
                "your-replicate-model-id", // Replace with your Replicate model ID
                {
                    input: {
                        prompt: `Give me a classroom management strategy for: ${disruption}`
                    }
                }
            );
            setSuggestion(output);
        } catch (error) {
            console.error("Error fetching suggestion:", error);
            setSuggestion("Sorry, couldn't fetch a suggestion. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDisruptionClick = (label) => {
        setSelectedDisruption(label);
        fetchSuggestion(label); // Fetch AI-generated suggestion
    };

    const handleNewSuggestionClick = () => {
        if (selectedDisruption) {
            fetchSuggestion(selectedDisruption); // Fetch new suggestion for the same disruption
        }
    };

    return (
        <div>
            <div className="grid-container">
                {buttons.slice(0, 12).map((label, index) => (
                    <button
                        key={index}
                        className={`key ${categoryMap[label]}`}
                        onClick={() => handleDisruptionClick(label)}>
                        {emojiMap[label]} {label}
                    </button>
                ))}
                <div className="other-button-container">
                    <button
                        className={`key ${categoryMap["Other"]}`}
                        onClick={() => handleDisruptionClick("Other")}>
                        {emojiMap["Other"]} Other
                    </button>
                </div>
            </div>
            {selectedDisruption && (
                <div className="suggestion-box">
                    <h3>Suggestion for: {selectedDisruption}</h3>
                    {loading ? <p>Loading...</p> : <p>{suggestion}</p>}
                    {!loading && (
                        <button onClick={handleNewSuggestionClick}>
                            Generate New Suggestion
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Grid;
