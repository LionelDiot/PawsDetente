import { atomWithStorage } from 'jotai/utils';

export const currentUserAtom = atomWithStorage('current-user-token', null);