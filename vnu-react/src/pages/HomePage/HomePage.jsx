import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ActualNewsBlock from '../../blocks/ActualNewsBlock/ActualNewsBlock.jsx';
import MainSlider from '../../sliders/MainSlider/MainSlider.jsx';
import EventsSlider from '../../sliders/EventsSlider/EventsSlider';
import LastNewsBlock from '../../blocks/LastNewsBlock/LastNewsBlock';
import MetaTags from '../../components/Common/MetaTags.jsx';
import PartnersSlider from '../../sliders/PartnersSlider/PartnersSlider.jsx';
import HomePageBottomBlock from '../../blocks/HomePageBottomBlock/HomePageBottomBlock.jsx';

export default function HomePage() {
  return (
    <>
      <MetaTags type="front" />
      <MainSlider />
      <ActualNewsBlock />
      <LastNewsBlock />
      <EventsSlider />
      <HomePageBottomBlock />
      <PartnersSlider />
    </>
  );
}
