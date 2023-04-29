import {
  ILastNMonthsDistanceAvg,
  ILastNMonthsDistanceSum,
  ILastNWeeksDistanceSum,
} from '../internalTypes/Interfaces/Distance/distanceInterfaces';
import { ILastNWeeksPaceAvg } from '../internalTypes/Interfaces/Pace/paceInterfaces';

type DateSortable =
  | ILastNWeeksPaceAvg
  | ILastNMonthsDistanceAvg
  | ILastNMonthsDistanceSum
  | ILastNWeeksDistanceSum;

function getDate(item: DateSortable): Date {
  if ('week_start' in item) {
    return parseDate(item.week_start);
  } else if ('month_start' in item) {
    return parseDate(item.month_start);
  } else if ('week_start_date' in item) {
    return parseDate(item.week_start_date);
  }

  throw new Error('Unrecognized date property in item');
}

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year!, month! - 1, day);
}

/**
 * Sorts data by date in descending order
 * It works with the following interfaces:
 * - ILastNWeeksPaceAvg
 * - ILastNMonthsDistanceAvg
 * - ILastNMonthsDistanceSum
 * - ILastNWeeksDistanceSum
 * To add more interfaces, add them to the union type DateSortable in this file
 * @param data input data
 */
export function sortByDateDescending<T extends DateSortable>(data: T[]): T[] {
  return data.sort((a, b) => getDate(b).getTime() - getDate(a).getTime());
}
