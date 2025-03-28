import { createContext, Dispatch, SetStateAction } from "react";
import { Item, Schema } from "./schemas";


// main
export const LoadingContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([false, () => { }]);
export const CollumnContext = createContext<[Map<string, boolean>, Dispatch<SetStateAction<Map<string, boolean>>>]>([new Map(), () => { }]);
export const ItemListContext = createContext<[Array<Item>, Dispatch<SetStateAction<Array<Item>>>]>([[], () => { }]);
export const QuerryContext = createContext<[string, Dispatch<SetStateAction<string>>]>(['', () => { }]);

// card
export const ItemContent = createContext<[Item | null, Dispatch<SetStateAction<Item | null>>]>([null, () => { }]);

// search context
export const SchemeContext = createContext<[Schema | null, Dispatch<SetStateAction<Schema | null>>]>([null, () => { }]);
export const ObjectTypeIdContext = createContext<[number | null, Dispatch<SetStateAction<number | null>>]>([null, () => { }]);
