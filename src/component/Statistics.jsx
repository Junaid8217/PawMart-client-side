import { Container } from '../components/ui';
import { useState, useEffect, useRef } from 'react';

const Statistics = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({
        pets: 0,
        vets: 0,
        services: 0,
        years: 0
    });
    
    const sectionRef = useRef(null);

    const stats = [
        { id: 'pets', label: 'Happy Pets Served', target: 15000, suffix: '+', icon: '🐕' },
        { id: 'vets', label: 'Expert Veterinarians', target: 50, suffix: '+', icon: '👨‍⚕️' },
        { id: 'services', label: 'Services Offered', target: 25, suffix: '+', icon: '🏥' },
        { id: 'years', label: 'Years of Experience', target: 12, suffix: '', icon: '⭐' }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            stats.forEach((stat) => {
                let start = 0;
                const increment = stat.target / 100;
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= stat.target) {
                        setCounts(prev => ({ ...prev, [stat.id]: stat.target }));
                        clearInterval(timer);
                    } else {
                        setCounts(prev => ({ ...prev, [stat.id]: Math.floor(start) }));
                    }
                }, 20);
            });
        }
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Trusted by thousands of pet owners across the region
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center group">
                            <div className="mb-4">
                                <span className="text-4xl md:text-5xl block mb-2">{stat.icon}</span>
                                <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {counts[stat.id].toLocaleString()}{stat.suffix}
                                </div>
                                <p className="text-blue-100 font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Statistics;