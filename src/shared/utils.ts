export const fetchPlanetsQueryParams = (queryParams: {
  page: string | null;
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

export const planetsListNavigateUrl = (queryParams: {
  page?: number | null;
  search?: string | null;
}): string => {
  let url = '/?';
  return url
    .concat(queryParams.page ? `page=${queryParams.page}` : '')
    .concat(queryParams.search ? `&search=${queryParams.search}` : '');
};
