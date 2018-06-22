// @flow


/**
* Function type defs.
*/

export type DispatchType = (action: () => mixed) => void;
export type EventHandlerType = (event: SyntheticInputEvent<HTMLInputElement>) => void | boolean;