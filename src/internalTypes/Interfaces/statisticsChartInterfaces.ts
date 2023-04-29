export interface ITimeIntervalSummary {
  avg_distance: number;
  total_distance: number;
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
