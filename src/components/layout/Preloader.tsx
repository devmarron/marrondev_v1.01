import React, { useEffect, useState } from 'react';

interface PreloaderProps {
    onFinish: () => void;
    brandText?: string;
}

const Preloader: React.FC<PreloaderProps> = ({
                                                 onFinish,
                                                 brandText = 'm a r r o n . d e v'
                                             }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [resourcesLoaded, setResourcesLoaded] = useState(false);
    const [lettersAnimated, setLettersAnimated] = useState(false);
    const [drawProgress, setDrawProgress] = useState(0);

    useEffect(() => {
        // Simular progreso de carga con actualización del dibujo
        const progressInterval = setInterval(() => {
            setDrawProgress(prev => {
                const newProgress = prev + 1;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    setResourcesLoaded(true);
                    return 100;
                }
                return newProgress;
            });
        }, 30); // 3 segundos total

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        // Iniciar animación de letras después de 500ms
        const letterTimer = setTimeout(() => {
            setLettersAnimated(true);
        }, 500);

        return () => clearTimeout(letterTimer);
    }, []);

    useEffect(() => {
        // Cuando todo esté listo, cerrar el preloader y pasar a proyectos
        if (resourcesLoaded && lettersAnimated) {
            const finishTimer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => onFinish(), 500);
            }, 1000);

            return () => clearTimeout(finishTimer);
        }
    }, [resourcesLoaded, lettersAnimated, onFinish]);

    // Calcular el dasharray y dashoffset para la animación SVG
    const pathLength = 2000;
    const strokeDasharray = pathLength;
    const strokeDashoffset = pathLength - (pathLength * drawProgress) / 100;

    const preloaderStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out'
    };

    const backgroundStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        background: `
            radial-gradient(circle at 20% 30%, #8B4513 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, #A0522D 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #654321 0%, transparent 30%)
        `
    };

    const svgContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        opacity: 0.3,
        animation: 'fadeInScale 1s ease-out forwards'
    };

    const spinnerStyle: React.CSSProperties = {
        width: '80px',
        height: '80px',
        border: '3px solid transparent',
        borderTop: '3px solid #A0522D',
        borderRight: '3px solid #8B4513',
        borderRadius: '50%',
        position: 'relative',
        zIndex: 10,
        marginBottom: '40px',
        animation: 'spin 2s linear infinite'
    };

    const innerSpinnerStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle, #A0522D 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 2s ease-in-out infinite'
    };

    const brandStyle: React.CSSProperties = {
        fontSize: '24px',
        fontWeight: '300',
        letterSpacing: '4px',
        marginBottom: '30px',
        position: 'relative',
        zIndex: 10
    };

    const progressBarStyle: React.CSSProperties = {
        width: '300px',
        height: '4px',
        backgroundColor: 'rgba(139, 69, 19, 0.2)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10
    };

    const progressFillStyle: React.CSSProperties = {
        height: '100%',
        background: 'linear-gradient(90deg, #8B4513, #A0522D, #D2691E)',
        borderRadius: '2px',
        boxShadow: '0 0 10px rgba(139, 69, 19, 0.5)',
        width: `${drawProgress}%`,
        transition: 'width 0.3s ease-out'
    };

    const percentageStyle: React.CSSProperties = {
        marginTop: '15px',
        fontSize: '14px',
        color: '#A0522D',
        fontWeight: '300',
        letterSpacing: '1px',
        position: 'relative',
        zIndex: 10,
        opacity: 1,
        animation: 'fadeIn 0.5s ease-in 1s forwards'
    };

    if (!isVisible) return null;

    return (
        <>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
                    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
                }
                
                @keyframes fadeInScale {
                    from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    to { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes letterDrop {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes nazcaBirdFlight {
                    0% { 
                        transform: translateX(-200px) translateY(-50vh) scale(0.8) rotate(-10deg);
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    15% {
                        transform: translateX(15vw) translateY(20vh) scale(1) rotate(5deg);
                    }
                    30% {
                        transform: translateX(30vw) translateY(-10vh) scale(1.1) rotate(-2deg);
                    }
                    45% {
                        transform: translateX(45vw) translateY(40vh) scale(1.2) rotate(8deg);
                    }
                    60% {
                        transform: translateX(60vw) translateY(10vh) scale(1.1) rotate(-5deg);
                    }
                    75% {
                        transform: translateX(75vw) translateY(-20vh) scale(1) rotate(3deg);
                    }
                    90% {
                        transform: translateX(90vw) translateY(30vh) scale(0.9) rotate(10deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(calc(100vw + 200px)) translateY(-40vh) scale(0.8) rotate(15deg);
                        opacity: 0;
                    }
                }

            
                
                @keyframes nazcaWings {
                    0%, 100% { 
                        transform: scaleY(1) rotate(0deg); 
                    }
                    25% { 
                        transform: scaleY(0.6) rotate(-3deg); 
                    }
                    50% { 
                        transform: scaleY(0.8) rotate(2deg); 
                    }
                    75% { 
                        transform: scaleY(0.7) rotate(-1deg); 
                    }
                }
                
                .letter {
                    display: inline-block;
                    background: linear-gradient(45deg, #8B4513, #A0522D, #D2691E, #CD853F);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: letterDrop 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .nazca-bird {
                    position: absolute;
                    top: 30%;
                    left: 0;
                    animation: nazcaBirdFlight 12s ease-in-out infinite;
                    z-index: 5;
                    filter: drop-shadow(0 0 8px rgba(210, 105, 30, 0.4));
                }
                
                .bird-wings {
                    animation: nazcaWings 0.4s ease-in-out infinite;
                    transform-origin: center;
                }
            `}</style>

            <div style={preloaderStyle} aria-label="Cargando contenido" role="status">
                {/* Fondo con patrón mochica animado */}
                <div style={backgroundStyle} />

                {/* Ave de Nazca volando - Diseño auténtico inspirado en las líneas de Nazca */}
                <div className="nazca-bird">
                    <svg
                        width="180"
                        height="120"
                        viewBox="0 0 300 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Cuerpo principal del ave - Estilo líneas de Nazca */}
                        <path
                            d="M80 100 Q140 85 180 100 Q185 110 180 120 Q140 115 80 100 Z"
                            stroke="#D2691E"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Cabeza y cuello alargado (estilo colibrí de Nazca) */}
                        <path
                            d="M80 100 Q65 95 50 100 Q45 105 50 110 Q65 105 80 100"
                            stroke="#A0522D"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Pico largo y recto característico de Nazca */}
                        <path
                            d="M50 105 L15 100 Q10 105 15 110 L50 105"
                            stroke="#8B4513"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Líneas internas del pico */}
                        <path
                            d="M45 103 L20 101 M45 107 L20 109"
                            stroke="#654321"
                            strokeWidth="1"
                            strokeLinecap="round"
                        />

                        {/* Alas extendidas - Diseño geométrico de Nazca */}
                        <g className="bird-wings">
                            {/* Ala superior principal */}
                            <path
                                d="M110 85 Q90 45 60 25 Q45 20 35 35 Q50 55 85 75 Q100 80 110 85"
                                stroke="#CD853F"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Ala inferior principal */}
                            <path
                                d="M110 115 Q90 155 60 175 Q45 180 35 165 Q50 145 85 125 Q100 120 110 115"
                                stroke="#CD853F"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Líneas internas de las alas - Patrón geométrico */}
                            <path
                                d="M95 70 L70 50 M90 65 L65 45 M85 75 L75 65"
                                stroke="#A0522D"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            <path
                                d="M95 130 L70 150 M90 135 L65 155 M85 125 L75 135"
                                stroke="#A0522D"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            {/* Plumas secundarias */}
                            <path
                                d="M75 55 Q65 40 55 35 M75 60 Q65 50 55 45"
                                stroke="#8B4513"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            <path
                                d="M75 145 Q65 160 55 165 M75 140 Q65 150 55 155"
                                stroke="#8B4513"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </g>

                        {/* Cola del ave - Diseño estilizado de Nazca */}
                        <path
                            d="M180 110 Q220 105 260 95 Q275 100 270 115 Q265 120 250 118 Q210 115 180 110"
                            stroke="#8B4513"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Líneas de la cola */}
                        <path
                            d="M200 110 L230 105 M205 112 L235 107 M210 108 L240 103"
                            stroke="#654321"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        {/* Patas estilizadas - Líneas rectas geométricas */}
                        <path
                            d="M120 120 L110 150 M110 150 L105 155 M110 150 L115 155"
                            stroke="#654321"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M150 120 L140 150 M140 150 L135 155 M140 150 L145 155"
                            stroke="#654321"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />

                        {/* Ojo del ave - Círculo simple */}
                        <circle
                            cx="60"
                            cy="95"
                            r="4"
                            fill="#8B4513"
                        />

                        {/* Líneas decorativas en el cuerpo - Estilo Nazca */}
                        <path
                            d="M130 105 L160 105 M135 95 L165 95 M135 115 L165 115"
                            stroke="#D2691E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.8"
                        />

                        {/* Patrones geométricos adicionales */}
                        <path
                            d="M140 100 L145 100 L145 105 L150 105 L150 110 L145 110 L145 115 L140 115 Z"
                            stroke="#CD853F"
                            strokeWidth="1"
                            fill="none"
                        />

                        {/* Líneas de energía - Representando el vuelo */}
                        <path
                            d="M200 90 Q210 85 220 90 M205 95 Q215 90 225 95 M210 100 Q220 95 230 100"
                            stroke="#D2691E"
                            strokeWidth="1"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                    </svg>
                </div>

                {/* SVG Arte Mochica - Diseño de vasija/huaco */}
                <div style={svgContainerStyle}>
                    <svg
                        width="400"
                        height="400"
                        viewBox="0 0 400 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Base de la vasija */}
                        <path
                            d="M100 300 Q100 350 200 350 Q300 350 300 300 L280 200 Q200 180 200 180 Q200 180 120 200 Z"
                            stroke="#A0522D"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                        />

                        {/* Cuerpo principal */}
                        <path
                            d="M120 200 Q120 150 200 120 Q280 150 280 200"
                            stroke="#8B4513"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={strokeDasharray * 0.3}
                            strokeDashoffset={strokeDasharray * 0.3 - (strokeDasharray * 0.3 * drawProgress) / 100}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                        />

                        {/* Cuello */}
                        <path
                            d="M180 120 Q180 80 200 80 Q220 80 220 120"
                            stroke="#654321"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={strokeDasharray * 0.2}
                            strokeDashoffset={strokeDasharray * 0.2 - (strokeDasharray * 0.2 * drawProgress) / 100}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                        />

                        {/* Decoraciones mochicas - Escalones */}
                        <path
                            d="M140 180 L160 180 L160 190 L180 190 L180 200 L220 200 L220 190 L240 190 L240 180 L260 180"
                            stroke="#D2691E"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={strokeDasharray * 0.4}
                            strokeDashoffset={strokeDasharray * 0.4 - (strokeDasharray * 0.4 * drawProgress) / 100}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                        />

                        {/* Patrón geométrico circular central */}
                        <circle
                            cx="200"
                            cy="160"
                            r="15"
                            stroke="#CD853F"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={strokeDasharray * 0.1}
                            strokeDashoffset={strokeDasharray * 0.1 - (strokeDasharray * 0.1 * drawProgress) / 100}
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                        />

                        {/* Símbolos de olas (mar mochica) */}
                        <path
                            d="M140 220 Q150 215 160 220 Q170 225 180 220 Q190 215 200 220 Q210 225 220 220 Q230 215 240 220 Q250 225 260 220"
                            stroke="#A0522D"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={strokeDasharray * 0.25}
                            strokeDashoffset={strokeDasharray * 0.25 - (strokeDasharray * 0.25 * drawProgress) / 100}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                        />

                        {/* Patrones en zigzag (montañas andinas) */}
                        <path
                            d="M130 280 L140 270 L150 280 L160 270 L170 280 L180 270 L190 280 L200 270 L210 280 L220 270 L230 280 L240 270 L250 280 L260 270 L270 280"
                            stroke="#A0522D"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={strokeDasharray * 0.3}
                            strokeDashoffset={strokeDasharray * 0.3 - (strokeDasharray * 0.3 * drawProgress) / 100}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                        />

                        {/* Efectos de partículas que aparecen gradualmente */}
                        {drawProgress > 30 && (
                            <>
                                <circle cx="160" cy="140" r="2" fill="#A0522D" style={{ animation: 'fadeIn 0.5s ease-in' }} />
                                <circle cx="240" cy="140" r="2" fill="#D2691E" style={{ animation: 'fadeIn 0.5s ease-in 0.2s both' }} />
                                <circle cx="200" cy="220" r="3" fill="#8B4513" style={{ animation: 'fadeIn 0.5s ease-in 0.4s both' }} />
                            </>
                        )}

                        {drawProgress > 60 && (
                            <>
                                <circle cx="130" cy="180" r="1.5" fill="#CD853F" style={{ animation: 'fadeIn 0.5s ease-in' }} />
                                <circle cx="270" cy="180" r="1.5" fill="#CD853F" style={{ animation: 'fadeIn 0.5s ease-in 0.2s both' }} />
                                <circle cx="200" cy="290" r="2" fill="#A0522D" style={{ animation: 'fadeIn 0.5s ease-in 0.4s both' }} />
                            </>
                        )}
                    </svg>
                </div>

                {/* Spinner central con efecto dorado */}
                <div style={spinnerStyle}>
                    <div style={innerSpinnerStyle} />
                </div>

                {/* Texto del brand con efecto dorado */}
                <div style={brandStyle}>
                    {brandText.split('').map((char, index) => (
                        <span
                            key={index}
                            className="letter"
                            style={{
                                animationDelay: lettersAnimated ? `${0.05 * index}s` : '999s'
                            }}
                            aria-hidden="true"
                        >
                            {char}
                        </span>
                    ))}
                </div>

                {/* Barra de progreso con estilo mochica */}
                <div style={progressBarStyle}>
                    <div style={progressFillStyle} />
                </div>

                {/* Indicador de porcentaje */}
                <div style={percentageStyle}>
                    {Math.round(drawProgress)}%
                </div>
            </div>
        </>
    );
};

export default Preloader;