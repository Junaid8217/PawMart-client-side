import React from 'react';
import Slider from '../component/Slider';
import PopularSection from '../component/PopularSection';
import WinterCareTips from '../component/WinterCareTips';
import MeetOurVets from '../component/MeetOurVets';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularSection></PopularSection>
            <WinterCareTips></WinterCareTips>
            <MeetOurVets></MeetOurVets>
            
        </div>
    );
};

export default Home;