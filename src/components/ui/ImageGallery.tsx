// src/components/ui/ImageGallery.tsx
import { motion } from 'framer-motion';

interface ImageGalleryProps {
    imageUrl: string;
    onClick: () => void;
}

export default function ImageGallery({ imageUrl, onClick }: ImageGalleryProps) {
    return (
        <motion.div
            className="gallery-item image-gallery-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Esquinas decorativas mochicas */}
            <div className="corner-decoration top-left"></div>
            <div className="corner-decoration top-right"></div>
            <div className="corner-decoration bottom-left"></div>
            <div className="corner-decoration bottom-right"></div>

            <img
                src={imageUrl}
                alt="Project"
                className="gallery-image"
                loading="lazy"
            />
        </motion.div>
    );
}