import React, { useEffect, useState } from "react";
import { usePathname } from "expo-router";
import { userDetails } from "@/api/auth";
import ManageAccount from "@/components/accounts/manage-account";

const initialData: _IVerifyUser = {
  _id: "",
  email: "",
  first_name: null,
  user_image: null,
  last_name: null,
  phone_number: null,
  area: null,
  state: null,
  pincode: null,
};

const ManageAccountScreen = ({}) => {
  const url = usePathname();

  const [data, setData] = useState<_IVerifyUser>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true); // Set loading state to true while fetching
        const { data } = await userDetails(url ?? undefined);
        setData(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle errors appropriately (e.g., show an error message)
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchUserDetails(); // Call the function on component mount
  }, []);

  return <ManageAccount data={data} loading={loading} />;
};

export default ManageAccountScreen;
