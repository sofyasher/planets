import './planet-content-card.scss';
import { PlanetModel } from '../../models/planet.model';
import ResidentItem from '../resident-item/resident-item';
import FilmItem from '../film-item/film-item';
import React from 'react';

type PlanetCardContentProps = {
  planet: PlanetModel;
};

const PlanetCardContent = ({ planet }: PlanetCardContentProps) => {
  return (
    <div className='planet-card-content'>
      <p>
        <b>
          <i>{planet.name}</i>
        </b>{' '}
        was a planet with rotation period of{' '}
        <b>{planet.rotation_period} hours</b>{' '}
        {planet.orbital_period !== 'unknown' && (
          <>
            and orbital period of <b>{planet.orbital_period} standard days</b>
          </>
        )}
        . Its diameter was <b>{planet.diameter} km</b>{' '}
        {planet.gravity !== 'N/A' && (
          <>
            and gravity of <b>{planet.gravity}</b>
          </>
        )}
        . There was <b>{planet.climate}</b> climate and <b>{planet.terrain}</b>{' '}
        terrain.{' '}
        {planet.population !== 'unknown' && (
          <>
            The population of this planet were <b>{planet.population}</b>.
          </>
        )}{' '}
        {planet.surface_water !== 'unknown' && (
          <>
            <b>{planet.surface_water}%</b> of the surface is covered by water.
          </>
        )}
      </p>
      {planet.residents.length > 0 && (
        <div>
          Residents:{' '}
          {planet.residents.length > 0 &&
            planet.residents.map((resident, index) => (
              <span key={`resident-${index}`}>
                <ResidentItem residentUrl={resident} />
                {index !== planet.residents.length - 1 ? ', ' : ''}
                {index === planet.residents.length - 1 ? '. ' : ''}
              </span>
            ))}
        </div>
      )}

      {planet.films.length > 0 && (
        <div>
          Films:{' '}
          {planet.films.map((film, index) => (
            <span key={`film-${index}`}>
              <FilmItem filmUrl={film} />
              {index !== planet.films.length - 1 ? ', ' : ''}
              {index === planet.films.length - 1 ? '. ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanetCardContent;
