import { useCallback, useSyncExternalStore } from "react";
import {
  getStoredUserType,
  hasUserTypeAccess,
  isAuthenticated,
  subscribeToStoredUserType,
  type UserType,
} from "@/shared/lib/auth";

function getUserTypeSnapshot(): UserType {
  return getStoredUserType();
}

export function usePermissions() {
  const userType = useSyncExternalStore(
    subscribeToStoredUserType,
    getUserTypeSnapshot,
    getUserTypeSnapshot,
  );

  const canAccessUserTypes = useCallback(
    (allowedUserTypes?: readonly UserType[]) => hasUserTypeAccess(allowedUserTypes, userType),
    [userType],
  );

  return {
    userType,
    isAuthenticated: isAuthenticated(),
    isClient: userType === "client",
    isVendor: userType === "vendor",
    canAccessUserTypes,
  };
}