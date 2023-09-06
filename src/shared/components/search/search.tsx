import React, { useEffect, useRef, useState } from 'react';
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
  const inputRef = useRef(null);

  useEffect(() => {
    const runSearch = setTimeout(() => {
      navigate(planetsListNavigateUrl({ search: search }));
    }, SEARCH_DEBOUNCE_TIME);

    return () => clearTimeout(runSearch);
  }, [search, navigate]);

  useEffect(() => {
    if (inputRef.current) {
      (inputRef.current as HTMLElement).focus();
    }
  }, [isDisabled]);

  return (
    <Form.Control
      ref={inputRef}
      value={search}
      placeholder='Search by name or its part'
      disabled={isDisabled}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
};

export default Search;
