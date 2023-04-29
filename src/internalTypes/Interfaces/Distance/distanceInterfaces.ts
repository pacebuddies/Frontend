export interface ILastNMonthsDistanceSum {
  month_name: string;
  month_start: string;
  distance: number;
}

export interface ILastNWeeksDistanceSum {
  week_start_date: string;
  total_distance: number;
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

export interface ILastNMonthsDistanceAvg {
  distance: number;
  month_name: string;
  month_start: string;
}
