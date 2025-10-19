import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Navber from '../Components/Navber';
import GearShop from '../Home Section/GearShop';
import GuideSlider from '../Home Section/GuideSlider';
import HotelBooking from '../Home Section/HotelBooking';
import TopDestination from '../Home Section/TopDestination';
import TransportBooking from '../Home Section/TransportBooking';

const Homelayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <nav>
        <Navber />
      </nav>
      <main>
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
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Homelayout;
