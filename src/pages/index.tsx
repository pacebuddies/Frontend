import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
const REACT_APP_CLIENT_ID = 97926;
const redirectUrl = 'http://localhost:3000/redirect';
const scope = 'read';

const Home: NextPage = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  function handleLogin() {
    window.open(
      `https://www.strava.com/oauth/authorize?client_id=97926&response_type=code&redirect_uri=http://localhost:3000/exchange_strava_token&approval_prompt=force&scope=read,read_all,profile:read_all,activity:read,activity:read_all`,
    );
  }

  return (
    <>
      <div>
        <h1>Home</h1> <button onClick={handleLogin}>Connect with Strava</button>
      </div>
    </>
  );
};

export default Home;
