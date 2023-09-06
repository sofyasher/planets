import React from 'react';
import { Accordion } from 'react-bootstrap';
import './planet-card.scss';
import { PlanetModel } from '../../models/planet.model';
import ResidentItem from '../resident-item/resident-item';
import FilmItem from '../film-item/film-item';

type PlanetProps = {
  planet: PlanetModel;
};
const PlanetCard = ({ planet }: PlanetProps) => {
  return (
    <Accordion.Item eventKey={planet.name}>
      <Accordion.Header>{planet.name}</Accordion.Header>
      <Accordion.Body>
        <ul className='planet-card-list'>
          <li>Created: {new Date(planet.created).toLocaleString('cs-CZ')}</li>
          <li>Edited: {new Date(planet.edited).toLocaleString('cs-CZ')}</li>
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
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PlanetCard;
