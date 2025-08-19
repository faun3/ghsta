// TODO: unit test this function
export function queryParamToValidIntegerValue(queryParam: string | null, defaultValue: number, max?: number): number {
  // no nulls
  if (!queryParam) {
    return defaultValue;
  }

  // no stuff that is not a number
  const queryParamAsNumber = Number(queryParam);
  if (isNaN(queryParamAsNumber) || !Number.isFinite(queryParamAsNumber) || !Number.isInteger(queryParamAsNumber)) {
    return defaultValue;
  }

  // no negative numbers
  if (queryParamAsNumber <= 0) {
    return defaultValue;
  }

  // no numbers larger than max
  if (max && queryParamAsNumber > max) {
    return max;
  }

  return queryParamAsNumber;
}
