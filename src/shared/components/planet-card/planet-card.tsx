import React from 'react';
import { Accordion } from 'react-bootstrap';
import './planet-card.scss';
import { PlanetModel } from '../../models/planet.model';

type PlanetProps = {
  planet: PlanetModel;
};
const PlanetCard = ({ planet }: PlanetProps) => {
  return (
    <Accordion.Item eventKey={planet.name}>
      <Accordion.Header>{planet.name}</Accordion.Header>
      <Accordion.Body>
        <ul>
          <li>{planet.created}</li>
          <li>{planet.climate}</li>
          <li>{planet.edited}</li>
        </ul>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PlanetCard;
