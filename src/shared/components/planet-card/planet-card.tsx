import React, { MutableRefObject, useRef } from 'react';
import './planet-card.scss';
import { PlanetModel } from '../../models/planet.model';
import PlanetCardContent from '../planet-content-card/planet-content-card';

type PlanetCardProps = {
  planet: PlanetModel;
  index: number;
};

const showCard = (cardRefElement: HTMLDivElement | null) => {
  const cardBody = cardRefElement?.children[1];
  cardRefElement?.classList.add('show');
  cardBody?.setAttribute(
    'style',
    `max-height: ${cardBody.scrollHeight + 'px'}`,
  );
};

const hideCard = (cardRefElement: HTMLDivElement | null) => {
  const cardBody = cardRefElement?.children[1];
  cardRefElement?.classList.remove('show');
  cardBody?.setAttribute('style', 'max-height: 0');
};

const toggleAccordionItem = (
  cardRef: MutableRefObject<HTMLDivElement | null>,
  index: number,
) => {
  const cardRefElement = cardRef.current;
  if (cardRefElement?.classList.contains('show')) {
    hideCard(cardRefElement);
  } else {
    Array.from(document.getElementsByClassName('planet-card show'))
      .filter((accordionItem) => accordionItem.id !== `planet-card-${index}`)
      .forEach((accordionItem) => {
        hideCard(accordionItem as HTMLDivElement);
      });

    showCard(cardRefElement);
  }
};

const PlanetCard = ({ planet, index }: PlanetCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className='planet-card' ref={cardRef} id={`planet-card-${index}`}>
      <button
        className='planet-card-button'
        onClick={() => toggleAccordionItem(cardRef, index)}
      >
        {planet.name}
      </button>
      <div className={`planet-card-body`}>
        <PlanetCardContent planet={planet} />
      </div>
    </div>
  );
};

export default PlanetCard;
