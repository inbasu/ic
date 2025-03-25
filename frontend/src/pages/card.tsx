import { useState } from "react"
import { Item } from "../data/schemas"






export default function ItemCard({ key, parentItem }: { key: string, item: Item | null }) {
    const [item, setItem] = useState<Item | null>(parentItem)

    if (!item) {
        console.log("Request item")
    }

    return (
        <>
        </>
    )
}
