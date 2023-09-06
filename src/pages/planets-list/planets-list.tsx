import React, { useEffect, useState } from 'react';
import { Accordion, Col, Container, Row, Spinner } from 'react-bootstrap';
import { DEFAULT_LIST_LENGTH, fetchPlanets } from '../../shared/requests';
import './planets-list.scss';
import { PlanetsModel } from '../../shared/models/planet.model';
import PlanetCard from '../../shared/components/planet-card/planet-card';
import PlanetsPagination from '../../shared/components/planets-pagination/planets-pagination';
import { useQuery } from '../../shared/hooks/use-query';
import Search from '../../shared/components/search/search';

const PlanetsList = () => {
  const query = useQuery();
  const pageNumber = query.get('page');
  const searchString = query.get('search');
  const [planets, setPlanets] = useState<PlanetsModel | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const queryParams = {};
    if (pageNumber) {
      Object.assign(queryParams, { page: pageNumber });
    }
    if (searchString) {
      Object.assign(queryParams, { search: searchString });
    }

    fetchPlanets(setPlanets, setLoading, queryParams);
  }, [pageNumber, searchString]);
  return (
    <Container fluid>
      <h1 className='mt-4 mb-5'>Planets</h1>
      <Row>
        <Col>
          <Search isDisabled={isLoading} searchString={searchString} />
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <PlanetsPagination
            active={pageNumber ? parseInt(pageNumber) : 1}
            isDisabled={isLoading}
            count={
              planets ? Math.round(planets.count / DEFAULT_LIST_LENGTH) : 1
            }
          />
        </Col>
      </Row>
      {!isLoading ? (
        <>
          {planets && planets.results?.length > 0 ? (
            <Accordion>
              {planets.results.map((planet) => (
                <PlanetCard planet={planet} />
              ))}
            </Accordion>
          ) : (
            <div>Empty list</div>
          )}
        </>
      ) : (
        <Spinner></Spinner>
      )}
    </Container>
  );
};

export default PlanetsList;
