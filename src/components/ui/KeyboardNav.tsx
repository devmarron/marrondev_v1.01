// src/components/ui/KeyboardNav.tsx
import { useKeyboard } from '../../hooks/useKeyboard';
import { useNavControls } from '../../hooks/useNavigation';

export default function KeyboardNav() {
    const { goToNextSection, goToPrevSection } = useNavControls();

    useKeyboard((key) => {
        if (key === 'ArrowRight' || key === 'ArrowUp') goToNextSection();
        if (key === 'ArrowLeft' || key === 'ArrowDown') goToPrevSection();
    });

    return null; // Componente invisible que solo maneja eventos
}