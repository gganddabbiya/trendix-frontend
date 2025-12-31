import { UserInfo } from '@/types/userInfo';
import { cookies } from 'next/headers'


export async function getCurrentUser(): Promise<UserInfo | null> {
  const cookieStore = await cookies()
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const statusRes = await fetch(`${apiBaseUrl}/authentication/status`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store'
    });

    if (!statusRes.ok) {
      console.error(`Auth status check failed: ${statusRes.status} ${statusRes.statusText}`);
      return null;
    }

    const statusResult = await statusRes.json();

    if (statusResult.logged_in === false) {
      return null;
    }

    const userInfoRes = await fetch(`${apiBaseUrl}/accounts/${statusResult.user_id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store'
    });

    if (!userInfoRes.ok) {
      const errorText = await userInfoRes.text();
      console.error(`Fetch user info failed: ${userInfoRes.status} ${userInfoRes.statusText} URL: ${apiBaseUrl}/accounts/${statusResult.user_id}`);
      console.error(`Error response body: ${errorText.substring(0, 200)}...`);
      return null;
    }

    const userInfoJson: UserInfo = await userInfoRes.json();
    userInfoJson.logged_in = true;

    return userInfoJson;
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
  return null;
}
