// src/contexts/NavigationContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface NavigationContextType {
    sections: string[];
    currentSection: string;
    setCurrentSection: (section: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{
    children: ReactNode;
    sections: string[];
    currentSection: string;
    setCurrentSection: (section: string) => void;
}> = ({ children, sections, currentSection, setCurrentSection }) => {
    return (
        <NavigationContext.Provider value={{ sections, currentSection, setCurrentSection }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};