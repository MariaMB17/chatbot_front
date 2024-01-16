"use client" ;
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { verifyJwtToken } from "@/app/lib/auth";
export function useAuth() {
  const [auth, setAuth] = React.useState(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") ?? null;
    const verifiedToken = token && await verifyJwtToken(token);
    setAuth(verifiedToken);
  };
  useEffect(() => {
    getVerifiedtoken();
  }, []);
  return auth;
}