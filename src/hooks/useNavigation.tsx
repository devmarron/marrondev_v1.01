// src/hooks/useNavigation.tsx
import { useNavigation } from '../contexts/NavigationContext';

export const useNavControls = () => {
    const { sections, currentSection, setCurrentSection } = useNavigation();

    const goToNextSection = () => {
        const currentIndex = sections.indexOf(currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        setCurrentSection(sections[nextIndex]);
    };

    const goToPrevSection = () => {
        const currentIndex = sections.indexOf(currentSection);
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        setCurrentSection(sections[prevIndex]);
    };

    return { goToNextSection, goToPrevSection };
};