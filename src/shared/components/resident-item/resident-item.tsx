import React, { useEffect, useState } from 'react';
import './resident-item.scss';
import { ResidentModel } from '../../models/resident.model';
import { fetchItem } from '../../requests';
import { Spinner } from 'react-bootstrap';

type ResidentProps = {
  residentUrl: string;
  reloadNeeded: boolean;
};

const ResidentItem = ({ residentUrl, reloadNeeded }: ResidentProps) => {
  const [resident, setResident] = useState<ResidentModel | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // residents details are now requested only once after the first card expanding
    if (reloadNeeded) {
      fetchItem<ResidentModel>(residentUrl, setResident, setLoading);
    }
  }, [residentUrl, reloadNeeded]);
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
