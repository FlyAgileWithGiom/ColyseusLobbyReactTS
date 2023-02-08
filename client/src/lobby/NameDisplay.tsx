import React, {useRef, useState} from 'react';

interface NameDisplayProps {
    initialName: string;
    onConfirmNameChange: (newName: string) => void;
}

const NameDisplay: React.FC<NameDisplayProps> = ({initialName, onConfirmNameChange}) => {
    const [localName, setLocalName] = useState(initialName);
    const [isModified, setIsModified] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalName(event.target.value);
        setIsModified(true);
    };

    const handleModifyClick = () => {
        onConfirmNameChange(localName);
        setIsModified(false);
        inputRef.current?.blur();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onConfirmNameChange(localName);
            setIsModified(false);
            inputRef.current?.blur();
        }
    };

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        if (isModified) {
            setLocalName(initialName);
            setIsModified(false);
        }
        setIsInputFocused(false);
    };

    return (
        <div className="flex flex-col items-center">
            <p className="text-xl font-medium mb-4">Modify Your Name</p>
            <input
                className={`outline-none border border-blue-500 focus:border-blue-500 ${
                    isInputFocused ? "border-blue-500" : ""
                } p-2 rounded-lg`}
                type="text"
                ref={inputRef}
                value={localName}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <button
                disabled={!isModified}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
                onClick={handleModifyClick}
            >
                Modify
            </button>
        </div>
    );

};

export default NameDisplay;
