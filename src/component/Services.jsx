import { Container, Grid, Card, Button } from '../components/ui';

const Services = () => {
    const services = [
        {
            id: 1,
            title: 'Veterinary Care',
            description: 'Comprehensive health checkups, vaccinations, and medical treatments for all pets.',
            icon: '🏥',
            features: ['Health Checkups', 'Vaccinations', 'Surgery', 'Dental Care'],
            price: 'From $50',
            popular: false
        },
        {
            id: 2,
            title: 'Emergency Services',
            description: '24/7 emergency care for critical situations and urgent medical needs.',
            icon: '🚨',
            features: ['24/7 Availability', 'Critical Care', 'Emergency Surgery', 'ICU'],
            price: 'From $150',
            popular: true
        },
        {
            id: 3,
            title: 'Pet Grooming',
            description: 'Professional grooming services to keep your pets clean, healthy, and beautiful.',
            icon: '✂️',
            features: ['Bathing & Drying', 'Hair Cutting', 'Nail Trimming', 'Ear Cleaning'],
            price: 'From $30',
            popular: false
        },
        {
            id: 4,
            title: 'Pet Training',
            description: 'Behavioral training and obedience classes for pets of all ages and breeds.',
            icon: '🎓',
            features: ['Basic Obedience', 'Behavioral Training', 'Puppy Classes', 'Advanced Training'],
            price: 'From $80',
            popular: false
        },
        {
            id: 5,
            title: 'Pet Boarding',
            description: 'Safe and comfortable boarding facilities when you need to travel.',
            icon: '🏨',
            features: ['Daily Exercise', 'Feeding Service', 'Medical Care', 'Play Time'],
            price: 'From $40/day',
            popular: false
        },
        {
            id: 6,
            title: 'Home Visits',
            description: 'Convenient veterinary services in the comfort of your own home.',
            icon: '🏠',
            features: ['In-Home Checkups', 'Vaccinations', 'Senior Pet Care', 'Comfort Care'],
            price: 'From $100',
            popular: false
        }
    ];

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Services
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Comprehensive pet care services designed to keep your furry friends healthy and happy
                    </p>
                </div>

                <Grid cols={3} gap="lg">
                    {services.map((service) => (
                        <Card key={service.id} className={`relative group ${service.popular ? 'ring-2 ring-blue-500' : ''}`}>
                            {service.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            
                            <Card.Body>
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-3xl">{service.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Features:</h4>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <span className="text-green-500 mr-2">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {service.price}
                                        </span>
                                    </div>
                                    <Button 
                                        variant={service.popular ? 'primary' : 'outline'} 
                                        className="w-full"
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Grid>

                <div className="text-center mt-12">
                    <Button variant="primary" size="lg">
                        View All Services
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default Services;