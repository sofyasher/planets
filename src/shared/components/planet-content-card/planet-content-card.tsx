import './planet-content-card.scss';
import { PlanetModel } from '../../models/planet.model';
import ResidentItem from '../resident-item/resident-item';
import FilmItem from '../film-item/film-item';
import React from 'react';
import {
  GRAVITY_UNKNOWN_VALUE_PLACEHOLDER,
  ORBITAL_PERIOD_UNKNOWN_VALUE_PLACEHOLDER,
  POPULATION_UNKNOWN_VALUE_PLACEHOLDER,
  SURFACE_WATER_UNKNOWN_VALUE_PLACEHOLDER,
} from '../../planets-constants';

type PlanetCardContentProps = {
  planet: PlanetModel;
  reloadNeeded: boolean;
};

const PlanetCardContent = ({
  planet,
  reloadNeeded,
}: PlanetCardContentProps) => {
  return (
    <div className='planet-card-content'>
      <p>
        <b>
          <i>{planet.name}</i>
        </b>{' '}
        was a planet with rotation period of{' '}
        <b>{planet.rotation_period} hours</b>{' '}
        {planet.orbital_period !== ORBITAL_PERIOD_UNKNOWN_VALUE_PLACEHOLDER && (
          <>
            and orbital period of <b>{planet.orbital_period} standard days</b>
          </>
        )}
        . Its diameter was <b>{planet.diameter} km</b>{' '}
        {planet.gravity !== GRAVITY_UNKNOWN_VALUE_PLACEHOLDER && (
          <>
            and gravity of <b>{planet.gravity}</b>
          </>
        )}
        . There was <b>{planet.climate}</b> climate and <b>{planet.terrain}</b>{' '}
        terrain.{' '}
        {planet.population !== POPULATION_UNKNOWN_VALUE_PLACEHOLDER && (
          <>
            The population of this planet were <b>{planet.population}</b>.
          </>
        )}{' '}
        {planet.surface_water !== SURFACE_WATER_UNKNOWN_VALUE_PLACEHOLDER && (
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
                <ResidentItem
                  residentUrl={resident}
                  reloadNeeded={reloadNeeded}
                />
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
              <FilmItem filmUrl={film} reloadNeeded={reloadNeeded} />
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
