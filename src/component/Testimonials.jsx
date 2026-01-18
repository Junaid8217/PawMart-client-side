import { useState } from 'react';
import { Container, Card } from '../components/ui';

const Testimonials = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Dog Owner',
            image: '👩‍🦰',
            rating: 5,
            text: 'PawMart saved my dog\'s life during an emergency. The 24/7 service and professional care exceeded all expectations. Highly recommended!',
            pet: 'Golden Retriever - Max'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Cat Owner',
            image: '👨‍💼',
            rating: 5,
            text: 'The home visit service is incredible. My cat gets anxious at clinics, but the vet was so gentle and professional at our home.',
            pet: 'Persian Cat - Luna'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Pet Parent',
            image: '👩‍🎓',
            rating: 5,
            text: 'From grooming to training, PawMart offers everything under one roof. The staff genuinely cares about pets and their owners.',
            pet: 'Labrador Mix - Buddy'
        },
        {
            id: 4,
            name: 'David Thompson',
            role: 'Bird Owner',
            image: '👨‍🔬',
            rating: 5,
            text: 'Finding a vet who understands exotic pets was challenging until I found PawMart. Their expertise with birds is outstanding.',
            pet: 'African Grey - Charlie'
        }
    ];

    const nextTestimonial = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                ⭐
            </span>
        ));
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        What Pet Parents Say
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Real stories from satisfied customers who trust us with their beloved pets
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <Card className="min-h-[300px] flex items-center">
                        <Card.Body className="text-center p-8">
                            <div className="mb-6">
                                <span className="text-6xl mb-4 block">
                                    {testimonials[activeTestimonial].image}
                                </span>
                                <div className="flex justify-center mb-4">
                                    {renderStars(testimonials[activeTestimonial].rating)}
                                </div>
                            </div>
                            
                            <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                                "{testimonials[activeTestimonial].text}"
                            </blockquote>
                            
                            <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {testimonials[activeTestimonial].name}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {testimonials[activeTestimonial].role}
                                </p>
                                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                                    Pet: {testimonials[activeTestimonial].pet}
                                </p>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                    index === activeTestimonial 
                                        ? 'bg-blue-600 scale-125' 
                                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;