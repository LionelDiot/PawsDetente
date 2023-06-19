import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-carousel-minimal';

const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
};

const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
};

const data = [
    {
        image: "chat.png",
        caption: "Découvrez les articles CHACHAT"
    },
    {
        image: "chien.png",
        caption: "Plutôt wouf wouf que miaou ?"
    },
    {
        image: "oiseau.png",
        caption: "Ou alors un Piafabec à faire évoluer en Rapasdepic peut-être ?"
    },
];

const CarouselPictures = () => {
    return (
        <Carousel
            data={data}
            time={2200}
            width="100vw"
            height="45vh"
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
