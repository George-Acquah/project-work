"use server";

import { auth, signIn, signOut, unstable_update } from "@/auth";
import { JWT } from "@auth/core/jwt";
import { API, fetcher, refreshHeader } from "./data";
import { cookies } from "next/headers";
import { endpoints } from "./endpoints";
import { revalidatePath } from "next/cache";
import { dashboardRoutes } from "./routes";
import { RedirectType, permanentRedirect, redirect } from "next/navigation";
import { AdminSchema, ApplicantSchema } from "./z-validations";
import { clientCookiesKeys, clientCookiesValues } from "./constants";
import { AUTH_ERRORS } from "@/constants/errors.constants";
import AuthSchema from "@/schemas/auth.schema";
import UserSchema, { FullUserSchema } from "@/schemas/users.schema";

const UpdateApplicant = ApplicantSchema.omit({ id: true });
const UpdateUser = UserSchema.omit({ phone_number: true })
const Login = AuthSchema.omit({ phone_number: true });

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

  const res: _IApiResponse<_ITokens> = await response.json();
  const tokens = res.data;

  return {
    ...token,
    ...tokens,
  };
}

export async function expiredSession() {
  redirect(`/dashboard?${AUTH_ERRORS.SESSION}`);
}

// Function to handle user authentication
async function authenticate(prevState: ActionResult, payload: FormData) {
  try {
    const validatedFields = Login.safeParse(
      Object.fromEntries(payload.entries())
    );

    if (!validatedFields.success) {
      return {
        type: "error" as const,
        errors: validatedFields.error.flatten().fieldErrors,
      } satisfies ActionResult;
    }

    // Use NextAuth's signIn method to authenticate with credentials
    await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      ...validatedFields.data, // Spread the credentials into the signIn method
    });

    // On successful login, redirect to the dashboard or intended page
    permanentRedirect("/dashboard", RedirectType.replace);
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
      throw error; // Re-throw the redirect error
    } else {
      // Handle other errors here
      const errorUrl = AUTH_ERRORS.NEXTAUTH_ERROR_URL;
      redirect(errorUrl); // Redirect to a generic error page
    }
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
    const response = await fetcher(url, "DELETE");
    console.log(response);
    revalidatePath(dashboardRoutes.USERS.BASE);
    return response;
  } catch (error: any) {
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

async function testEmail() {
  const url = `mail`;
  try {
    const response = await fetcher(url, "POST");
    console.log(response);
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
  prevState: ActionResult,
  payload: FormData
) {
  console.log(payload);
  const validatedFields = FullUserSchema.safeParse(
    Object.fromEntries(payload.entries())
  );

  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      type: "error" as const,
      errors: validatedFields.error.flatten().fieldErrors,
      // errors: validatedFields.error.flatten().fieldErrors,
      // message: "Missing Fields. Failed to Update User.",
    } satisfies ActionResult;
  }
  const url = `${endpoints.USERS.GET_SINGLE_USER}/${id}`;
  try {
    await fetcher(url, "PUT", "no-cache", validatedFields.data);
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message,
    };
  }

  revalidatePath(dashboardRoutes.USERS.CUSTOMERS.BASE);
  redirect(dashboardRoutes.USERS.CUSTOMERS.BASE);
}

async function updateAdmin(id: string, prevState: any, formData: FormData) {
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

async function updateCenter(
  id: string,
  prevState: ActionResult,
  formData: FormData
) {
  console.log(formData);
  const validatedFields = UpdateApplicant.safeParse({
    userType: formData.get(""),
    isActive: formData.get("isActive"),
  });

  if (!validatedFields.success) {
    return {
      type: "error" as const,
      errors: validatedFields.error.flatten().fieldErrors,
    } satisfies ActionResult;
  }
  const url = `${endpoints.PARKING_CENTER.GET_PARKING_CENTER}/${id}`;
  try {
    await fetcher(url, "PUT", "no-cache", validatedFields.data);
  } catch (error: any) {
    console.log(error.message);
    return {
      message: error.message,
    };
  }

  revalidatePath(dashboardRoutes.USERS.CUSTOMERS.BASE);
  redirect(dashboardRoutes.USERS.CUSTOMERS.BASE);
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
  updateCenter,
  updateAdmin,
  testEmail,
};
