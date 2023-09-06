import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './search.scss';
import { useNavigate } from 'react-router-dom';
import { planetsListNavigateUrl } from '../../utils';
import { SEARCH_DEBOUNCE_TIME } from '../../constants';

type SearchProps = {
  searchString: string | null;
  isDisabled: boolean;
};

const Search = ({ searchString, isDisabled }: SearchProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchString ?? '');

  useEffect(() => {
    const runSearch = setTimeout(() => {
      navigate(planetsListNavigateUrl({ search: search }));
    }, SEARCH_DEBOUNCE_TIME);

    return () => clearTimeout(runSearch);
  }, [search, navigate]);

  return (
    <Form>
      <Form.Control
        value={search}
        placeholder='Search by name or its part'
        disabled={isDisabled}
        onChange={(event) => setSearch(event.target.value)}
      />
    </Form>
  );
};

export default Search;
