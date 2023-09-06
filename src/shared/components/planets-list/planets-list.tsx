import React from 'react';
import { Accordion } from 'react-bootstrap';
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
        <Accordion>
          {planets.map((planet) => (
            <PlanetCard planet={planet} />
          ))}
        </Accordion>
      ) : (
        <div>No results found for this query</div>
      )}
    </>
  );
};

export default PlanetsList;
