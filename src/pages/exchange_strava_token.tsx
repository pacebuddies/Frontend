import axios from 'axios';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';

const REACT_APP_CLIENT_ID = 97926;
const REACT_APP_CLIENT_SECRET = 'b311304ac9e469ccc742d359d6c9ddbeede1dd01';

export const testAuthGetter = async (code: string) => {
  try {
    // get auth-token from strava
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Exchange_strava_token: NextPage = () => {
  const router: NextRouter = useRouter();
  useEffect(() => {
    const query: ParsedUrlQuery = router.query;
    if (query['code'] != null) {
      const code: string = String(query['code']);

      const response = testAuthGetter(code);
      response
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // console.log(query);
  }, [router.query]);

  return (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default Exchange_strava_token;
