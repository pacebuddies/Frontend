import { Button } from 'flowbite-react';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';

const Home: NextPage = () => {
  return (
    <>
      Home page
      <Button onClick={() => signOut()}>LogOut</Button>
    </>
  );
};

export default Home;
