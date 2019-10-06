import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './assets/styles.scss';
import {
  NumberInput, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Switch, Checkbox, CheckboxGroup, Icon,
} from '@chakra-ui/core';
import providers from 'utils/providers';

import { FaChevronLeft } from 'react-icons/fa';
import { push } from 'connected-react-router';
import InputChips from 'components/InputChips/index';

const defaultSettings = {
  maxPrice: 0,
  postalCode: '',
  surfaceMin: 0,
  roomNumber: 0,
  isMeuble: false,
  provider: [],
  blacklist: '',
};

function Filters() {
  const dispatch = useDispatch();
  const settingsRaw = localStorage.getItem('settings');
  let settings = {};
  if (settingsRaw) {
    settings = JSON.parse(settingsRaw);
  } else {
    settings = defaultSettings;
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  const [maxPrice, setMaxPrice] = useState(settings.maxPrice || '');
  const [postalCode, setPostalCode] = useState(settings.postalCode || '');
  const [surfaceMin, setSurfaceMin] = useState(settings.surfaceMin || '');
  const [roomNumber, setRoomNumber] = useState(settings.roomNumber || 1);
  const [isMeuble, setIsMeuble] = useState(settings.isMeuble || false);
  const [provider, setProvider] = useState(settings.provider || []);
  const [blacklist, setBlackList] = useState(settings.blacklist || '');

  const [saved, setSaved] = useState(false);


  useEffect(() => {
    let timeout;
    const newSettings = {
      maxPrice,
      postalCode,
      surfaceMin,
      roomNumber,
      isMeuble,
      provider,
      blacklist,
    };
    if (JSON.stringify(newSettings) !== JSON.stringify(settings)) {
      localStorage.setItem('settings', JSON.stringify(newSettings));
      setSaved(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSaved(false);
      }, 500);
    }
  }, [maxPrice, postalCode, surfaceMin, roomNumber, isMeuble, provider, blacklist]);

  return (
    <div
      className="filters"
    >
      <div className="header">
        <div
          className="header-left"
          role="button"
          tabIndex="0"
          onKeyDown={() => dispatch(push('/'))}
          onClick={() => dispatch(push('/'))}
        >
          <FaChevronLeft size="1.3em" />
          <span className="header-title">résultats</span>
        </div>
        <div className="header-right">
          {saved && (
            <div className="success">
              <Icon name="check" size="16px" color="green.500" />
              Filtre sauvegardé
            </div>
          )}
        </div>
      </div>
      <div className="content">
        <div className="form-item">
          <h4>Prix maximum</h4>
          <NumberInput isRequired value={maxPrice} onChange={(v) => setMaxPrice(v)} />
        </div>
        <div className="form-item">
          <h4>Code postal</h4>
          <Input isRequired value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div className="form-item">
          <h4>Surface min.</h4>
          <Input isRequired value={surfaceMin} onChange={(e) => setSurfaceMin(e.target.value)} placeholder="en m2" />
        </div>
        <div className="form-item">
          <h4>Nombre de pièce</h4>
          <Slider value={roomNumber} max={6} onChange={(value) => setRoomNumber(value)}>
            <SliderTrack bg="red.100" />
            <SliderFilledTrack bg="tomato" />
            <SliderThumb size={6}>
              {roomNumber}
            </SliderThumb>
          </Slider>
        </div>
        <div className="form-item">
          <h4>Meublé</h4>
          <span className="switch-left">Non</span>
          <Switch id="email-alerts" size="lg" isChecked={isMeuble} onChange={() => setIsMeuble(!isMeuble)} />
          <span className="switch-right">Oui</span>
        </div>
        <div className="form-item">
          <h4>Mots interdits</h4>
          <InputChips value={blacklist} onChange={(v) => setBlackList(v)} />
        </div>
        <div className="form-item">
          <h4>Sites</h4>
          <div className="providers">
            <CheckboxGroup
              defaultValue={provider}
              onChange={(v) => setProvider(v)}
              isInline
              spacing="30px"
            >
              <Checkbox value="lbc"><img alt="lbc" src={providers.lbc.img} /></Checkbox>
              <Checkbox value="bienici"><img alt="bienici" src={providers.bienici.img} /></Checkbox>
              <Checkbox value="se-loger"><img alt="se-loger" src={providers['se-loger'].img} /></Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
