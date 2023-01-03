import type { NextPage } from 'next';
import StravaLoginButton from '../components/StravaLoginButton';

const Login: NextPage = () => {
  return (
    <>
      <div className="flex h-screen shrink-0 flex-nowrap items-center justify-center bg-[url('../img/background_on_login.png')]">
        {/*<Image*/}
        {/*  src={bg_image}*/}
        {/*  alt="people doing sport together"*/}
        {/*  fill={true}*/}
        {/*  placeholder="blur"*/}
        {/*></Image>*/}
        <div className="flex h-screen flex-none basis-1/4"></div>
        {/*Center div with login panel*/}
        <div className="flex h-screen shrink-0 basis-1/2 flex-col flex-nowrap items-center justify-center">
          <p className="w-full text-center text-2xl text-pb-green">Logo</p>
          {/*Login panel*/}
          <div className="flex h-screen w-full items-center justify-center">
            <div className="flex h-72 min-w-max flex-auto flex-col justify-between bg-pb-gray">
              <h1 className="w-full text-center">Connect with your buddies!</h1>
              <div className="flex items-center justify-center">
                <StravaLoginButton />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-screen flex-none basis-1/4"></div>
      </div>
    </>
  );
};

export default Login;
