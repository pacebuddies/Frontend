import axios, { AxiosError, AxiosResponse } from 'axios';
import { stravaApi } from './strava.api';
export interface Equipment {
  id: string;
  primary: boolean;
  name: string;
  resource_state: number;
  distance: number;
}
export interface AthleteBase {
  id: number;
  resource_state: number;
}

export type StravaAthlete = AthleteBase & {
  username: string;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
  friend: any;
  follower: any;
  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;
  athlete_type: number;
  date_preference: string;
  measurement_preference: string;
  clubs: any[];
  ftp: unknown;
  weight: number;
  bikes: Equipment[];
  shoes: Equipment[];
};

export interface IStravaSession {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: StravaAthlete;
}

export interface IAuthenticateStravaResponse {
  stravaSession?: IStravaSession | undefined;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}
export const isSuccessfulResponse = (response: AxiosResponse): boolean => {
  return (
    // Ok
    response.status === 200 ||
    // Created
    response.status === 201 ||
    // Accepted
    response.status === 202 ||
    // Partial Info
    response.status === 203 ||
    // No content
    response.status === 204
  );
};

export const setObject = (key: string, value: any, useLocal: boolean): any =>
  useLocal
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);

export const getString = (key: string): any => {
  let s = localStorage.getItem(key);
  if (!s) {
    s = sessionStorage.getItem(key);
  }

  return s;
};

export const getObject = <T,>(key: string): T | undefined => {
  let s = localStorage.getItem(key);
  if (!s) {
    s = sessionStorage.getItem(key);
  }

  if (!s) return undefined;
  const obj = JSON.parse(s);
  return obj as T;
};

export const isAuthorized = (): boolean => {
  const stravaSession = getObject<IStravaSession>('strava_session');
  if (!stravaSession) return false;
  const now: number = Math.round(+new Date() / 1000);
  return now < stravaSession.expires_at;
};

export const authenticateWithStrava = async (
  code?: string,
): Promise<IAuthenticateStravaResponse> => {
  try {
    const session = getObject<IStravaSession>('strava_session');
    if (!code) {
      if (isAuthorized()) {
        return {
          isSuccessful: true,
          stravaSession: session,
        };
      }
    }

    const clientId = 97926;
    const clientSecret = 'b311304ac9e469ccc742d359d6c9ddbeede1dd01';
    const grantType = code ? 'authorization_code' : 'refresh_token';

    let stravaEndPoint = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`;

    if (grantType === 'authorization_code' && code) {
      stravaEndPoint = `${stravaEndPoint}&code=${code}`;
    } else if (grantType === 'refresh_token' && session?.refresh_token) {
      stravaEndPoint = `${stravaEndPoint}&refresh_token=${session.refresh_token}`;
    } else {
      return {
        error: new Error('Authentication failed'),
        isSuccessful: false,
      };
    }

    const response: AxiosResponse<unknown> = await stravaApi.post(
      stravaEndPoint,
      null,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    if (isSuccessfulResponse(response)) {
      const data = response.data as IStravaSession;

      setObject('strava_session', JSON.stringify(data), true);
      if (data.athlete) {
        setObject('strava_athlete', JSON.stringify(data.athlete), true);
      }

      return {
        isSuccessful: true,
        stravaSession: data,
      };
    }

    return {
      isSuccessful: false,
      error: new Error('Authentication failed'),
    };
  } catch (error) {
    return {
      isSuccessful: false,
      error: axios.isAxiosError(error)
        ? error
        : new Error('Authentication failed'),
    };
  }
};
