// @flow

import type { ActionCreator } from './action';

/**
* Function type defs.
*/

export type DispatchType = (action: any) => void;
export type EventHandlerType = (event: SyntheticInputEvent<HTMLInputElement>) => void | boolean;