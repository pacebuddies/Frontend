export interface FilterSettingsModel {
  sport_type: number;
  city: string;
  country: string;
  avg_max_speed_min: number;
  avg_max_speed_max: number;
  avg_speed_min: number;
  avg_speed_max: number;
  avg_distance_min: number;
  avg_distance_max: number;
  avg_moving_time_min: number;
  avg_moving_time_max: number;
  avg_total_moving_time_min: number;
  avg_total_moving_time_max: number;
  avg_total_distance_min: number;
  avg_total_distance_max: number;
  avg_total_elevation_gain_min: number;
  avg_total_elevation_gain_max: number;
  empty: boolean;
}

export interface FilterOffset {
  id: number;
  athlete_id: string;
  sport_type: number;
  city: string;
  country: string;
  avg_max_speed_min: number;
  avg_max_speed_max: number;
  avg_speed_min: number;
  avg_speed_max: number;
  avg_distance_min: number;
  avg_distance_max: number;
  avg_moving_time_min: number;
  avg_moving_time_max: number;
  avg_total_moving_time_min: number;
  avg_total_moving_time_max: number;
  avg_total_distance_min: number;
  avg_total_distance_max: number;
  avg_total_elevation_gain_min: number;
  avg_total_elevation_gain_max: number;
}

export interface SportTypeFilterRanges {
  filter_settings_model: FilterSettingsModel;
  filter_offset: FilterOffset;
}
