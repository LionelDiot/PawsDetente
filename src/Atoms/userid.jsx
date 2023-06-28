import { atomWithStorage } from 'jotai/utils';

export const UserIdAtom = atomWithStorage('current-user-id', 0);