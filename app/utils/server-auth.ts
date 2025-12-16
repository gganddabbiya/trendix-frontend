import { UserInfo } from '@/types/userInfo';
import { cookies } from 'next/headers'


export async function getCurrentUser(): Promise<UserInfo | null> {
  const cookieStore = await cookies()
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/status`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store' // Ensure fresh data
    });

    if (res.ok) {
      const result = await res.json()


      if (result.logged_in === false) {
        return null;
      }

      const userInfo = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/${result.user_id}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: 'no-store' // Ensure fresh data
      });


      const userInfoJson: UserInfo = await userInfo.json()
      userInfoJson.logged_in = true;

      return userInfoJson;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
  return null;
}
