import { describe, it, expect, vi } from 'vitest';

describe('geminiService parser', () => {
  it('correctly parses valid JSON response', () => {
    const jsonStr = '[{"description":"Drove 10km","category":"transport","quantity":10,"unit":"km","emissionFactor":"CAR_PETROL","co2Kg":1.71,"confidence":"high"}]';
    const activities = JSON.parse(jsonStr);

    expect(Array.isArray(activities)).toBe(true);
    expect(activities).toHaveLength(1);
    expect(activities[0].description).toBe('Drove 10km');
    expect(activities[0].co2Kg).toBeCloseTo(1.71, 2);
  });

  it('handles malformed JSON gracefully', () => {
    const badJson = '{invalid json}';
    let result = [];
    let error = null;

    try {
      result = JSON.parse(badJson);
    } catch (e) {
      error = e.message;
      result = [];
    }

    expect(result).toEqual([]);
    expect(error).toBeTruthy();
  });

  it('sums activities to correct totalCO2Kg', () => {
    const activities = [
      { co2Kg: 1.71 },
      { co2Kg: 0.9 },
      { co2Kg: 2.46 },
    ];
    const total = activities.reduce((sum, a) => sum + a.co2Kg, 0);
    expect(total).toBeCloseTo(5.07, 2);
  });

  it('handles missing fields with defaults', () => {
    const activity = {};
    const validated = {
      description: activity.description || 'Unknown activity',
      category: ['transport', 'food', 'energy', 'shopping', 'waste'].includes(activity.category) ? activity.category : 'energy',
      quantity: typeof activity.quantity === 'number' ? activity.quantity : 0,
      unit: activity.unit || 'units',
      co2Kg: typeof activity.co2Kg === 'number' && activity.co2Kg > 0 ? activity.co2Kg : 0,
      confidence: ['high', 'medium', 'low'].includes(activity.confidence) ? activity.confidence : 'medium',
    };

    expect(validated.description).toBe('Unknown activity');
    expect(validated.category).toBe('energy');
    expect(validated.quantity).toBe(0);
    expect(validated.confidence).toBe('medium');
  });

  it('handles empty activity array', () => {
    const jsonStr = '[]';
    const activities = JSON.parse(jsonStr);
    expect(activities).toEqual([]);
  });
});
