import React, { Dispatch, MutableRefObject, useRef, useState } from 'react';
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
    `max-height: ${cardBody.scrollHeight + 100 + 'px'}`, // 100px is a margin for residents and films elements
  );
};

const hideCard = (cardRefElement: HTMLDivElement | null) => {
  const cardBody = cardRefElement?.children[1];
  cardRefElement?.classList.remove('show');
  cardBody?.setAttribute('style', 'max-height: 0');
};

const toggleAccordionItem = (
  cardRef: MutableRefObject<HTMLDivElement | null>,
  setExpanded: Dispatch<boolean>,
) => {
  const cardRefElement = cardRef.current;
  if (cardRefElement?.classList.contains('show')) {
    hideCard(cardRefElement);
  } else {
    Array.from(document.getElementsByClassName('planet-card show')).forEach(
      (accordionItem) => {
        hideCard(accordionItem as HTMLDivElement);
      },
    );

    setExpanded(true);
    showCard(cardRefElement);
  }
};

const PlanetCard = ({ planet, index }: PlanetCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className='planet-card' ref={cardRef} id={`planet-card-${index}`}>
      <button
        className='planet-card-button'
        onClick={() => toggleAccordionItem(cardRef, setExpanded)}
      >
        {planet.name}
      </button>
      <div className={`planet-card-body`}>
        <PlanetCardContent planet={planet} reloadNeeded={expanded} />
      </div>
    </div>
  );
};

export default PlanetCard;
