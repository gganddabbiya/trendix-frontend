
export interface Account {
    id: string;
    email: string;
    nickname: string;
    bio: string;
    profile_image_url: string;
    created_at: string;
    updated_at: string;
}

export interface Interest {
    id: string;
    interest: string;
    created_at: string;
}

export interface UserInfo {

    account: Account;
    interests: Interest[];
    logged_in: boolean;
}
