import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { motion } from 'framer-motion';

const Logo = () => {
    const { sections, setCurrentSection } = useNavigation();

    const firstSection = sections[0];

    return (
        <motion.a
            href="#"
            className="logo"
            onClick={(e) => {
                e.preventDefault();
                setCurrentSection(firstSection);
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <motion.span
                className="logo-icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
                M
            </motion.span>
        </motion.a>
    );
};

export default Logo;