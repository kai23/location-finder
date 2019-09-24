import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Button } from '@chakra-ui/core';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import fr from 'date-fns/esm/locale/fr';
import { MdEuroSymbol, MdRoom } from 'react-icons/md';
import { FaRulerHorizontal, FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Tag from 'components/Tag';


import {
  CarouselProvider, Slider, Slide,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import './styles.scss';

const providers = {
  lbc: {
    name: 'LeBonCoin',
    color: '#E6733E',
  },
  bienici: {
    name: "Bien'ici",
    color: '#F6BB43',
  },
  'se-loger': {
    name: 'Se Loger',
    color: '#CF2C3B',
  },
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
      {images && images.length && images[0] !== null ? (
        <div className="carousel">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
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
        {date && date.length ? (
          <div className="date">
            <FaRegCalendarAlt size="1.1em" />
            {`Le ${format(parseISO(date), 'd/MM/y à HH:mm')}`}
          </div>
        ) : null}
        <div className="provider">
          <FaExternalLinkAlt size="1.1em" />
          <a href={link} style={{ color: providers[type].color }}>
            {providers[type].name}
          </a>
        </div>
        <Collapse className="description-content" startingHeight={40} isOpen={showMore} onClick={() => setShowMore(!showMore)} dangerouslySetInnerHTML={{ __html: description }} />
        <div className="show-more-container">
          <Button size="sm" onClick={() => setShowMore(!showMore)} mt="1rem">
            {showMore ? 'Réduire' : 'Lire la description'}
          </Button>
        </div>
      </div>

      <div className="tag-list">
        <Tag>
          <MdEuroSymbol />
          {price}
        </Tag>
        <Tag>
          <MdRoom />
          {`${rooms} pièces`}
        </Tag>
        <Tag>
          <FaRulerHorizontal />
          {`${size} m2`}
        </Tag>
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
