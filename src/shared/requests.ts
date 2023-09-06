import { get, PLANETS_LIST_URL } from './api';
import { PlanetsModel } from './models/planet.model';
import { fetchPlanetsQueryParams } from './utils';

export const fetchPlanets = (
  setPlanets: any,
  setLoading: any,
  queryParams: { search: string | null; page: number | null },
) => {
  setLoading(true);
  get(`${PLANETS_LIST_URL}?${fetchPlanetsQueryParams(queryParams)}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to get planets');
      }
    })
    .then((result: PlanetsModel) => {
      setPlanets(result);
      setLoading(false);
    })
    .catch(console.log);
};
