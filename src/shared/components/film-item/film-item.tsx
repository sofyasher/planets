import React, { useEffect, useState } from 'react';
import './film-item.scss';
import { FilmModel } from '../../models/film.model';
import { fetchItem } from '../../requests';
import { Spinner } from 'react-bootstrap';

type FilmProps = {
  filmUrl: string;
  reloadNeeded: boolean;
};

const FilmItem = ({ filmUrl, reloadNeeded }: FilmProps) => {
  const [film, setFilm] = useState<FilmModel | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // films details are now requested only once after the first expanding
    if (reloadNeeded) {
      fetchItem<FilmModel>(filmUrl, setFilm, setLoading);
    }
  }, [filmUrl, reloadNeeded]);
  return (
    <>
      {!isLoading ? (
        <i>{film?.title}</i>
      ) : (
        <Spinner animation='grow' size='sm' />
      )}
    </>
  );
};

export default FilmItem;
