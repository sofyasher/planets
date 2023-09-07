import React, { useEffect, useState } from 'react';
import './film-item.scss';
import { FilmModel } from '../../models/film.model';
import { fetchItem } from '../../requests';
import { Spinner } from 'react-bootstrap';

type FilmProps = {
  filmUrl: string;
};
const FilmItem = ({ filmUrl }: FilmProps) => {
  const [film, setFilm] = useState<FilmModel | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchItem<FilmModel>(filmUrl, setFilm, setLoading);
  }, [filmUrl]);
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
