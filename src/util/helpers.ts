export function wrapInArray<T>(value: T | T[] | undefined | null): T[] {
  return value != null ? (Array.isArray(value) ? value : [value]) : []
}

export function getLastValue<T>(anyArray: T[]): T {
  return anyArray[anyArray.length - 1]
}
