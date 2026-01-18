import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ServiceDetails = () => {
    const [service, setService] = useState(null);
    const [relatedServices, setRelatedServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedTab, setSelectedTab] = useState('overview');
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServiceDetails();
        fetchRelatedServices();
    }, [id]);

    const fetchServiceDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/services/${id}`);
            const serviceData = response.data;
            
            // Enhance service data with additional details
            const enhancedService = {
                ...serviceData,
                images: [
                    serviceData.image,
                    `https://images.unsplash.com/photo-1559190394-90d5bbe6f3c6?w=800&sig=${id}1`,
                    `https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&sig=${id}2`,
                    `https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&sig=${id}3`
                ],
                longDescription: serviceData.description || "This is a comprehensive service designed to meet your pet's specific needs. Our experienced professionals provide high-quality care with attention to detail and personalized service.",
                rating: 4.5 + Math.random() * 0.5, // Mock rating between 4.5-5.0
                reviewCount: Math.floor(Math.random() * 200) + 50, // Mock review count 50-250
                specifications: {
                    duration: getDurationByCategory(serviceData.category),
                    includes: getIncludesByCategory(serviceData.category),
                    suitableFor: ["Dogs", "Cats", "Small mammals"],
                    ageRange: "All ages",
                    frequency: getFrequencyByCategory(serviceData.category)
                },
                rules: [
                    "Please arrive 15 minutes early for your appointment",
                    "Bring any previous medical records if available",
                    "Keep your pet on a leash or in a carrier",
                    "Inform us of any allergies or special conditions",
                    "Payment is due at the time of service",
                    "Cancellations must be made 24 hours in advance"
                ],
                reviews: generateMockReviews()
            };
            
            setService(enhancedService);
        } catch (error) {
            console.error('Error fetching service details:', error);
            toast.error('Failed to load service details');
            navigate('/services');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedServices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/services');
            const allServices = response.data;
            // Get 4 random services excluding current one
            const filtered = allServices.filter(s => s._id !== id);
            const shuffled = filtered.sort(() => 0.5 - Math.random());
            setRelatedServices(shuffled.slice(0, 4));
        } catch (error) {
            console.error('Error fetching related services:', error);
        }
    };

    const getDurationByCategory = (category) => {
        const durations = {
            'pets': '30-45 minutes',
            'food': '15-20 minutes',
            'accessories': '10-15 minutes',
            'care-products': '45-60 minutes',
            'grooming': '60-90 minutes',
            'veterinary': '45-60 minutes'
        };
        return durations[category] || '30-45 minutes';
    };

    const getIncludesByCategory = (category) => {
        const includes = {
            'pets': [
                'Health certificate verification',
                'Basic health assessment',
                'Vaccination status check',
                'Care instructions',
                'Follow-up support'
            ],
            'food': [
                'Nutritional consultation',
                'Feeding guidelines',
                'Portion recommendations',
                'Dietary advice',
                'Storage instructions'
            ],
            'accessories': [
                'Product demonstration',
                'Fitting assistance',
                'Usage instructions',
                'Maintenance tips',
                'Warranty information'
            ],
            'care-products': [
                'Product consultation',
                'Application demonstration',
                'Safety guidelines',
                'Usage schedule',
                'Follow-up recommendations'
            ],
            'grooming': [
                'Complete wash and dry',
                'Nail trimming',
                'Ear cleaning',
                'Brushing and styling',
                'Health check during grooming'
            ],
            'veterinary': [
                'Comprehensive examination',
                'Vital signs monitoring',
                'Health assessment',
                'Treatment recommendations',
                'Medical documentation'
            ]
        };
        return includes[category] || includes['pets'];
    };

    const getFrequencyByCategory = (category) => {
        const frequencies = {
            'pets': 'One-time service',
            'food': 'As needed',
            'accessories': 'One-time purchase',
            'care-products': 'Monthly',
            'grooming': 'Every 4-6 weeks',
            'veterinary': 'Every 6-12 months'
        };
        return frequencies[category] || 'As needed';
    };

    const generateMockReviews = () => {
        const names = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Wilson', 'Lisa Thompson'];
        const comments = [
            'Excellent service! Very professional and caring staff.',
            'My pet felt comfortable throughout the entire process.',
            'Great experience, highly recommend this service.',
            'Professional service with attention to detail.',
            'Outstanding care and very reasonable pricing.'
        ];
        
        return names.slice(0, 3).map((name, index) => ({
            id: index + 1,
            name,
            rating: 4 + Math.random(),
            date: `${Math.floor(Math.random() * 30) + 1} days ago`,
            comment: comments[index],
            verified: Math.random() > 0.3
        }));
    };

    const handleOrder = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login to place an order');
            navigate('/login');
            return;
        }

        setOrderLoading(true);
        const form = e.target;
        
        const orderData = {
            productName: service.productName,
            buyerEmail: user.email,
            buyerName: form.buyerName.value,
            quantity: parseInt(form.quantity.value),
            price: service.price,
            phone: form.phone.value,
            address: form.address.value,
            additionalNote: form.additionalNote.value,
            date: new Date().toISOString(),
            serviceId: id
        };

        try {
            const response = await axios.post('http://localhost:3000/orders', orderData);
            
            if (response.status === 201) {
                document.getElementById('order_modal').close();
                
                Swal.fire({
                    title: "Booking Confirmed!",
                    text: "Your appointment has been successfully booked. We'll contact you soon with confirmation details.",
                    icon: "success",
                    confirmButtonText: "Great!",
                    confirmButtonColor: "#3B82F6"
                });
                
                form.reset();
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setOrderLoading(false);
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ⭐
            </span>
        ));
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'pets': '🐾',
            'food': '🥗',
            'accessories': '🎾',
            'care-products': '💝',
            'grooming': '✂️',
            'veterinary': '🏥'
        };
        return icons[category] || '🐾';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-gray-600">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested service could not be found.</p>
                    <Link to="/services" className="btn btn-primary">
                        Browse All Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm">
                    <div className="breadcrumbs">
                        <ul>
                            <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
                            <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Services</Link></li>
                            <li className="text-gray-600">{service.productName}</li>
                        </ul>
                    </div>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
                            <img
                                src={service.images?.[activeImageIndex] || service.image}
                                alt={service.productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = `https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&fit=crop&sig=${id}`;
                                }}
                            />
                        </div>
                        
                        {service.images && service.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {service.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImageIndex(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                            activeImageIndex === index 
                                                ? 'border-blue-600 ring-2 ring-blue-600/20' 
                                                : 'border-gray-200 hover:border-blue-400'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${service.productName} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = `https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=200&fit=crop&sig=${id}${index}`;
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Service Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="badge badge-primary badge-lg">
                                    {getCategoryIcon(service.category)} {service.category}
                                </span>
                                <span className="badge badge-outline">
                                    📍 {service.location}
                                </span>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {service.productName}
                            </h1>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center">
                                    {renderStars(service.rating)}
                                    <span className="ml-2 text-lg font-semibold text-gray-900">
                                        {service.rating.toFixed(1)}
                                    </span>
                                </div>
                                <span className="text-gray-500">
                                    ({service.reviewCount} reviews)
                                </span>
                            </div>

                            <div className="text-4xl font-bold text-green-600 mb-6">
                                ${service.price}
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                {service.description}
                            </p>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Service Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-gray-500 block">Duration:</span>
                                        <span className="font-medium text-gray-900">
                                            {service.specifications?.duration}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block">Suitable for:</span>
                                        <span className="font-medium text-gray-900">
                                            {service.specifications?.suitableFor?.join(', ')}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-gray-500 block">Age Range:</span>
                                        <span className="font-medium text-gray-900">
                                            {service.specifications?.ageRange}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block">Frequency:</span>
                                        <span className="font-medium text-gray-900">
                                            {service.specifications?.frequency}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                className="btn btn-primary btn-lg flex-1"
                                onClick={() => {
                                    if (!user) {
                                        toast.error('Please login to book an appointment');
                                        navigate('/login');
                                        return;
                                    }
                                    document.getElementById('order_modal').showModal();
                                }}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v3m-4-3h8m-4-3V8a1 1 0 011-1h6a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1V8z" />
                                </svg>
                                Book Appointment
                            </button>
                            <button className="btn btn-outline btn-lg flex-1">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detailed Information Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border mb-12">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'overview', label: 'Overview', icon: '📋' },
                                { id: 'specifications', label: 'What\'s Included', icon: '✅' },
                                { id: 'rules', label: 'Guidelines', icon: '📝' },
                                { id: 'reviews', label: 'Reviews', icon: '⭐' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                                        selectedTab === tab.id
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <span>{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {selectedTab === 'overview' && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Service Overview</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {service.longDescription}
                                </p>
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">Why Choose This Service?</h4>
                                    <ul className="text-blue-800 space-y-1">
                                        <li>• Professional and experienced staff</li>
                                        <li>• High-quality care and attention to detail</li>
                                        <li>• Personalized service for your pet's needs</li>
                                        <li>• Competitive pricing with excellent value</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {selectedTab === 'specifications' && (
                            <div>
                                <h3 className="text-xl font-semibold mb-6">What's Included in This Service</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <ul className="space-y-4">
                                        {service.specifications?.includes?.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {selectedTab === 'rules' && (
                            <div>
                                <h3 className="text-xl font-semibold mb-6">Important Guidelines & Requirements</h3>
                                <div className="space-y-4">
                                    {service.rules?.map((rule, index) => (
                                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                                            <span className="text-blue-500 mr-3 mt-1">•</span>
                                            <span className="text-gray-700">{rule}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedTab === 'reviews' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                                    <div className="flex items-center gap-2">
                                        {renderStars(service.rating)}
                                        <span className="font-semibold text-lg">{service.rating.toFixed(1)}</span>
                                        <span className="text-gray-500">({service.reviewCount} reviews)</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    {service.reviews?.map((review) => (
                                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-lg">
                                                        {review.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="font-medium text-gray-900 text-lg">
                                                            {review.name}
                                                        </span>
                                                        {review.verified && (
                                                            <span className="badge badge-success badge-sm">✓ Verified</span>
                                                        )}
                                                        <span className="text-sm text-gray-500">{review.date}</span>
                                                    </div>
                                                    <div className="flex items-center mb-3">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedServices.map((relatedService) => (
                                <div key={relatedService._id} className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={relatedService.image}
                                            alt={relatedService.productName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = `https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&fit=crop&sig=${relatedService._id}`;
                                            }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="badge badge-primary badge-sm">
                                                {relatedService.category}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                📍 {relatedService.location}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {relatedService.productName}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-green-600">
                                                ${relatedService.price}
                                            </span>
                                            <Link 
                                                to={`/details/${relatedService._id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Order Modal */}
                <dialog id="order_modal" className="modal">
                    <div className="modal-box max-w-2xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <h3 className="font-bold text-2xl mb-6 text-center">Book Your Appointment</h3>
                        
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={service?.image} 
                                    alt={service?.productName}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">{service?.productName}</h4>
                                    <p className="text-green-600 font-bold text-lg">${service?.price}</p>
                                </div>
                            </div>
                        </div>
                        
                        <form onSubmit={handleOrder} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                                    <input
                                        name="buyerName"
                                        defaultValue={user?.displayName || ''}
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <input
                                        name="buyerEmail"
                                        type="email"
                                        readOnly
                                        defaultValue={user?.email || ''}
                                        className="input input-bordered w-full bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Quantity *</label>
                                    <input
                                        name="quantity"
                                        type="number"
                                        min="1"
                                        defaultValue="1"
                                        required
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Address *</label>
                                <input
                                    name="address"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="Enter your complete address"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Additional Notes</label>
                                <textarea
                                    name="additionalNote"
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Any special requirements, pet details, or notes for the service provider..."
                                    rows="3"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary flex-1"
                                    disabled={orderLoading}
                                >
                                    {orderLoading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Confirm Booking
                                        </>
                                    )}
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-outline flex-1"
                                    onClick={() => document.getElementById('order_modal').close()}
                                    disabled={orderLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ServiceDetails;