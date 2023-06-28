import React from 'react';
import { useAtomValue } from 'jotai';

import { UserIdAtom } from '../../Atoms/userid';

export default function Dashboard() {

  const userId = useAtomValue(UserIdAtom);
  
  React.useEffect(() => {
    console.log('UserIdAtom:', userId);

  }, []);

  return (
    <>
      <h1>Coucou du dashboard</h1>
    </>
  );
}
