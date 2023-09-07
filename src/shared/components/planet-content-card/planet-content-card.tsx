import './planet-content-card.scss';
import { PlanetModel } from '../../models/planet.model';
import ResidentItem from '../resident-item/resident-item';
import FilmItem from '../film-item/film-item';
import { timeToLocalString } from '../../utils';
import React from 'react';

type PlanetCardContentProps = {
  planet: PlanetModel;
};

const PlanetCardContent = ({ planet }: PlanetCardContentProps) => {
  return (
    <div className='planet-card-content'>
      <div>
        <ul className='planet-card-items'>
          <li>Rotation period: {planet.rotation_period}</li>
          <li>Orbital period: {planet.orbital_period}</li>
          <li>Diameter: {planet.diameter}</li>
          <li>Gravity: {planet.gravity}</li>
        </ul>
      </div>
      <div>
        <ul className='planet-card-items'>
          <li>Climate: {planet.climate}</li>
          <li>Terrain: {planet.terrain}</li>
          <li>Surface water: {planet.surface_water}</li>
          <li>Population: {planet.population}</li>
        </ul>
      </div>
      <div>
        <ul className='planet-card-items'>
          {planet.residents.length > 0 && (
            <>
              Residents:{' '}
              {planet.residents.length > 0 &&
                planet.residents.map((resident, index) => (
                  <div key={`resident-${index}`}>
                    <ResidentItem residentUrl={resident} />
                    {index !== planet.residents.length - 1 ? ', ' : ''}
                  </div>
                ))}
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className='planet-card-items'>
          {planet.films.length > 0 && (
            <>
              Films:{' '}
              {planet.films.map((film, index) => (
                <div key={`film-${index}`}>
                  <FilmItem filmUrl={film} />
                  {index !== planet.films.length - 1 ? ', ' : ''}
                </div>
              ))}
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className='planet-card-items'>
          <li>Created: {timeToLocalString(planet.created)}</li>
          <li>Edited: {timeToLocalString(planet.edited)}</li>
        </ul>
      </div>
    </div>
  );
};

export default PlanetCardContent;
