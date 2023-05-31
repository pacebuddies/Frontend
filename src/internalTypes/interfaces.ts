export interface ITotalAthlete {
  total_type: 'RUN' | 'RIDE' | 'SWIM';
  total_time_range: 'ALL' | 'RECENT' | 'YTD';
  achievement_count: number;
  count: number;
  distance: number;
  elapsed_time: number;
  elevation_gain: number;
  moving_time: number;
}

export interface IAthleteActivityStats {
  id: string;
  athlete_id: string;
  biggest_climb_elevation_gain: number;
  biggest_ride_distance: number;
  totals: ITotalAthlete[];
}
export interface IPolylineMap {
  id: string;
  polyline: string;
  summary_polyline: string;
}
export interface IActivity {
  average_speed: number;
  sport_type: string;
  description: string | null;
  distance: number;
  photos: IPhoto[];
  elev_high: number;
  elev_low: number;
  start_latlng: number[];
  end_latlng: number[];
  id: string;
  is_private: boolean;
  laps: ILap[];
  manual: boolean;
  map: IPolylineMap;
  max_speed: number;
  moving_time: number;
  name: string;
  start_date: number[];
  start_date_local: number[];
  timezone: string;
  total_elevation_gain: number;
  elapsed_time: number;
  kilojoules: number | null;
  average_watts: number | null;
  device_watts: boolean;
  max_watts: number;
  weighted_average_watts: number;
}

export interface IPhoto{
  unique_id: string
  uploaded_at: string
  created_at: string
  created_at_local: string
  urls: {
    2048: string
  }
}

export interface ILap {
  id: string;
  // TODO: wypełnić resztę pól
}

export interface IAthlete {
  activities: IActivity[];
  activity_stats: IAthleteActivityStats;
  city: string;
  clubs: string[];
  country: string;
  firstname: string;
  lastname: string;
  id: string;
  measurement_preference: UnitPreference | null;
  profile: string;
  sex: string;
  state: string;
}

export interface IActivityDaySummary {
  week_day: string;
  summary: number;
}

export interface IActivityWeekSummary {
  week: string;
  week_start_date: string;
  average_distance: number;
}

export type UnitPreference = 'metric' | 'imperial';

export enum MonthsNames {
  'January'=1,
  'February'=2,
  'March'=3,
  'April'=4,
  'May'=5,
  'June'=6,
  'July'=7,
  'August'=8,
  'September'=9,
  'October'=10,
  'November'=11,
  'December'=12,
}

export interface INotification {
  id: string;
  athlete: IAthlete;
  topic: string;
  title: string;
  photo: string;
  content: string;
  date_time: string;
  seen: boolean;
  action: string
  from_id: string
}