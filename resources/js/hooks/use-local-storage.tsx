import { useEffect, useState } from 'react';

export function useLocalStorage(key: string) {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        setValue(localStorage.getItem(key) ?? '');
    }, [key]);

    function setLocalStorage(newValue: string) {
        localStorage.setItem(key, newValue);
        setValue(newValue);
    }

    return [value, setLocalStorage] as const;
}
