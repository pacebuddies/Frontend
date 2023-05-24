import {
  FilterOffset,
  FilterSettings,
} from '../internalTypes/sportTypeFilterRanges';

/**
 * Compare the offset and settings objects to see if they are the same. Painful.
 * @param offset
 * @param settings
 */
export function compareOffsetAndSettings(
  offset: FilterOffset,
  settings: FilterSettings,
): boolean {
  return (
    offset.sport_type === settings.sport_type &&
    offset.city === settings.city &&
    offset.country === settings.country &&
    offset.avg_max_speed_min === settings.avg_max_speed_min &&
    offset.avg_max_speed_max === settings.avg_max_speed_max &&
    offset.avg_speed_min === settings.avg_speed_min &&
    offset.avg_speed_max === settings.avg_speed_max &&
    offset.avg_distance_min === settings.avg_distance_min &&
    offset.avg_distance_max === settings.avg_distance_max &&
    offset.avg_moving_time_min === settings.avg_moving_time_min &&
    offset.avg_moving_time_max === settings.avg_moving_time_max &&
    offset.avg_total_moving_time_min === settings.avg_total_moving_time_min &&
    offset.avg_total_moving_time_max === settings.avg_total_moving_time_max &&
    offset.avg_total_distance_min === settings.avg_total_distance_min &&
    offset.avg_total_distance_max === settings.avg_total_distance_max &&
    offset.avg_total_elevation_gain_min ===
      settings.avg_total_elevation_gain_min &&
    offset.avg_total_elevation_gain_max ===
      settings.avg_total_elevation_gain_max
  );
}
