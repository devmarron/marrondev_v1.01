import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { motion } from 'framer-motion';

const Navigation = () => {
    const { sections, currentSection, setCurrentSection } = useNavigation();

    const sectionLabels: Record<string, string> = {
        projects: 'Projects',
        about: 'About Us',
        contact: 'Contact'
    };

    return (
        <motion.nav
            className="nav"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            {sections.map((sectionId) => (
                <motion.a
                    key={sectionId}
                    href="#"
                    className={`nav-item ${currentSection === sectionId ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentSection(sectionId);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    {sectionLabels[sectionId] || sectionId}
                </motion.a>
            ))}
        </motion.nav>
    );
};

export default Navigation;