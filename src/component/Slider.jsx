import { useState, useEffect } from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpeg';
import { Button } from '../components/ui';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    
    const slides = [
        {
            id: 1,
            image: image3,
            title: "Professional Pet Care Services",
            subtitle: "Expert veterinary care for your beloved companions with 24/7 support",
            cta: "Book Appointment",
            ctaLink: "/services"
        },
        {
            id: 2,
            image: image2,
            title: "Premium Pet Products",
            subtitle: "Quality nutrition and accessories for happy, healthy pets",
            cta: "Shop Now",
            ctaLink: "/services"
        },
        {
            id: 3,
            image: image1,
            title: "Emergency Pet Care",
            subtitle: "Round-the-clock emergency support when your pet needs it most",
            cta: "Learn More",
            ctaLink: "/services/emergency"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Auto-advance slides
    useEffect(() => {
        if (isAutoPlay && !isPaused) {
            const timer = setInterval(nextSlide, 5000);
            return () => clearInterval(timer);
        }
    }, [isAutoPlay, isPaused]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    const scrollToNextSection = () => {
        const nextSection = document.querySelector('#next-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section 
            className="relative h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Slides */}
            <div className="relative h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            index === currentSlide 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-105'
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white px-4 max-w-4xl">
                                <div className={`transform transition-all duration-1000 delay-300 ${
                                    index === currentSlide 
                                        ? 'translate-y-0 opacity-100' 
                                        : 'translate-y-8 opacity-0'
                                }`}>
                                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <Button 
                                            variant="primary" 
                                            size="lg"
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                                        >
                                            {slide.cta}
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="lg"
                                            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                                        >
                                            Contact Us
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 group"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 group"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? 'bg-white scale-125 shadow-lg' 
                                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Auto-play Control */}
            <div className="absolute bottom-20 md:bottom-24 right-4 md:right-8 flex items-center space-x-2">
                <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    aria-label={isAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
                >
                    {isAutoPlay ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    )}
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                <div 
                    className="h-full bg-white transition-all duration-300 ease-linear"
                    style={{ 
                        width: `${((currentSlide + 1) / slides.length) * 100}%` 
                    }}
                />
            </div>

            {/* Scroll Down Hint */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <button
                    onClick={scrollToNextSection}
                    className="group flex flex-col items-center space-y-2 text-white hover:text-blue-200 transition-colors duration-200"
                    aria-label="Scroll to next section"
                >
                    <span className="text-sm font-medium opacity-80 group-hover:opacity-100">Explore More</span>
                    <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center group-hover:border-blue-200">
                        <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce group-hover:bg-blue-200"></div>
                    </div>
                    <svg className="w-5 h-5 animate-bounce opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            </div>

            {/* Slide Counter */}
            <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                {currentSlide + 1} / {slides.length}
            </div>
        </section>
    );
};

export default Slider;