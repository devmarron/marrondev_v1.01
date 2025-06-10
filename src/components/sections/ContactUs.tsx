// src/components/sections/ContactUs.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SOCIAL_LINKS } from '../../utils/constants';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulación de envío
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });

            // Resetear mensaje de éxito después de 5 segundos
            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1500);
    };

    return (
        <motion.section
            className="section contact-section"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="section-title">¿Listo para el gran paso?</h1>

            <div className="contact-container">
                {/* Formulario de contacto */}
                <motion.div
                    className="contact-form"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="form-header">
                        <h2>¡Cotiza tu proyecto!</h2>
                        <p>Completa el formulario y nos pondremos en contacto contigo</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="glass-input"
                            />
                            <label className={formData.name ? 'active' : ''}>Nombre completo</label>
                        </div>

                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="glass-input"
                            />
                            <label className={formData.email ? 'active' : ''}>Correo electrónico</label>
                        </div>

                        <div className="input-group">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="glass-input"
                            />
                            <label className={formData.phone ? 'active' : ''}>Teléfono</label>
                        </div>

                        <div className="input-group">
              <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="glass-input"
                  rows={4}
              />
                            <label className={formData.message ? 'active' : ''}>Cuéntanos sobre tu proyecto o agenda una llamada</label>
                        </div>

                        <motion.button
                            type="submit"
                            className="submit-button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="spinner"></span>
                            ) : (
                                "Enviar consulta"
                            )}
                        </motion.button>

                        {submitSuccess && (
                            <motion.div
                                className="success-message"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                ¡Gracias! Te contactaremos pronto.
                            </motion.div>
                        )}
                    </form>
                </motion.div>

                {/* Separador visual */}
                <div className="contact-divider">
                    <div className="divider-line"></div>
                    <div className="divider-text">O</div>
                    <div className="divider-line"></div>
                </div>

                {/* Redes sociales con WhatsApp destacado */}
                <motion.div
                    className="social-container"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="social-header">
                        <h2>Conéctate con nosotros</h2>
                        <p>Síguenos en nuestras redes sociales</p>
                    </div>

                    <div className="social-links">
                        {SOCIAL_LINKS.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.name === "WhatsApp" ? "https://wa.me/957251279" : social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`social-link ${social.name === "WhatsApp" ? 'whatsapp' : ''}`}
                                aria-label={social.name}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="social-icon">
                                    <img src={social.icon} alt={social.name} />
                                    {social.name === "WhatsApp" && (
                                        <div className="whatsapp-badge"></div>
                                    )}
                                </div>
                                <span>{social.name}</span>
                            </motion.a>
                        ))}
                    </div>

                    <div className="contact-info">
                        <p>Email: hola@marron.dev</p>
                        <p>Teléfono: +957 251 279</p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}