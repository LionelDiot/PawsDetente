import { currentUserAtom } from './currentuser';
import { atom } from 'jotai';

export const loggedInAtom = atom((get) => get(currentUserAtom) !== null);