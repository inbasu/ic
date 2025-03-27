import { createContext, Dispatch, SetStateAction } from "react";
import { Item } from "./schemas";


// main
export const LoadingContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>(false);
export const CollumnContext = createContext<[Map<string, boolean>, Dispatch<SetStateAction<Map<string, boolean>>>]>([new Map(), () => { }]);
export const ItemListContext = createContext<[Array<Item>, Dispatch<SetStateAction<Array<Item>>>]>([[], () => { }]);
export const QuerryContext = createContext<[string, Dispatch<SetStateAction<string>>]>(['', () => { }]);

// card
export const ItemContent = createContext<[Item, Dispatch<SetStateAction<Item | null>>]>([null, () => { }]);
