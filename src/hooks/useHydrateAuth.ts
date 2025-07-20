// hooks/useHydrateAuth.ts
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { setUserDetails } from "@/redux/slices/auth/authSlice";
import { localStorageKeys, cookiesKey } from "@/constants/comman";
import Cookies from "js-cookie";

export const useHydrateAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const adminDetails = localStorage.getItem(localStorageKeys.userDetails);
    if (adminDetails) {
      try {
        const adminDetailsObj = JSON.parse(adminDetails);
        if (adminDetailsObj?.access_token) {
          dispatch(setUserDetails(adminDetailsObj));
          Cookies.set(cookiesKey.adminToken, adminDetailsObj.access_token, {
            secure: true,
            path: "/",
          });
        }
      } catch (err) {
        console.error("Failed to parse userDetails from localStorage", err);
      }
    }
  }, []);
};
