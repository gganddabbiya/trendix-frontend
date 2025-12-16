"use client";

import { Interest, UserInfo } from "@/types/userInfo";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => void;
  email: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  interests?: Interest[];
  userId: string;
  setAvatarUrl?: (url: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  logout: () => { },
  email: "",
  name: "",
  avatarUrl: "",
  bio: "",
  interests: [],
  userId: "",
  setAvatarUrl: () => { },
});


export const AuthProvider = ({ children, initialUser }: { children: ReactNode; initialUser?: UserInfo | null }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialUser?.logged_in || false);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const [email, setEmail] = useState(initialUser?.account.email || "");
  const [name, setName] = useState(initialUser?.account.nickname || "");
  const [avatarUrl, setAvatarUrl] = useState(initialUser?.account.profile_image_url || "");
  const [bio, setBio] = useState(initialUser?.account.bio || "");
  const [interests, setInterests] = useState(initialUser?.interests || []);
  const [userId, setUserId] = useState(initialUser?.account.id || "");

  // Update state if initialUser changes (e.g. on navigation if layout re-fetches, though usually layout persists)
  useEffect(() => {
    if (initialUser) {
      setIsLoggedIn(initialUser.logged_in);
      setEmail(initialUser.account.email || "");
      setName(initialUser.account.nickname || "");
      setAvatarUrl(initialUser.account.profile_image_url || "");
      setBio(initialUser.account.bio || "");
      setIsLoading(false);
      setInterests(initialUser.interests || []);
      setUserId(initialUser.account.id || "");
    }
  }, [initialUser]);


  const logout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      method: "GET",
      credentials: "include",
    }).finally(() => {
      setIsLoggedIn(false);
      window.location.href = "/";
    });
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, logout, email, name, avatarUrl, bio, interests, userId, setAvatarUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
