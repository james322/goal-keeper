import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from 'react';
import { useLocalStorage } from '../use-local-storage';

export function useTextarea(key: string) {
    const [characterCount, setCharacterCount] = useState(0);
    const [value, setLocalStorage] = useLocalStorage(key);
    const [isFocused, setIsFocused] = useState(false);
    const [showSaveText, setShowSaveText] = useState(false);

    useEffect(() => {
        setCharacterCount(value.length);
    }, [value]);

    useEffect(() => {
        if (isFocused && value.trim().length > 0) {
            setShowSaveText(true);
        } else {
            setShowSaveText(false);
        }
    }, [isFocused, value]);

    function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const textArea = e.target;
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
        setLocalStorage(textArea.value);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>, callback: () => void) {
        if ((e.key === 'Enter' || e.keyCode === 13) && e.ctrlKey) {
            e.preventDefault();
            callback();
        }
    }

    return {
        characterCount,
        value,
        isFocused,
        setIsFocused,
        showSaveText,
        setLocalStorage,
        handleInputChange,
        handleKeyDown,
    };
}
