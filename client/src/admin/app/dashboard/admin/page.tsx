import { Title, Text } from "@tremor/react";
import Link from "next/link";
import Button from "@/app/ui/button";
import AddProfileImage from "@/app/ui/images";
import { dashboardRoutes } from "@/app/lib/routes";
import { verifyUser } from "@/app/lib/requests";
import NotFound from "./update/not-found";
import { EditProfileButton } from "@/app/ui/users/buttons";
import { bodyBg, cardsBg, textColor } from "@/app/ui/themes";
import { formatKey, formatTitles } from "@/app/lib/utils";
interface _IProfileCard {
  title: string;
  data: Record<string, string>;
}
interface _IProfileDataItem {
  [key: string]: {
    [key: string]: string;
  };
};

const ProfileCard = ({ title, data }: _IProfileCard) => {
  return (
    <section className={`mb-6`}>
      <Title className="text-lg font-semibold mb-2">
        {formatTitles(title)}
      </Title>

      <div className={`${bodyBg} rounded-md p-4 space-y-2`}>
        {Object.entries(data).map(([key, value]) => (
          <Text key={key} className={`${textColor}`}>
            {formatKey(key)}: {value}
          </Text>
        ))}
      </div>
    </section>
  );
};

const AdminProfile = async () => {
  const admin = (await verifyUser(true)) as _IEditUser;

  if (!admin) {
    <NotFound />;
  }
  const adminProfileData: _IProfileDataItem[] = [
    {
      PERSONAL_DETAILS: {
        FullName: admin.fullname ?? "John Doe",
        DateOfBirth: admin.createdAt ?? "January 1, 1990",
        Gender: "Male",
      },
      CONTACT_DETAILS: {
        Email: admin.email ?? "john.doe@example.com",
        Phone: admin.contact_no ?? "123-456-7890",
        Address: admin.area ?? "123 Main St, Cityville",
      },
    },
  ];

  return (
    <main
      className={`md:max-w-2xl -mx-2 rounded md:mx-auto mt-8 p-4 md:p-8 ${cardsBg}`}
    >
      <Title>{admin.email}'s Profile</Title>

      {/* Profile Image and Edit Profile button */}
      <div className="flex items-center justify-between my-6">
        <AddProfileImage />
        <EditProfileButton linkTo={dashboardRoutes.ADMIN.UPDATE} />
      </div>

      {adminProfileData.map((section, index) =>
        Object.keys(section).map((title) => (
          <ProfileCard key={index} title={title} data={section[title]} />
        ))
      )}

      {/* Change Password */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        {/* Add change password form or link to a change password page */}
        <Link className="text-blue-500 hover:underline" href="#">
          Change Password
        </Link>
      </section>

      {/* Logout button */}
      <div>
        <Button>Logout</Button>
      </div>
    </main>
  );
};

export default AdminProfile;
