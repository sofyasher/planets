import React, { useEffect, useState } from 'react';
import { Accordion, Container, Spinner } from 'react-bootstrap';
import { DEFAULT_LIST_LENGTH, fetchPlanets } from '../../shared/requests';
import './planets-list.scss';
import { PlanetsModel } from '../../shared/models/planet.model';
import PlanetCard from '../../shared/components/planet-card/planet-card';
import PlanetsPagination from '../../shared/components/planets-pagination/planets-pagination';
import { useQuery } from '../../shared/hooks/use-query';

const PlanetsList = () => {
  let query = useQuery();
  const pageNumber = query.get('page') ?? '1';
  const searchString = query.get('search');
  const [planets, setPlanets] = useState<PlanetsModel | null>(null);
  useEffect(() => {
    fetchPlanets(setPlanets, {
      page: pageNumber,
      search: searchString,
    });
  }, [pageNumber, searchString]);
  return (
    <Container fluid>
      <h1 className='mt-4 mb-5'>Planets</h1>
      {searchString}
      {planets ? (
        <>
          <PlanetsPagination
            active={parseInt(pageNumber) ?? 1}
            count={Math.round(planets.count / DEFAULT_LIST_LENGTH)}
          />
          {planets.results.length > 0 && (
            <Accordion>
              {planets.results.map((planet) => (
                <PlanetCard planet={planet} />
              ))}
            </Accordion>
          )}
        </>
      ) : (
        <Spinner></Spinner>
      )}
    </Container>
  );
};

export default PlanetsList;
