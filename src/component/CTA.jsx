import { Container, Button } from '../components/ui';

const CTA = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 text-6xl">🐕</div>
                <div className="absolute top-20 right-20 text-4xl">🐱</div>
                <div className="absolute bottom-20 left-20 text-5xl">🐰</div>
                <div className="absolute bottom-10 right-10 text-3xl">🐦</div>
                <div className="absolute top-1/2 left-1/4 text-4xl">🐹</div>
                <div className="absolute top-1/3 right-1/3 text-5xl">🐢</div>
            </div>

            <Container>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Ready to Give Your Pet the Best Care?
                    </h2>
                    <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                        Join thousands of satisfied pet parents who trust PawMart for comprehensive, compassionate pet care. 
                        Book your appointment today and experience the difference.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Button 
                            size="lg" 
                            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                        >
                            Book Appointment Now
                        </Button>
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                        >
                            Call (123) 456-7890
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold mb-1">24/7</div>
                            <div className="text-sm text-blue-100">Emergency Care</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold mb-1">15K+</div>
                            <div className="text-sm text-blue-100">Happy Pets</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold mb-1">50+</div>
                            <div className="text-sm text-blue-100">Expert Vets</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold mb-1">12</div>
                            <div className="text-sm text-blue-100">Years Experience</div>
                        </div>
                    </div>

                    {/* Urgency Element */}
                    <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                        <p className="text-sm text-blue-100">
                            <span className="font-semibold">Limited Time:</span> New clients get 20% off their first visit. 
                            <span className="font-semibold"> Book before January 31st!</span>
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CTA;