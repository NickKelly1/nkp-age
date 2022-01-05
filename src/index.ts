export interface TimeDelta {
  sign: '' | '+',
  years: number,
  months: number,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
}

export interface AgeOptions {
  /**
   * Comparison date
   */
  now?: Date;

  /**
   * Precision
   */
  levels?: number;
}

/**
 * defaults for usage with `@nkp/age` functions
 */
export const AGE_DEFAULTS = {
  SECONDS_PER_SECOND: 1,
  SECONDS_PER_MINUTE: 1 * 60,
  SECONDS_PER_HOUR  : 1 * 60 * 60,
  SECONDS_PER_DAY   : 1 * 60 * 60 * 24,
  // on average 30.437 days in a month
  SECONDS_PER_MONTH : 1 * 60 * 60 * 24 * 30.437,
  // SECONDS_PER_MONTH : 1 * 60 * 60 * 24 * 30,
  // on average 365.24 days in a year
  SECONDS_PER_YEAR  : 1 * 60 * 60 * 24 * 365.24,
  // SECONDS_PER_YEAR  : 1 * 60 * 60 * 24 * 365,

  DEFAULT_NOW: (): Date => new Date(),
  DEFAULT_LEVELS: 5,
};

/**
 * Get the ymdhms differences between two dates
 *
 * @param left  + date value
 * @param right - date value
 * @returns     difference between the two dates
 */
export function getTimeDelta(
  left: Date,
  right: Date,
): TimeDelta {
  const {
    SECONDS_PER_SECOND,
    SECONDS_PER_MINUTE,
    SECONDS_PER_HOUR,
    SECONDS_PER_DAY,
    SECONDS_PER_MONTH,
    SECONDS_PER_YEAR,
  } = AGE_DEFAULTS;

  const leftMs = left.valueOf();
  const rightMs = right.valueOf();
  let delta = Math.abs(leftMs - rightMs) / 1000;

  const years = Math.floor(delta / SECONDS_PER_YEAR);
  delta -= years * SECONDS_PER_YEAR;

  const months = Math.floor(delta / SECONDS_PER_MONTH);
  delta -= months * SECONDS_PER_MONTH;

  const days = Math.floor(delta / SECONDS_PER_DAY);
  delta -= days * SECONDS_PER_DAY;

  const hours = Math.floor(delta / SECONDS_PER_HOUR);
  delta -= hours * SECONDS_PER_HOUR;

  const minutes = Math.floor(delta / SECONDS_PER_MINUTE);
  delta -= minutes * SECONDS_PER_MINUTE;

  const seconds = Math.floor(delta / SECONDS_PER_SECOND);
  delta -= seconds * SECONDS_PER_SECOND;

  const timeDelta: TimeDelta = {
    sign: leftMs < rightMs ? '+' : '',
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };

  return timeDelta;
}


/**
 * Get the approximate age of the given date from now
 *
 * @param birth     date to find the age of
 * @param options
 * @returns         approximate age of the date
 *
 * @example
 * ```ts
 * '2y3m4d'
 * '2y4d1h'
 * '3y2m1s'
 * '17s'
 * ```
 */
export function getAge(
  birth: Date,
  options?: AgeOptions
): string {
  const now = options?.now ?? AGE_DEFAULTS.DEFAULT_NOW();
  const levels = options?.levels ?? AGE_DEFAULTS.DEFAULT_LEVELS;
  const delta = getTimeDelta(now, birth);
  let str = delta.sign;
  let cnt = 0;
  if (delta.years) {
    str += `${delta.years}y`;
    cnt += 1;
  }
  if (cnt >= levels) return str;
  if (delta.months) {
    str += `${delta.months}m`;
    cnt += 1;
  }
  if (cnt >= levels) return str;
  if (delta.days) {
    str += `${delta.days}d`;
    cnt += 1;
  }
  if (cnt >= levels) return str;
  if (delta.hours) {
    str += `${delta.hours}h`;
    cnt += 1;
  }
  if (cnt >= levels) return str;
  if (delta.minutes) {
    str += `${delta.minutes}m`;
    cnt += 1;
  }
  if (cnt >= levels) return str;
  str += `${delta.seconds}s`;
  return str;
}
