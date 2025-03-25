import { createContext, Dispatch, SetStateAction } from "react";


export const CollumnContext = createContext<[Map<string, boolean>, Dispatch<SetStateAction<Map<string, boolean>>>]>([new Map(), () => { }]);

