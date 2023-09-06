import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './search.scss';
import { useNavigate } from 'react-router-dom';

const SEARCH_DEBOUNCE_TIME = 500;

type SearchProps = {
  searchString: string | null;
  isDisabled: boolean;
};

// @ts-ignore
const Search = ({ searchString, isDisabled }: SearchProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchString ?? '');

  useEffect(() => {
    const runSearch = setTimeout(() => {
      navigate(`?search=${search}`);
    }, SEARCH_DEBOUNCE_TIME);

    return () => clearTimeout(runSearch);
  }, [search, navigate]);

  return (
    <Form>
      <Form.Control
        value={search}
        placeholder='Search name or its part'
        disabled={isDisabled}
        onChange={(event) => setSearch(event.target.value)}
      />
    </Form>
  );
};

export default Search;
