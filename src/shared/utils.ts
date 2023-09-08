/**
 * Creates an object with provided query params for using in a GET request to the planets list.
 * @param queryParams Query params wrapper object
 */
export const fetchPlanetsQueryParams = (queryParams: {
  page: number | null;
  search: string | null;
}): URLSearchParams => {
  let params = {};
  if (queryParams.page) {
    params = { page: queryParams.page };
  }

  if (queryParams.search) {
    params = { ...params, search: queryParams.search };
  }
  return new URLSearchParams(params);
};

/**
 * Dynamically resolves a planets list page URL using provided query params.
 * @param queryParams Query params wrapper object
 */
export const planetsListNavigateUrl = (queryParams: {
  page?: number | null;
  search?: string | null;
}): string => {
  let url = '/?';
  return url
    .concat(queryParams.page ? `page=${queryParams.page}` : '')
    .concat(queryParams.search ? `&search=${queryParams.search}` : '');
};
