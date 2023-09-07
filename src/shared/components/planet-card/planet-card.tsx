import React from 'react';
import { Accordion } from 'react-bootstrap';
import './planet-card.scss';
import { PlanetModel } from '../../models/planet.model';
import ResidentItem from '../resident-item/resident-item';
import FilmItem from '../film-item/film-item';
import { timeToLocalString } from '../../utils';

type PlanetProps = {
  planet: PlanetModel;
};

const PlanetCardData = ({ planet }: PlanetProps) => {
  return (
    <ul className='planet-card-list'>
      <li>Created: {timeToLocalString(planet.created)}</li>
      <li>Edited: {timeToLocalString(planet.edited)}</li>
      <li>Rotation period: {planet.rotation_period}</li>
      <li>Orbital period: {planet.orbital_period}</li>
      <li>Diameter: {planet.diameter}</li>
      <li>Climate: {planet.climate}</li>
      <li>Gravity: {planet.gravity}</li>
      <li>Terrain: {planet.terrain}</li>
      <li>Surface water: {planet.surface_water}</li>
      <li>Population: {planet.population}</li>
      <li>
        {planet.residents.length > 0 && (
          <>
            Residents:{' '}
            {planet.residents.length > 0 &&
              planet.residents.map((resident, index) => (
                <>
                  <ResidentItem residentUrl={resident} />
                  {index !== planet.residents.length - 1 ? ', ' : ''}
                </>
              ))}
          </>
        )}
      </li>
      <li>
        {planet.films.length > 0 && (
          <>
            Films:{' '}
            {planet.films.map((film, index) => (
              <>
                <FilmItem filmUrl={film} />
                {index !== planet.films.length - 1 ? ', ' : ''}
              </>
            ))}
          </>
        )}
      </li>
    </ul>
  );
};

const PlanetCard = ({ planet }: PlanetProps) => {
  return (
    <Accordion.Item eventKey={planet.name}>
      <Accordion.Header>{planet.name}</Accordion.Header>
      <Accordion.Body>
        <PlanetCardData planet={planet} />
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PlanetCard;
