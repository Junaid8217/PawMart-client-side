import { Container, Grid, Card } from '../components/ui';

const Features = () => {
    const features = [
        {
            id: 1,
            icon: '🏥',
            title: '24/7 Emergency Care',
            description: 'Round-the-clock veterinary emergency services for your pets when they need it most.',
            color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
        },
        {
            id: 2,
            icon: '👨‍⚕️',
            title: 'Expert Veterinarians',
            description: 'Certified and experienced veterinarians with specialized training in pet care.',
            color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
        },
        {
            id: 3,
            icon: '🏠',
            title: 'Home Visits',
            description: 'Convenient at-home veterinary services for pets who are more comfortable at home.',
            color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
        },
        {
            id: 4,
            icon: '💊',
            title: 'Pharmacy Services',
            description: 'Complete pet pharmacy with prescription medications and health supplements.',
            color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
        },
        {
            id: 5,
            icon: '✂️',
            title: 'Grooming & Spa',
            description: 'Professional pet grooming services to keep your pets looking and feeling great.',
            color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
        },
        {
            id: 6,
            icon: '🎓',
            title: 'Training Programs',
            description: 'Behavioral training and obedience classes for pets of all ages and breeds.',
            color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
        }
    ];

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Why Choose PawMart?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We provide comprehensive pet care services with the highest standards of quality and compassion
                    </p>
                </div>

                <Grid cols={3} gap="lg">
                    {features.map((feature) => (
                        <Card key={feature.id} className="group hover:shadow-xl transition-all duration-300">
                            <Card.Body>
                                <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card.Body>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </section>
    );
};

export default Features;