"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { UserData } from "@/types/UserData.d";
import { getUserById } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

interface AccountContextType {
  userData: UserData | undefined;
}

const defaultContextValue: AccountContextType = {
  userData: undefined,
};

const AccountContext = createContext<AccountContextType>(defaultContextValue);

interface AccountContextProviderProps {
  children: ReactNode;
}

export function AccountContextProvider({
  children,
}: AccountContextProviderProps) {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const getUserData = async (userId: string) => {
    if (!userId) return;
    const userData: UserData = await getUserById(userId);
    setUserData(userData);
  };

  useEffect(() => {
    if (user) {
      getUserData(user.id);
    }
  }, [user]);

  const context: AccountContextType = {
    userData: userData,
  };

  return (
    <AccountContext.Provider value={context}>
      {children}
    </AccountContext.Provider>
  );
}

export const useAccountContext = () => useContext(AccountContext);

export default AccountContext;
