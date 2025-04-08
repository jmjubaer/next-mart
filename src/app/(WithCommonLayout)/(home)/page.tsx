
import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/featuredProduct";
import HeroSection from "@/components/modules/home/heroSection";

const HomePage = () => {
    return (
        <div>
           <HeroSection/>
           <Category/>
           <FeaturedProducts/>
        </div>
    );
};

export default HomePage;
