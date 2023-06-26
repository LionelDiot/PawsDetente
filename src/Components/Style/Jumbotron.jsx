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

  },
  {
    image: "chien2.png",

  },
  {
    image: "oiseau.jpg",
  },
];

const CarouselPictures = () => {
    return (
        <Carousel
            data={data}
            time={4600}
            width="100vw"
            height="95vh"
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
