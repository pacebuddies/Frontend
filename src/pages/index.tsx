import { Button } from 'flowbite-react';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import stravaApi from '../instances/axiosConfigured';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [athlete, setAthlete] = useState('');
  const [pullData, setPullData] = useState(false);

  async function getData() {
    const data = await stravaApi
      .get('synchronize')
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(synch);
    //
    // const data = await stravaApi
    //   .get('athlete')
    //   .then((res) => {
    //     return res;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(data);
    return JSON.stringify(data);
  }

  useEffect(() => {
    getData().then((items) => {
      if (pullData) setAthlete(items);
    });
    if (pullData) {
      getData().then((items) => {
        setAthlete(items);
      });
      console.log(athlete);
    }
    // return () => setPullData(false);
  }, [pullData]);

  return (
    <>
      <div className="">
        <h1>Home</h1>
        {!session && (
          <Button onClick={() => signIn()}>Connect with Strava</Button>
        )}
        {session && (
          <Button onClick={() => signOut()}>Disconnect from Strava</Button>
        )}
        {session && (
          <Button
            color={'purple'}
            onClick={() => {
              setPullData(true);
            }}
          >
            show data
          </Button>
        )}
        <div>
          <h2 className="text-red-800">Chwilowo synchronizacja ponieważ z atletą jest bug</h2>
          {athlete}
        </div>
      </div>
    </>
  );
};

export default Home;
