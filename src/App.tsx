// src/App.tsx
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NavigationProvider } from './contexts/NavigationContext';
import Preloader from './components/layout/Preloader';
import Projects from './components/sections/Projects';
import AboutUs from './components/sections/AboutUs';
import ContactUs from './components/sections/ContactUs';
import Footer from './components/layout/Footer';
import KeyboardNav from './components/ui/KeyboardNav';
import Logo from './components/ui/Logo';
import Navigation from './components/ui/Navigation';



const SECTIONS = ['projects', 'about', 'contact'];

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentSection, setCurrentSection] = useState(SECTIONS[0]);

    const handlePreloaderFinish = () => {
        setIsLoading(false);
    };

    return (
        <>
            <Preloader
                onFinish={handlePreloaderFinish}
                brandText="m a r r o n . d e v"
            />

            {!isLoading && (
                <NavigationProvider
                    sections={SECTIONS}
                    currentSection={currentSection}
                    setCurrentSection={setCurrentSection}
                >
                    <KeyboardNav />
                    <Logo />
                    <Navigation />

                    <div className="app-container">
                        <AnimatePresence mode="wait">
                            {currentSection === 'projects' && <Projects key="projects" />}
                            {currentSection === 'about' && <AboutUs key="about" />}
                            {currentSection === 'contact' && <ContactUs key="contact" />}
                        </AnimatePresence>
                    </div>

                    <Footer />
                </NavigationProvider>
            )}
        </>
    );
}