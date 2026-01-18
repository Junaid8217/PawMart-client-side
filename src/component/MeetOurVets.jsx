import vet1 from '../assets/vet1.jpg';
import vet2 from '../assets/vet2.jpg';
import vet3 from '../assets/vet3.jpg';
import { Card, Button, Container, Grid } from '../components/ui';

const MeetOurVets = () => {
    const vets = [
        {
            id: 1,
            name: 'Dr. Nasiruddin Shah',
            specialty: 'Cold Weather Nutrition',
            experience: '8 years',
            image: vet1
        },
        {
            id: 2,
            name: 'Dr. Shi Jing Ping',
            specialty: 'Winter Dermatology and Paw Care',
            experience: '6 years',
            image: vet2
        },
        {
            id: 3,
            name: 'Dr. Monica',
            specialty: 'Pet Allergies and Dry Skin',
            experience: '5 years',
            image: vet3
        }
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Meet Our Expert Vets
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Our experienced veterinarians are here to provide the best care for your beloved pets
                    </p>
                </div>
                
                <Grid cols={3} gap="lg">
                    {vets.map((vet) => (
                        <Card key={vet.id} className="group">
                            <div className="relative overflow-hidden">
                                <img 
                                    src={vet.image}
                                    alt={vet.name}
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            
                            <Card.Body>
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                                    {vet.name}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-1">
                                    {vet.specialty}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    {vet.experience} Experience
                                </p>
                                
                                <Button className="w-full" variant="primary">
                                    Book Appointment
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </section>
    );
};

export default MeetOurVets;