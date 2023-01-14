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
  description: string | null;
  distance: number;
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
  measurement_preference: 'metric' | 'imperial' | null;
  profile: string;
  sex: string;
  state: string;
}
