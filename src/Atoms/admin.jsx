import { UserIdAtom } from './userid';
import { atom } from 'jotai';

export const adminAtom = atom((get) => 

get(UserIdAtom) == 1);