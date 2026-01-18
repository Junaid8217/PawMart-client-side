import Slider from '../component/Slider';
import WinterCareTips from '../component/WinterCareTips';
import Features from '../component/Features';
import Services from '../component/Services';
import Categories from '../component/Categories';
import PopularSection from '../component/PopularSection';
import Statistics from '../component/Statistics';
import MeetOurVets from '../component/MeetOurVets';
import Testimonials from '../component/Testimonials';
import Blog from '../component/Blog';
import Newsletter from '../component/Newsletter';
import FAQ from '../component/FAQ';
import CTA from '../component/CTA';

const Home = () => {
    return (
        <main className="min-h-screen">
            {/* 1. Hero/Carousel Section */}
            <Slider />
            
            {/* 2. Winter Care Tips Section */}
            <WinterCareTips />
            
            {/* 3. Features Section */}
            <div id="next-section">
                <Features />
            </div>
            
            {/* 4. Services Section */}
            <Services />
            
            {/* 5. Categories Section */}
            <Categories />
            
            {/* 6. Popular Section */}
            <PopularSection />
            
            {/* 7. Statistics Section */}
            <Statistics />
            
            {/* 8. Meet Our Vets Section */}
            <MeetOurVets />
            
            {/* 9. Testimonials Section */}
            <Testimonials />
            
            {/* 10. Blog Section */}
            <Blog />
            
            {/* 11. Newsletter Section */}
            <Newsletter />
            
            {/* 12. FAQ Section */}
            <FAQ />
            
            {/* 13. Call-to-Action Section */}
            <CTA />
        </main>
    );
};

export default Home;