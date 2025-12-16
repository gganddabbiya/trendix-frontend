'use server';

export const updateUserInfo = async (profile_image?: File | null, bio?: string, userId?: string) => {
    try {
        const formData = new FormData();

        // 프로필 이미지가 있으면 추가
        if (profile_image) {
            formData.append('profile_image', profile_image);
        }

        // bio 추가
        if (bio) {
            formData.append('bio', bio);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/${userId}`, {
            method: 'PATCH',
            headers: {
                // FormData 사용 시 Content-Type을 자동으로 설정하므로 헤더 제거
                // 'Content-Type': 'multipart/form-data' <- 이것도 명시하지 않아야 합니다
            },
            body: formData, // FormData 객체를 직접 전달
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error updating user info:', error);
        throw error;
    }
};