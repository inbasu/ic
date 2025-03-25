

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
