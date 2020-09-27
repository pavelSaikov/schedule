import { Moment } from 'moment-timezone';

export const calculateDisabledTime = (
  baseDate: Moment,
  someDate: Moment,
): { disabledHours: () => number[] } => ({
  disabledHours: () => {
    if (
      baseDate.date() === someDate.date() &&
      baseDate.month() === someDate.month() &&
      baseDate.year() === someDate.year()
    ) {
      return Array.from({ length: baseDate.hour() + 1 }, (_i, k) => k);
    }

    return [];
  },
});

export const calculateDisableDate = (baseDate: Moment, someDate: Moment): boolean => {
  if (baseDate.year() > someDate.year()) return true;
  if (baseDate.month() > someDate.month() && baseDate.year() === someDate.year()) return true;
  if (
    baseDate.date() > someDate.date() &&
    baseDate.month() === someDate.month() &&
    baseDate.year() === someDate.year()
  ) {
    return true;
  }

  return false;
};
