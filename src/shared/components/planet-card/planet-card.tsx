import React, { useRef } from 'react';
import './planet-card.scss';
import { PlanetModel } from '../../models/planet.model';
import PlanetCardContent from '../planet-content-card/planet-content-card';

type PlanetCardProps = {
  planet: PlanetModel;
  index: number;
};

const toggleAccordionItem = (bodyRef: any, index: number) => {
  if (!bodyRef.current.classList.contains('show')) {
    bodyRef.current.classList.add('show');
    bodyRef.current.style.maxHeight = bodyRef.current.scrollHeight + 'px';
    Array.from(
      document.getElementsByClassName('planet-card-body show'),
    ).forEach((accordionItem) => {
      if (accordionItem.id !== `planet-card-${index}`) {
        (accordionItem as HTMLElement).style.maxHeight = '0';
        (accordionItem as HTMLElement).classList.remove('show');
      }
    });
  } else {
    bodyRef.current.style.maxHeight = '0';
    bodyRef.current.classList.remove('show');
  }
};

const PlanetCard = ({ planet, index }: PlanetCardProps) => {
  const bodyRef = useRef(null);

  return (
    <div className='planet-card'>
      <button
        className='planet-card-button'
        onClick={() => toggleAccordionItem(bodyRef, index)}
      >
        {planet.name}
      </button>
      <div
        className={`planet-card-body`}
        ref={bodyRef}
        id={`planet-card-${index}`}
      >
        <PlanetCardContent planet={planet} />
      </div>
    </div>
  );
};

export default PlanetCard;
