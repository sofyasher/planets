import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { fetchPlanets } from '../../shared/requests';
import './planets-list-page.scss';
import { PlanetsModel } from '../../shared/models/planet.model';
import PlanetsPagination from '../../shared/components/planets-pagination/planets-pagination';
import { useQuery } from '../../shared/hooks/use-query';
import Search from '../../shared/components/search/search';
import { Link } from 'react-router-dom';
import { planetsListNavigateUrl } from '../../shared/utils';
import { DEFAULT_LIST_LENGTH } from '../../shared/constants';
import PlanetsList from '../../shared/components/planets-list/planets-list';

const PlanetsListPage = () => {
  const query = useQuery();
  const pageNumber = query.get('page');
  const searchString = query.get('search');
  const [planets, setPlanets] = useState<PlanetsModel | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const pagesCount = planets
    ? Math.round(planets.count / DEFAULT_LIST_LENGTH)
    : 1;

  useEffect(() => {
    fetchPlanets(setPlanets, setLoading, {
      page: pageNumber,
      search: searchString,
    });
  }, [pageNumber, searchString]);
  return (
    <Container fluid>
      <h1 className='mt-4 mb-5'>
        <Link
          className={isLoading ? 'planets-list-page-disabled-link' : ''}
          to={planetsListNavigateUrl({})}
        >
          Planets
        </Link>
      </h1>
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
            count={pagesCount}
          />
        </Col>
      </Row>
      {!isLoading && planets?.results ? (
        <PlanetsList planets={planets?.results} />
      ) : (
        <Spinner></Spinner>
      )}
    </Container>
  );
};

export default PlanetsListPage;
