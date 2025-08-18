import { describe, it, expect } from 'vitest';
import { reldate } from './reldate';

describe('reldate', () => {
  it('should format less-than-hours as hours', () => {
    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
    const result = reldate(twoMinutesAgo);
    expect(result).toMatch('this hour');
  });

  it('should format hours', () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const result = reldate(twoHoursAgo);
    expect(result).toMatch('2 hours ago');
  });

  it('should format days', () => {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const result = reldate(threeDaysAgo);
    expect(result).toMatch('3 days ago');
  });

  it('should format weeks', () => {
    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000);
    const result = reldate(twoWeeksAgo);
    expect(result).toMatch('2 weeks ago');
  });

  it('should format months', () => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    const result = reldate(threeMonthsAgo);
    expect(result).toMatch('3 months ago');
  });

  it('should format years', () => {
    const now = new Date();
    const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);
    const result = reldate(twoYearsAgo);
    expect(typeof result).toBe('string');
    expect(result).toMatch('2 years ago');
  });

  it('should handle future dates', () => {
    const now = new Date();
    const inTwoHours = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const result = reldate(inTwoHours);
    expect(result).toMatch('in 2 hours');
  });
});
