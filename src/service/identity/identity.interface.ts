export interface VerificationResult {
  authenticatedUser: string;
  isAuthenticated: boolean;
}

export const unassignedUser = {
  id: 'Unassigned',
  displayName: 'Unassigned',
  firstName: 'Unassigned',
  lastName: undefined,
};

export const undefinedUser = {
  displayName: '',
  id: '',
  firstName: undefined,
  lastName: undefined,
};
