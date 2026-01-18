import { Container, Grid, Card } from '../components/ui';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: 'Dogs',
            icon: '🐕',
            description: 'Comprehensive care for all dog breeds',
            services: ['Vaccinations', 'Grooming', 'Training', 'Surgery'],
            count: '8,500+ patients',
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 2,
            name: 'Cats',
            icon: '🐱',
            description: 'Specialized feline health services',
            services: ['Health Checkups', 'Dental Care', 'Spaying', 'Boarding'],
            count: '6,200+ patients',
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 3,
            name: 'Birds',
            icon: '🐦',
            description: 'Expert care for avian companions',
            services: ['Wing Clipping', 'Health Exams', 'Nutrition', 'Behavior'],
            count: '1,800+ patients',
            color: 'from-green-500 to-green-600'
        },
        {
            id: 4,
            name: 'Small Pets',
            icon: '🐰',
            description: 'Care for rabbits, hamsters, and more',
            services: ['Wellness Exams', 'Dental Care', 'Surgery', 'Nutrition'],
            count: '2,100+ patients',
            color: 'from-orange-500 to-orange-600'
        },
        {
            id: 5,
            name: 'Reptiles',
            icon: '🐢',
            description: 'Specialized reptile veterinary care',
            services: ['Health Checkups', 'Habitat Setup', 'Nutrition', 'Surgery'],
            count: '900+ patients',
            color: 'from-teal-500 to-teal-600'
        },
        {
            id: 6,
            name: 'Exotic Pets',
            icon: '🦔',
            description: 'Care for unique and exotic animals',
            services: ['Specialized Care', 'Emergency', 'Nutrition', 'Behavior'],
            count: '600+ patients',
            color: 'from-pink-500 to-pink-600'
        }
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        We Care for All Types of Pets
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        From common household pets to exotic animals, our specialized veterinarians provide expert care for every species
                    </p>
                </div>

                <Grid cols={3} gap="lg">
                    {categories.map((category) => (
                        <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                            
                            <Card.Body className="p-6">
                                <div className="text-center mb-6">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-4xl">{category.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {category.description}
                                    </p>
                                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${category.color}`}>
                                        {category.count}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Our Services:</h4>
                                    {category.services.map((service, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <span className="text-green-500 mr-2">✓</span>
                                            {service}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <button className={`w-full py-2 px-4 rounded-lg font-medium text-white bg-gradient-to-r ${category.color} hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}>
                                        Learn More
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Grid>

                <div className="text-center mt-12">
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-6 max-w-2xl mx-auto shadow-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Don't see your pet type listed?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            We have experience with many other animals too. Contact us to discuss your pet's specific needs.
                        </p>
                        <button className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            <span className="mr-2">📞</span>
                            Contact Us
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Categories;