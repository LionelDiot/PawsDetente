import React from 'react';
import { useAtomValue } from 'jotai';
import { adminAtom } from '../../Atoms/admin';
import { UserIdAtom } from '../../Atoms/userid';

export default function Dashboard() {
  const admin = useAtomValue(adminAtom);
  const userId = useAtomValue(UserIdAtom);
  
  React.useEffect(() => {
    console.log('UserIdAtom:', userId);
    console.log('admin:', admin);
  }, []);

  return (
    <>
      <h1>Coucou du dashboard</h1>
    </>
  );
}
