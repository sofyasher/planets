import { get, PLANETS_LIST_URL } from './api';
import { PlanetsModel } from './models/planet.model';

export const DEFAULT_LIST_LENGTH = 10;

export const fetchPlanets = (
  setPlanets: any,
  queryParams: { search: string | null; page: string | null },
) => {
  get(PLANETS_LIST_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to get planets');
      }
    })
    .then((result: PlanetsModel) => {
      setPlanets(result);
    })
    .catch(console.log);
};
