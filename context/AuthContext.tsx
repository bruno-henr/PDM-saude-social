import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserData;
  isLoading: boolean;
  login: (token: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

export type UserData = {
  "id": string,
  "nome": string,
  "apelido": string,
  "crm": string,
  "email": string,
  "senha": string,
  "hospital": string,
  "imagem": any,
  "createdAt": string,
  "updatedAt": string,
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>({} as UserData);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      
      if (token && userData) {
        setUser(JSON.parse(userData))
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/signIn/page");
      }
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  const login = async (token: string, userData: any) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    router.replace("/(tabs)");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null as any);
    router.replace("/(auth)/signIn/page");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
