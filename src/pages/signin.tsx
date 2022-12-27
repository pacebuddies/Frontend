import { PublicProvider } from 'next-auth/core/routes/providers';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';

export default function SignIn(providers: PublicProvider) {
  // useEffect(() => {
  //   providers.map((prov ) => console.log(prov))
  // })
  // Object.values(providers).map((provider) => {
  //   // let array = Object.getOwnPropertyNames(provider.strava);
  //   // console.log(array);
  //   Object.values(provider).map((prov) => console.log(prov));
  // console.log(provider.strava.id)});
  // });

  //TODO: Make mapping more general
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.strava.id}>
          <button onClick={() => signIn(provider.strava.id)}>
            Sign in with {provider.strava.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null = await getProviders();
  return {
    props: { providers: providers },
  };
}
