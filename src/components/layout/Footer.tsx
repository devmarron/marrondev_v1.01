// src/components/layout/Footer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../contexts/NavigationContext';

const Footer = () => {
    const { currentSection, sections, setCurrentSection } = useNavigation();

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="navigation-dots">
                {sections.map((section) => (
                    <motion.button
                        key={section}
                        className={`dot ${currentSection === section ? 'active' : ''}`}
                        onClick={() => setCurrentSection(section)}
                        aria-label={`Ir a ${section}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>

            <div className="footer-content">
                <div className="contact-info">
                    <span>Contacto:</span>
                    <motion.a
                        href="mailto:hola@marron.dev"
                        className="email-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        hola@marron.dev
                    </motion.a>
                </div>

                <div className="copyright">
                    © {new Date().getFullYear()}
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;