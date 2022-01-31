// import { getAge } from '.';

import { getAge } from '.';
import { v } from './index.spec.util';

describe('getAge', () => {
  // difference: 2y7m12d11h3m50s
  const to = new Date('1963-11-23');
  const from = new Date('1961-04-11');
  const yrDiff = 2;
  const mnthDiff = 7;
  const dayDiff = 12;
  const hrDiff = 11;
  const minDiff = 3;
  const secDiff = 50;

  const {
    secondsPerSecond,
    secondsPerMinute,
    secondsPerHour,
    secondsPerDay,
    secondsPerMonth,
    secondsPerYear,
  } = getAge.defaults;

  const fromTrimSec = new Date(v(from) + 1_000 * secondsPerSecond * secDiff);
  const fromTrimMin = new Date(v(fromTrimSec) + 1_000 * secondsPerMinute * minDiff);
  const fromTrimHour = new Date(v(fromTrimMin) + 1_000 * secondsPerHour * hrDiff);
  const fromTrimDay = new Date(v(fromTrimHour) + 1_000 * secondsPerDay * dayDiff);
  const fromTrimMnth = new Date(v(fromTrimDay) + 1_000 * secondsPerMonth * mnthDiff);
  const fromTrimYr = new Date(v(fromTrimMnth) + 1_000 * secondsPerYear * yrDiff);

  describe('should work', () => {
    describe('level=1', () => {
      it('should expand', () => {
        const age = getAge(from, { now: to, levels: 1, });
        const expected = '2y';
        expect(age).toBe(expected);
      });
      it('should collapse', () => {
        //
      });
    });
    describe('level=2', () => {
      it('should expand', () => {
        const age = getAge(from, { now: to, levels: 2, });
        const expected = '2y7m';
        expect(age).toBe(expected);
      });
      it('should collapse', () => {
        // remove the year diff
        const age = getAge(fromTrimYr, { now: to, levels: 5, });
        const expected = '0s';
        expect(age).toBe(expected);
      });
    });
    describe('level=3', () => {
      it('should expand', () => {
        const age = getAge(from, { now: to, levels: 3, });
        const expected = '2y7m12d';
        expect(age).toBe(expected);
      });
      it('should collapse', () => {
        // remove the month diff
        const age = getAge(fromTrimMnth, { now: to, levels: 5, });
        const expected = '2y';
        expect(age).toBe(expected);
      });
    });
    describe('level=4', () => {
      it('should expand', () => {
        const age = getAge(from, { now: to, levels: 4, });
        const expected = '2y7m12d11h';
        expect(age).toBe(expected);
      });
      it('should collapse', () => {
        // remove the days diff
        const age = getAge(fromTrimDay, { now: to, levels: 5, });
        const expected = '2y7m';
        expect(age).toBe(expected);
      });
    });
    describe('level=5', () => {
      it('should expand', () => {
        const to = new Date('1963-11-23');
        const from = new Date('1961-04-11');
        const age = getAge(from, { now: to, levels: 5, });
        const expected = '2y7m12d11h3m';
        expect(age).toBe(expected);
      });
      it('should collapse', () => {
        // remove the hours diff
        const age = getAge(fromTrimHour, { now: to, levels: 5, });
        const expected = '2y7m12d';
        expect(age).toBe(expected);
      });
    });
    describe('level=6', () => {
      it('should expand', () => {
        const age = getAge(from, { now: to, levels: 6, });
        const expected = '2y7m12d11h3m50s';
        expect(age).toBe(expected);
      });
      it('should collapse', () => {
        // remove the minutes diff
        const age = getAge(fromTrimMin, { now: to, levels: 6, });
        const expected = '2y7m12d11h';
        expect(age).toBe(expected);
      });
    });
    describe('level=7', () => {
      it('should expand', () => {
        const age = getAge(from, { now: to, levels: 7, });
        const expected = '2y7m12d11h3m50s';
        expect(age).toBe(expected);
      });
      it('should collapse', () => {
        // remove the seconds diff
        const age = getAge(fromTrimSec, { now: to, levels: 7, });
        const expected = '2y7m12d11h3m';
        expect(age).toBe(expected);
      });
    });
  });
});