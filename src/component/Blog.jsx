import { Container, Grid, Card, Button } from '../components/ui';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'Winter Pet Care: Essential Tips for Cold Weather',
            excerpt: 'Learn how to keep your pets safe, warm, and healthy during the winter months with expert advice from our veterinarians.',
            author: 'Dr. Sarah Johnson',
            date: 'January 15, 2026',
            readTime: '5 min read',
            category: 'Pet Care',
            image: '🐕‍🦺',
            tags: ['Winter Care', 'Health Tips', 'Safety']
        },
        {
            id: 2,
            title: 'Understanding Pet Nutrition: A Complete Guide',
            excerpt: 'Discover the fundamentals of pet nutrition and how to choose the right diet for your furry friend\'s specific needs.',
            author: 'Dr. Michael Chen',
            date: 'January 12, 2026',
            readTime: '8 min read',
            category: 'Nutrition',
            image: '🥘',
            tags: ['Nutrition', 'Diet', 'Health']
        },
        {
            id: 3,
            title: 'Signs Your Pet Needs Emergency Care',
            excerpt: 'Recognize the warning signs that indicate your pet needs immediate veterinary attention and what to do in emergencies.',
            author: 'Dr. Emily Rodriguez',
            date: 'January 10, 2026',
            readTime: '6 min read',
            category: 'Emergency Care',
            image: '🚨',
            tags: ['Emergency', 'Health', 'First Aid']
        },
        {
            id: 4,
            title: 'The Benefits of Regular Pet Grooming',
            excerpt: 'Explore how regular grooming contributes to your pet\'s health, comfort, and overall well-being beyond just appearance.',
            author: 'Lisa Thompson',
            date: 'January 8, 2026',
            readTime: '4 min read',
            category: 'Grooming',
            image: '✂️',
            tags: ['Grooming', 'Health', 'Hygiene']
        },
        {
            id: 5,
            title: 'Training Your Puppy: First Steps to Success',
            excerpt: 'Start your puppy\'s training journey with these essential tips and techniques for building good habits early.',
            author: 'Mark Wilson',
            date: 'January 5, 2026',
            readTime: '7 min read',
            category: 'Training',
            image: '🎓',
            tags: ['Training', 'Puppies', 'Behavior']
        },
        {
            id: 6,
            title: 'Senior Pet Care: Keeping Older Pets Comfortable',
            excerpt: 'Learn about the special care requirements for senior pets and how to ensure their golden years are comfortable and happy.',
            author: 'Dr. David Kim',
            date: 'January 3, 2026',
            readTime: '6 min read',
            category: 'Senior Care',
            image: '👴',
            tags: ['Senior Pets', 'Health', 'Comfort Care']
        }
    ];

    const categories = ['All', 'Pet Care', 'Nutrition', 'Emergency Care', 'Grooming', 'Training', 'Senior Care'];

    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Pet Care Blog
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Expert advice, tips, and insights from our veterinary team to help you care for your pets
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <Grid cols={3} gap="lg">
                    {blogPosts.map((post) => (
                        <Card key={post.id} className="group hover:shadow-xl transition-all duration-300">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-4xl">{post.image}</span>
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        <span>By {post.author}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                                        <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200">
                                            Read More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </Grid>

                <div className="text-center mt-12">
                    <Button variant="primary" size="lg">
                        View All Articles
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default Blog;