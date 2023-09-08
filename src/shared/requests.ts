import { get, PLANETS_LIST_URL } from './api';
import { PlanetsModel } from './models/planet.model';
import { fetchPlanetsQueryParams } from './utils';
import { Dispatch } from 'react';

export const fetchPlanets = (
  setPlanets: Dispatch<PlanetsModel>,
  setLoading: Dispatch<boolean>,
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

/**
 * Is used for fetching film and resident detail by provided detail endpoint URL.
 * @param url
 * @param setItem
 * @param setLoading
 */
export const fetchItem = <T>(
  url: string,
  setItem: Dispatch<T>,
  setLoading: Dispatch<boolean>,
) => {
  setLoading(true);
  // unfortunately there is no endpoint for getting of list the elements with specified ids, so the solution
  // meets the problem of rate limiting and some of the elements may not be returned,
  // when requested for a lot of them at once :(
  get(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Unable to get item from URL: ${url}`);
      }
    })
    .then((result: T) => {
      setItem(result);
      setLoading(false);
    })
    .catch(console.log);
};
