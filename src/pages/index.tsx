import type { NextPage } from 'next';
const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = 'http://localhost:3000/redirect';
const scope = 'read';
const Home: NextPage = () => {
  function handleLogin() {}

  return (
    <>
      <div>
        <h1>Home</h1> <button onClick={handleLogin}>Connect with Strava</button>
      </div>
    </>
  );
};

export default Home;
