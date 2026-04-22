// click to copy component
import React, { useState } from 'react';

interface ClickToCopyProps {
    text: string;
}

const ClickToCopy: React.FC<ClickToCopyProps> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        void navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <button onClick={handleCopy} className="btn btn-sm">
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
};

export default ClickToCopy;