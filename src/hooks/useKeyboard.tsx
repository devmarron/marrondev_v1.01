// src/hooks/useKeyboard.tsx
import { useEffect } from 'react';

export const useKeyboard = (handler: (key: string) => void) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                handler(e.key);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handler]);
};