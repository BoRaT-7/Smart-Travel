
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Navber from '../Components/Navber';
import GearShop from '../Home Section/GearShop';
import GuideSlider from '../Home Section/GuideSlider';

import TopDestination from '../Home Section/TopDestination';

const Homelayout = () => {
  return (
    <div>
      <header>
         <Header></Header>
      </header>
      <nav>
      <Navber></Navber>
      </nav>
      <main>
       <section>
        <TopDestination></TopDestination>
       </section>
       <section>
        <GearShop></GearShop>
       </section>
       <section><GuideSlider></GuideSlider></section>
       <section></section>
      </main>
      <footer>
      <Footer></Footer>
      </footer>
    </div>
  );
};

export default Homelayout;