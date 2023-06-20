import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-carousel-minimal';

const captionStyle = {
  fontSize: "2em",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const slideNumberStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const data = [
  {
    image: "chat2.png",
    caption: "ARTICLES POUR MIAOUW",
  },
  {
    image: "chien2.png",
    caption: "ARTICLES POUR OUAF ?",
  },
  {
    image: "oiseau2.png",
    caption: "Ou alors un Piafabec à faire évoluer en Rapasdepic peut-être ?",
  },
];

const CarouselPictures = () => {
    return (
        <Carousel
            data={data}
            time={2300}
            width="100vw"
            height="65vh"
            captionStyle={captionStyle}
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
        />
    );
};

export default CarouselPictures;
