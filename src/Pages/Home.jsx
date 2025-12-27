// src/Pages/Home.jsx
import GearShop from "../Home Section/GearShop";
import GuideSlider from "../Home Section/GuideSlider";
import HotelBooking from "../Home Section/HotelBooking";
import TopDestination from "../Home Section/TopDestination";
import TransportBooking from "../Home Section/TransportBooking";
import UserReviewSection from "../Home Section/UserReviewSection";

const Home = () => {
  return (
    <>
      <section id="top-destination">
        <TopDestination />
      </section>
      <section id="gear-shop">
        <GearShop />
      </section>
      <section id="hotel-booking">
        <HotelBooking />
      </section>
      <section id="guide-slider">
        <GuideSlider />
      </section>
      <section id="transport-booking">
        <TransportBooking />
      </section>
      <section>
        <UserReviewSection />
      </section>
    </>
  );
};

export default Home;
