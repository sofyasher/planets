import React from 'react';
import './planets-list.scss';
import { PlanetModel } from '../../models/planet.model';
import PlanetCard from '../planet-card/planet-card';

type PlanetsListProps = {
  planets: PlanetModel[];
};

const PlanetsList = ({ planets }: PlanetsListProps) => {
  return (
    <>
      {planets.length > 0 ? (
        <div className='planet-list-container'>
          {planets.map((planet, index) => (
            <PlanetCard key={planet.name} planet={planet} index={index} />
          ))}
        </div>
      ) : (
        <div>No results found for this query</div>
      )}
    </>
  );
};

export default PlanetsList;
