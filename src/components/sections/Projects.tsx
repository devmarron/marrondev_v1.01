// src/components/sections/Projects.tsx
import { useState } from 'react';
import { useNavControls } from '../../hooks/useNavigation';
import ImageGallery from '../ui/ImageGallery';
import { GALLERY_IMAGES } from '../../utils/constants';

interface Project {
    imageUrl: string;
    projectName: string;
    client: string;
    year: number;
}

export default function Projects() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { goToNextSection } = useNavControls();

    const projects = GALLERY_IMAGES as Project[];

    const handleNextImage = () => {
        if (currentImageIndex === projects.length - 1) {
            goToNextSection();
        } else {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    const currentProject = projects[currentImageIndex];

    return (
        <section className="section projects-section fade-in">
            <h1 className="section-title"></h1>
            <div className="gallery-container">
                <div className="image-gallery-container">
                    {/* Esquinas decorativas mochicas */}
                    <div className="corner-decoration top-left"></div>
                    <div className="corner-decoration top-right"></div>
                    <div className="corner-decoration bottom-left"></div>
                    <div className="corner-decoration bottom-right"></div>

                    <ImageGallery
                        imageUrl={currentProject.imageUrl}
                        onClick={handleNextImage}
                    />
                </div>

                {/* Información del proyecto con estilo glassmorphism */}
                <div className="project-info-glass">
                    <div className="project-meta">
                        <h2 className="project-name">{currentProject.projectName}</h2>
                        <div className="project-details">
                            <div className="project-detail">
                                <span className="detail-label">Cliente:</span>
                                <span className="detail-value">{currentProject.client}</span>
                            </div>
                            <div className="project-detail">
                                <span className="detail-label">Año:</span>
                                <span className="detail-value">{currentProject.year}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contador de imágenes integrado con el estilo existente */}
                <div className="image-counter modern">
                    <span>{currentImageIndex + 1}</span>
                    <span className="divider">/</span>
                    <span>{projects.length}</span>
                </div>
            </div>
        </section>
    );
}