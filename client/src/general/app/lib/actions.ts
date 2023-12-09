"use server";

import { signIn, signOut } from "@/auth";
import { JWT } from "@auth/core/jwt";
import { API, fetcher } from "./data";
import { endpoints } from "./endpoints";
import { revalidatePath } from "next/cache";
import { dashboardRoutes } from "./routes";
import { redirect } from "next/navigation";
import { AdminSchema } from "./z-validations";

const UpdateAdmin = AdminSchema.omit({ id: true, username: true });


// AUTHS
async function refreshToken(token: JWT): Promise<JWT> {
  const response = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.tokens.refresh_token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Your Session has Expired. Sign in again to continue.");
  }

  const res: _ITokens = await response.json();

  return {
    ...token,
    ...res,
  };
}

async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}

async function signOutHelper() {
  await signOut();
}

// END AUTHS

// ADD 
async function addParkingCenter() {

}

async function addParkingCenterImages() {

}

async function addSlot() {

}

async function addSlotImages() {

}

async function addVehicle() {

}

async function addVehicleImages() {

}
// END ADD

// UPDATES
async function updateUserProfile(
  id: string,
  prevState: any,
  formData: FormData
) {
  console.log(formData);
  const validatedFields = UpdateAdmin.safeParse({
    email: formData.get("email"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    contact_no: formData.get("contact_no"),
    area: formData.get("area"),
    city: formData.get("city"),
    state: formData.get("state"),
    pinCode: formData.get("pinCode"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Some fields failed validation. Failed to Update Your Details.",
    };
  }

  console.log(validatedFields.data);

  const url = `${endpoints.USERS.GET_SINGLE_USER}/${id}`;
  try {
    await fetcher(url, "PUT", "no-cache", validatedFields.data);
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message,
    };
  }

  revalidatePath(dashboardRoutes.ADMIN.BASE);
  redirect(dashboardRoutes.ADMIN.BASE);
}

async function updateVehicle() {

}

async function updateParkingcenter() {

}

async function updateSlot() {
  
}

export {
  authenticate,
  refreshToken,
  signOutHelper,
  updateUserProfile,
  addParkingCenter,
  addParkingCenterImages,
  addSlot,
  addSlotImages,
  addVehicle,
  addVehicleImages,
};
