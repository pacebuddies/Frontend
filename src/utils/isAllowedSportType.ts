//function for checking if the sport type is allowed

import { SportTypeEnum } from "../internalTypes/sportTypeEnum";
import { SportTypeMap } from "../internalTypes/SportTypeMap";

const allowedSportTypes = [
  SportTypeEnum.ALPINE_SKI,
  SportTypeEnum.BACKCOUNTRY_SKI,
  SportTypeEnum.CANOEING,
  SportTypeEnum.E_BIKE_RIDE,
  SportTypeEnum.E_MOUNTAIN_BIKE_RIDE,
  SportTypeEnum.GRAVEL_RIDE,
  SportTypeEnum.HANDCYCLE,
  SportTypeEnum.HIKE,
  SportTypeEnum.KAYAKING,
  SportTypeEnum.MOUNTAIN_BIKE_RIDE,
  SportTypeEnum.NORDIC_SKI,
  SportTypeEnum.RIDE,
  SportTypeEnum.ROLLER_SKI,
  SportTypeEnum.ROWING,
  SportTypeEnum.RUN,
  SportTypeEnum.SNOWBOARD,
  SportTypeEnum.SNOWSHOE,
  SportTypeEnum.STAND_UP_PADDLING,
  SportTypeEnum.TRAIL_RUN,
  SportTypeEnum.WALK,
];

export function isAllowedSportTypeNumber(sportType: number): boolean {
  return allowedSportTypes.includes(sportType);
}
export function isAllowedSportTypeString(sportType: string): boolean {
  const numberSportType = SportTypeMap.getNumber(sportType)!;
  return allowedSportTypes.includes(numberSportType);
}
