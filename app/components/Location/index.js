import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '@chakra-ui/core';
import formatDistance from 'date-fns/formatDistance';
import parseISO from 'date-fns/parseISO';
import fr from 'date-fns/esm/locale/fr';
import { MdEuroSymbol, MdRoom } from 'react-icons/md';
import { FaRulerHorizontal, FaExternalLinkAlt } from 'react-icons/fa';

import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import './styles.scss';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  arrows: false,
};

function Location({
  date,
  description,
  images,
  link,
  price,
  rooms,
  size,
  title,
}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="location">
      <div className="header">
        {title}
      </div>
      {images && images.length ? (
        <div className="carousel">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={images.length}
          >
            <Slider>
              {images.map((img, i) => (
                <Slide index={i}>
                  <img src={img} alt={`${title}-img-${i}`} />
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>
      ) : null}
      <div className="description">
        <Collapse startingHeight={40} isOpen={showMore} onClick={() => setShowMore(!showMore)}>
          {description}
        </Collapse>
        <p className="show-more" onClick={() => setShowMore(!showMore)}>
          {showMore ? 'En voir moins' : 'En voir plus'}
        </p>
      </div>
      {date && date.length ? (
        <div className="date">
        posté il y a
          {' '}
          {formatDistance(parseISO(date), Date.now(), { locale: fr })}
        </div>
      ) : null}
      <div className="footer">
        <div className="price">
          <MdEuroSymbol />
          {price}
        </div>
        <div className="rooms">
          <MdRoom />
          {`${rooms} pièces`}
        </div>
        <div className="size">
          <FaRulerHorizontal />
          {`${size}m2`}
        </div>
        <div className="external">
          <a href={link}>
            <FaExternalLinkAlt />
            Ouvrir
          </a>
        </div>
      </div>
    </div>
  );
}

Location.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired),
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  rooms: PropTypes.string.isRequired,
};

Location.defaultProps = {
  images: [],
};

export default Location;
