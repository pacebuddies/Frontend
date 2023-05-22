import { SportTypeEnum } from './sportTypeEnum';

/**
 * This class is used to map between the string and number values of the SportTypeEnum.
 */
export class SportTypeMap {
  private static stringToNumber = new Map<string, number>();
  private static numberToString = new Map<number, string>();

  static {
    const enumObject = SportTypeEnum;

    const sportTypeKeys: string[] = Object.keys(SportTypeEnum).filter((key) =>
      isNaN(Number(key)),
    );
    for (const item of sportTypeKeys) {
      const key = item!;

      const enumValue = Number(enumObject[key as keyof typeof enumObject]);
      console.log(`key: ${key}, enumValue: ${enumValue}`);
      SportTypeMap.stringToNumber.set(key.toUpperCase(), enumValue);
      SportTypeMap.numberToString.set(enumValue, key.toUpperCase());
    }
  }

  /**
   * Returns the string value of the SportTypeEnum for the given number.
   * @param num The number value of the SportTypeEnum.
   */
  public static getString(num: number): string | undefined {
    return SportTypeMap.numberToString.get(num);
  }

  /**
   * Returns the number value of the SportTypeEnum for the given string.
   * @param s The string value of the SportTypeEnum.
   */
  public static getNumber(s: string): number | undefined {
    s = s.toUpperCase();
    return SportTypeMap.stringToNumber.get(s);
  }
}
