import React, { useEffect } from 'react';

const Footer = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.kofiwidget2) {
                window.kofiwidget2.init('Buy me a coffee with Ko-fi', '#29abe0', 'U7U813R06N');
                window.kofiwidget2.draw();
            }
        };

        return () => {
            // Clean up script when component unmounts
            document.body.removeChild(script);
        };
    }, []);

    return (
        <footer style={{ marginTop: '30px', textAlign: 'center' }}>
            <div>
                <a href="https://github.com/rapfl/thisvandoesnotexist" target="_blank" rel="noopener noreferrer">GitHub</a> |
                <a href="https://example.com/link2" target="_blank" rel="noopener noreferrer">About</a> |
                <a href="https://example.com/link3" target="_blank" rel="noopener noreferrer">Sign Up for Custom Prompts</a>
            </div>
            <div style={{ marginTop: '15px' }} id="kofi-button-container"></div> {/* Separate container for Ko-fi */}
        </footer>
    );
};

export default Footer;