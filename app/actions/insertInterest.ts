'use server'

export const insertInterest = async (interest: string, userId: string) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/${userId}/interests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ interest: interest }),
        });

        if (!res.ok) {
            throw new Error('Failed to insert interest');
        }
    } catch (error) {
        console.error('Error inserting interest:', error);
    }
};