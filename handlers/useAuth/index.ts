import { verifyJwtToken } from "@/app/lib/auth";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const COOKIE_NAME = "token";

export function useAuth() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getVerifiedToken = async () => {
      const cookies = new Cookies();
      const token = cookies.get(COOKIE_NAME) ?? null;
      if (token) {
        try {
          const isTokenValid = await verifyJwtToken(token);
          if (isTokenValid) {
            setAuth(true);
          }
        } catch (error) {
          console.error("Error al verificar el token:", error);
        }
      }
    };
    getVerifiedToken();
  }, []);

  return auth;
}
