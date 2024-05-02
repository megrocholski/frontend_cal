import { UserBack, UserData } from "@/app/interfaces/User";
import { api } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useState } from "react";

export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProps {
  signIn: (data: SignInData) => Promise<void | string>;
  user: UserData | null;
  setUser: (data: UserData) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

interface SignInData {
  username: string;
  password: string;
}

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  async function signIn({ username, password }: SignInData) {
    let users = await api.post("/login", {
      username,
      password,
    });

    if (users) {
      if (users.data.error) {
        return users.data.error;
      } else {
        var decoded: UserBack = jwtDecode(users.data);
        let aux: UserData = {
          name: decoded.name,
          idUser: decoded.idUser,
          username: decoded.username,
        };

        setCookie(undefined, "cal.token", users.data, {
          maxAge: 60 * 60 * 730000,
        });
        api.defaults.headers["Authorization"] = `Bearer ${users.data}`;

        setAuthenticated(true);

        setUser(aux);
        router.push("/home");
        return user;
      }
    }
  }

  function logout() {
    const { "cal.token": token } = parseCookies();

    setCookie(undefined, "cal.token", "", {
      maxAge: 0,
    });

    destroyCookie(undefined, "cal.token");
    setAuthenticated(false);

    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
