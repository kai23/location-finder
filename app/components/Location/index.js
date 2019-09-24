import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '@chakra-ui/core';
import formatDistance from 'date-fns/formatDistance';
import parseISO from 'date-fns/parseISO';
import fr from 'date-fns/esm/locale/fr';
import { MdEuroSymbol, MdRoom } from 'react-icons/md';
import { FaRulerHorizontal, FaExternalLinkAlt } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
  CarouselProvider, Slider, Slide,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import './styles.scss';

const providers = {
  lbc: 'LeBonCoin',
  bienici: "Bien'ici",
  seloger: 'Se Loger',
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
  type,
}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="location">
      <div className="header">
        {title}
      </div>
      {images && images.length && images[0] !== null ? (
        <div className="carousel">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={images.length}
          >
            <Slider>
              {images.map((img, i) => (
                <Slide index={i}>
                  <LazyLoadImage
                    alt={`${title}-img-${i}`}
                    src={img}
                  />
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>
      ) : null}
      <div className="description">
        <Collapse startingHeight={40} isOpen={showMore} onClick={() => setShowMore(!showMore)} dangerouslySetInnerHTML={{ __html: description }} />
        <button
          className="show-more"
          onKeyPress={() => setShowMore(!showMore)}
          onClick={() => setShowMore(!showMore)}
          type="button"
        >
          {showMore ? 'En voir moins' : 'En voir plus'}
        </button>
      </div>
      {date && date.length ? (
        <div className="date">
          posté il y a
          {' '}
          {formatDistance(parseISO(date), Date.now(), { locale: fr })}
          {`sur ${providers[type]}`}
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
          {`${size} m2`}
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
  size: PropTypes.number.isRequired,
  rooms: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

Location.defaultProps = {
  images: [],
};

export default Location;
