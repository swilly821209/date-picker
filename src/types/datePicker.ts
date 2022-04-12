export type MonthArray = { day: string; selected?: boolean }[]

export type DatePickerValue =
  | Date
  | string
  | (Date | string)[]
  | undefined
  | null

export type SingleDatePickerValue = Date | string | undefined | null
