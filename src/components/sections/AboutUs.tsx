// src/components/sections/AboutUs.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavControls } from '../../hooks/useNavigation';

interface TeamMember {
    name: string;
    role: string;
    description: string;
    imageUrl: string;
    accentColor: string;
}

export default function AboutUs() {
    const { goToNextSection } = useNavControls();
    const [activeMember, setActiveMember] = useState<number | null>(null);

    const teamMembers: TeamMember[] = [
        {
            name: "Alex Johnson",
            role: "Diseñador Principal",
            description: "Especialista en UX/UI con enfoque en experiencias inmersivas y microinteracciones",
            imageUrl: "/team/alex.jpg",
            accentColor: "#E6A57A"
        },
        {
            name: "Taylor Smith",
            role: "Desarrollador Full Stack",
            description: "Apasionado por React y arquitecturas escalables con más de 8 años de experiencia",
            imageUrl: "/team/taylor.jpg",
            accentColor: "#6AC4C8"
        },
        {
            name: "Jordan Lee",
            role: "Estratega Creativo",
            description: "Combina storytelling y tecnología para crear narrativas digitales impactantes",
            imageUrl: "/team/jordan.jpg",
            accentColor: "#C8A2C8"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const circleVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },
        hover: { scale: 1.05 },
        active: { scale: 1.2, zIndex: 10 }
    };

    const infoVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.3 }
        }
    };

    return (
        <motion.section
            className="section about-section"
            initial="hidden"
            animate="visible"
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="section-title"></h1>

            <motion.div
                className="team-circles"
                variants={containerVariants}
            >
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        className="circle-container"
                        variants={containerVariants}
                        onClick={() => setActiveMember(activeMember === index ? null : index)}
                    >
                        <motion.div
                            className="member-circle"
                            variants={circleVariants}
                            animate={activeMember === index ? "active" : "visible"}
                            whileHover={activeMember !== index ? "hover" : undefined}
                            style={{
                                borderColor: member.accentColor,
                                boxShadow: activeMember === index
                                    ? `0 0 30px ${member.accentColor}80`
                                    : `0 0 15px ${member.accentColor}40`
                            }}
                        >
                            <div className="circle-inner">
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="circle-image"
                                />
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {(activeMember === index || activeMember === null) && (
                                <motion.div
                                    className="member-info"
                                    variants={infoVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                >
                                    <h3 className="member-name">{member.name}</h3>
                                    <p className="member-role">{member.role}</p>
                                    {activeMember === index && (
                                        <p className="member-description">{member.description}</p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>

            <motion.button
                className="next-section-button"
                onClick={goToNextSection}
                aria-label="Ir a la sección de contacto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                ↓
            </motion.button>
        </motion.section>
    );
}