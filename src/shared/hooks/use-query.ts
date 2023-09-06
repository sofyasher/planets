import { useLocation } from 'react-router-dom';
import React from 'react';

/**
 * Custom hook for getting query params from the current URL.
 */
export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};
