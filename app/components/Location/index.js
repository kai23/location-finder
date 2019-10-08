import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Button } from '@chakra-ui/core';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import LazyLoad from 'react-lazyload';
import { MdEuroSymbol, MdRoom } from 'react-icons/md';
import {
  FaRulerHorizontal, FaExternalLinkAlt, FaRegCalendarAlt, FaMapMarkerAlt,
} from 'react-icons/fa';

import Tag from 'components/Tag';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  lat,
  lng,
}) {
  const [showMore, setShowMore] = useState(false);

  function openGoogleMaps() {
    if
    ((navigator.platform.indexOf('iPhone') !== -1)
      || (navigator.platform.indexOf('iPad') !== -1)
      || (navigator.platform.indexOf('iPod') !== -1)) {
      window.open(`maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
    } else {
      window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
    }
  }

  return (
    <div className="location">
      <LazyLoad height={200}>
        {images && images.length && images[0] !== null ? (
          <div className="carousel">
            <Carousel emulateTouch showIndicators={false} dynamicHeight>
              {images.map((img, i) => (
                <img
                  key={`${title}`}
                  alt={`${title}-img-${i}`}
                  src={img}
                />
              ))}
            </Carousel>
          </div>
        ) : null}
      </LazyLoad>


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
          <Button size="sm" onClick={openGoogleMaps} mt="1rem">
            <FaMapMarkerAlt />
            Situer
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
  lat: PropTypes.string,
  lng: PropTypes.string,
};

Location.defaultProps = {
  images: [],
  lat: '',
  lng: '',
};

export default Location;
