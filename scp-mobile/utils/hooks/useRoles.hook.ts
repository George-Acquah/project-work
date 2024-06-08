import { useState, useEffect } from "react";
import { getUserType } from "../functions/async-storage";
import { UserType } from "../enums/global.enum";

const useRoles = () => {
  const [role, setRole] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Example usage
    const fetchUserType = async () => {
      setLoading(true);
      setRole(await getUserType()); // Retrieve userType
      setLoading(false);
    };
    fetchUserType();
  }, []);

  return { role, loading };
};

export default useRoles;
