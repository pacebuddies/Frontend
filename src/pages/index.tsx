import axios from 'axios';
import { Button } from 'flowbite-react';
import type { NextPage } from 'next';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  let csrfToken: string | undefined;

  useEffect(() => {
    console.log(session);

  });

  async function showData() {
    // csrfToken = await getCsrfToken();
    csrfToken = 'f6134e9907c0c74b07dfb8b7673697be09339085';
    console.log(csrfToken)
    const synch = await axios
      .get('http://localhost:8080/api/v1/synchronize', {
        headers: {
          'Authorization': `Bearer ${csrfToken}`,
          'Accept-Encoding': 'identity',
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(synch);

    const data = await axios
      .get('http://localhost:8080/api/v1/athlete', {
        headers: {
          Authorization: `Bearer ${csrfToken}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    const datastrava = await axios
      .get('https://www.strava.com/api/v3/athlete', {
        headers: {
          Authorization: `Bearer ${csrfToken}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(datastrava);
  }

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
          <Button color={'purple'} onClick={() => showData()}>
            show data
          </Button>
        )}
      </div>
    </>
  );
};

export default Home;
