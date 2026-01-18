import { useState } from 'react';
import { Container, Card, Input, Button } from '../components/ui';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true);
            setLoading(false);
            setEmail('');
        }, 1000);
    };

    const benefits = [
        { icon: '📧', text: 'Weekly pet care tips and advice' },
        { icon: '🎉', text: 'Exclusive offers and discounts' },
        { icon: '📅', text: 'Appointment reminders' },
        { icon: '🆕', text: 'New service announcements' }
    ];

    if (isSubscribed) {
        return (
            <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
                <Container>
                    <Card className="max-w-2xl mx-auto text-center bg-white/10 backdrop-blur-sm border-white/20">
                        <Card.Body className="p-8">
                            <div className="text-6xl mb-4">✅</div>
                            <h2 className="text-2xl font-bold mb-4">Successfully Subscribed!</h2>
                            <p className="text-green-100 mb-6">
                                Thank you for joining our newsletter! You'll receive your first email with pet care tips soon.
                            </p>
                            <Button 
                                variant="outline" 
                                className="border-white text-white hover:bg-white hover:text-green-600"
                                onClick={() => setIsSubscribed(false)}
                            >
                                Subscribe Another Email
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Stay Connected with PawMart
                        </h2>
                        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                            Join thousands of pet parents who receive our weekly newsletter with expert tips, exclusive offers, and important updates
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Benefits */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-6">What you'll get:</h3>
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <span className="text-2xl">{benefit.icon}</span>
                                    <span className="text-blue-100">{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Subscription Form */}
                        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                            <Card.Body className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <Button
                                        type="submit"
                                        loading={loading}
                                        disabled={loading}
                                        className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3"
                                    >
                                        {loading ? 'Subscribing...' : 'Subscribe Now'}
                                    </Button>
                                </form>
                                
                                <p className="text-xs text-blue-100 mt-4 text-center">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Social Proof */}
                    <div className="text-center mt-12">
                        <div className="flex items-center justify-center space-x-8 text-blue-100">
                            <div className="text-center">
                                <div className="text-2xl font-bold">12,000+</div>
                                <div className="text-sm">Subscribers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">4.9/5</div>
                                <div className="text-sm">Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">Weekly</div>
                                <div className="text-sm">Updates</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Newsletter;