import React, { useEffect, useState } from 'react';
import './resident-item.scss';
import { ResidentModel } from '../../models/resident.model';
import { fetchItem } from '../../requests';
import { Spinner } from 'react-bootstrap';

type ResidentProps = {
  residentUrl: string;
};

const ResidentItem = ({ residentUrl }: ResidentProps) => {
  const [resident, setResident] = useState<ResidentModel | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchItem<ResidentModel>(residentUrl, setResident, setLoading);
  }, [residentUrl]);
  return (
    <>
      {!isLoading ? (
        <i>{resident?.name}</i>
      ) : (
        <Spinner animation='grow' size='sm' />
      )}
    </>
  );
};

export default ResidentItem;
