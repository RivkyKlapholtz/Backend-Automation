export async function fetchUserData(userId: number): Promise<{ id: number; name: string }> {
  // This is a mock implementation; replace with actual API call if needed
  return { id: userId, name: 'Mock User' };
}