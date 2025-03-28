type Value = {
    id: number | null;
    label: string;
}

type Field = {
    id: number;
    name: string;
    ref: string | null;
    values: Array<Value>;

}

export type Item = {
    id: number;
    label: string;
    attrs: Array<Field>;
}

// 
type ObjectType = {
    id: number;
    name: string;
}

export type Schema = {
    id: number;
    name: string;
    objectTypes: Array<ObjectType>;
}

export const insightSchemas: Array<Schema> = [
    { id: 1, name: "Inventory", objectTypes: [{ id: 8, name: "Hardware" }, { id: 78, name: "E-Requests" }] },
    { id: 12, name: "Invoice", objectTypes: [{ id: 261, name: "Boxes" }] },
]
