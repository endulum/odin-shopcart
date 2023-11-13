import getRandomItems from './getRandomItems';

describe('getting random items', () => {
  test('gets 1 item', () => {
    const items = getRandomItems(1);
    expect(items.length).toBe(1);
  });

  test('gets 10 items', () => {
    const items = getRandomItems(10);
    expect(items.length).toBeLessThanOrEqual(10);
  });

  test('handles possible duplicates (25 items)', () => {
    const items = getRandomItems(25);
    expect(items.length).toBeLessThanOrEqual(20);
  });

  test('handles possible duplicates (50 items)', () => {
    const items = getRandomItems(50);
    expect(items.length).toBeLessThanOrEqual(20);
  });
});
