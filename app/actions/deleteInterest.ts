'use server'

export const deleteInterest = async (interest: string, userId: string) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/${userId}/interests/${interest}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            method: 'DELETE',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}