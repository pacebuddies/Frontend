import { Button } from 'flowbite-react';
import type { NextPage } from 'next';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  async function myFunction() {
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);
  }
  useEffect(() => {
    console.log(session);
    myFunction();
  });
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
      </div>
    </>
  );
};

export default Home;
