import { useState } from 'react';
import { Container, Card } from '../components/ui';

const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(0);

    const faqs = [
        {
            id: 1,
            question: 'What are your operating hours?',
            answer: 'We are open 24/7 for emergency services. Regular appointments are available Monday-Friday 8AM-8PM, and weekends 9AM-6PM. Our emergency hotline is always available for urgent situations.'
        },
        {
            id: 2,
            question: 'Do you offer home visit services?',
            answer: 'Yes! We provide convenient home visit services for routine checkups, vaccinations, and senior pet care. This is especially beneficial for pets who get anxious during travel or have mobility issues.'
        },
        {
            id: 3,
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, debit cards, cash, and pet insurance. We also offer flexible payment plans for larger procedures. Contact us to discuss payment options that work for you.'
        },
        {
            id: 4,
            question: 'How do I schedule an emergency appointment?',
            answer: 'For emergencies, call our 24/7 hotline immediately. We prioritize emergency cases and will see your pet as soon as possible. For non-emergency urgent care, you can also book online or call during business hours.'
        },
        {
            id: 5,
            question: 'Do you treat exotic pets?',
            answer: 'Yes, we have veterinarians specialized in exotic pet care including birds, reptiles, rabbits, and small mammals. Please mention your pet type when booking to ensure the right specialist is available.'
        },
        {
            id: 6,
            question: 'What should I bring to my first appointment?',
            answer: 'Please bring any previous medical records, current medications, vaccination history, and a list of questions. For new pets, bring any adoption papers or breeder information you may have.'
        },
        {
            id: 7,
            question: 'Do you offer grooming services?',
            answer: 'Yes, we provide full-service grooming including bathing, hair cutting, nail trimming, ear cleaning, and dental hygiene. Our certified groomers work with pets of all sizes and temperaments.'
        },
        {
            id: 8,
            question: 'Can I get a prescription refill online?',
            answer: 'Yes, existing clients can request prescription refills through our online portal or by calling our pharmacy. We require current examination records for prescription medications and may require a recent checkup for certain medications.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? -1 : index);
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Find answers to common questions about our services and pet care
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <Card key={faq.id} className="overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                            >
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                                    {faq.question}
                                </h3>
                                <svg
                                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                                        openFAQ === index ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-300 ${
                                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Still have questions? We're here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:+1234567890" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            <span className="mr-2">📞</span>
                            Call Us: (123) 456-7890
                        </a>
                        <a href="mailto:info@pawmart.com" className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200">
                            <span className="mr-2">✉️</span>
                            Email Us
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FAQ;