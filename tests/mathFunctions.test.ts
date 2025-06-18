import { vi } from 'vitest';
import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest';
import { fetchUserData } from './api';


vi.mock('./api', () => ({
  fetchUserData: vi.fn(),
}));

describe('User API', () => {
  test('should fetch user data correctly', async () => {
    const mockUserData = { id: 1, name: 'John Doe' };
    (fetchUserData as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockUserData);

    const result = await fetchUserData(1);
    expect(result).toEqual(mockUserData);
  });
});

describe.each([
  [1, 2, 3],
  [2, 3, 5],
  [5, 5, 10],
])('Math Operations', (a, b, expected) => {
  test(`should add ${a} and ${b} to equal ${expected}`, () => {
    expect(a + b).toBe(expected);
  });
});
