"use server";

import { signIn, signOut } from "@/auth";
import { JWT } from "@auth/core/jwt";
import { API, fetcher } from "./data";
import { cookies } from "next/headers";
import { endpoints } from "./endpoints";
import { revalidatePath } from "next/cache";
import { dashboardRoutes } from "./routes";
import { redirect } from "next/navigation";
import { AdminSchema, ApplicantSchema } from "./z-validations";
import { clientCookiesKeys, clientCookiesValues } from "./constants";

const UpdateApplicant = ApplicantSchema.omit({ id: true });

const UpdateAdmin = AdminSchema.omit({ id: true, username: true });

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
  console.log(formData);
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}

async function setLightCookies() {
  const cookieStore = cookies();
  cookieStore.set(
    clientCookiesKeys.THEME,
    clientCookiesValues.GLOBAL_LIGHT_THEME
  );
}

async function deleteUser(id: string) {
  const url = `${endpoints.USERS.DELETE_USER}/${id}`;
  try {
    const response = await fetcher( url, "DELETE" );
    revalidatePath(dashboardRoutes.USERS.BASE);
    return response;
  }
  catch (error: any) {
    console.log(error.message);
  }
}

async function deleteCustomer(id: string) {
  const url = `${endpoints.USERS.DELETE_USER}/${id}`;
  
  try {
    const response = await fetcher(url, "DELETE");
    revalidatePath(dashboardRoutes.USERS.CUSTOMERS.BASE);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
}

async function deleteOwner(id: string) {
  const url = `${endpoints.USERS.DELETE_USER}/${id}`;
  try {
    const response = await fetcher(url, "DELETE");
    revalidatePath(dashboardRoutes.USERS.OWNERS.BASE);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
}

async function updateUser(
  id: string,
  myrole: string,
  prevState: any,
  formData: FormData
) {
  const validatedFields = UpdateApplicant.safeParse({
    userType: myrole,
    isActive: formData.get("isActive"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update User.",
    };
  }
  const url = `${endpoints.USERS.GET_SINGLE_USER}/${id}`;
    try {
      await fetcher(url, "PUT", "no-cache", validatedFields.data);
    } catch (error: any) {
      console.log(error.message);
      return {
        message: error.message
      };
  }

  revalidatePath(dashboardRoutes.USERS.CUSTOMERS.BASE);
  redirect(dashboardRoutes.USERS.CUSTOMERS.BASE);
}

async function updateAdmin(
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

async function signOutHelper() {
  await signOut();
}

export {
  authenticate,
  refreshToken,
  signOutHelper,
  setLightCookies,
  deleteCustomer,
  deleteOwner,
  deleteUser,
  updateUser,
  updateAdmin,
};
