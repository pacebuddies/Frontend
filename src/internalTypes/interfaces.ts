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

export interface IActivityDaySummary {
  week_day: string;
  summary: number;
}

export interface IActivityDaySummaryResult {
  result: IActivityDaySummary[];
}

export interface IActivityWeekSummary {
  week: string;
  week_start_date: string;
  average_distance: number;
}

export interface IActivityWeekSummaryResult {
  result: IActivityWeekSummary[];
}

export interface ILastNActivitiesPaceAvg {
  id: string;
  avg_pace_per_km: number;
}

export interface ILastNActivitiesPaceAvgResult {
  result: ILastNActivitiesPaceAvg;
}

export interface ILastNMonthsDistanceSum {
  month_name: string;
  month_start: string;
  distance: number;
}

export interface ILastNMonthsDistanceSumResult {
  result: ILastNMonthsDistanceSum[];
}

export interface ILastNWeeksDistanceSum {
  week_start_date: string;
  total_distance: number;
}

export interface ILastNWeeksDistanceSumResult {
  result: ILastNWeeksDistanceSum[];
}

export interface ILastNWeeksPaceAvg {
  week_start: string;
  avg_pace_per_km: number;
}

export interface ILastNWeeksPaceAvgResult {
  result: ILastNWeeksPaceAvg[];
}

export interface ITimeIntervalSummary {
  avg_distance: number;
  total_distance: number;
}

export interface ITimeIntervalSummaryResult {
  result: ITimeIntervalSummary[];
}

export interface IWeekByDayDistanceSum {
  weeks: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

export interface IWeekByDayDistanceSumResult {
  result: IWeekByDayDistanceSum[];
}

export interface IYearSummary {
  activity_count: number;
  year: number;
  avg_distance: number;
  total_distance: number;
  avg_moving_time: number;
  total_moving_time: number;
  avg_pace: number;
  total_elev_high: number;
  total_distance_downhill: number;
  avg_activity_count_per_month: number;
  median_distance: number;
}

export interface IYearSummaryResult {
  result: IYearSummary[];
}