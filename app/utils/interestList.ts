import { InterestType } from "@/types/interestType";


export async function interestList() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ingestion/category_Tags`, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        method: 'GET',
    });
    const data = await res.json();

    const interestList: InterestType[] = data.items.filter((item: InterestType) => item.category !== 'uncategorized');

    return interestList;
}