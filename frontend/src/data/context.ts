import { createContext, Dispatch, SetStateAction } from "react";
import { Item } from "./schemas";


export const CollumnContext = createContext<[Map<string, boolean>, Dispatch<SetStateAction<Map<string, boolean>>>]>([new Map(), () => { }]);


export const ItemListContext = createContext<[Array<Item>, Dispatch<SetStateAction<Array<Item>>>]>([[], () => { }]);
