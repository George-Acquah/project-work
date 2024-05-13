"use server";

import { signIn, signOut } from "@/auth";
import { JWT } from "@auth/core/jwt";
import { API, fetcher } from "./data";
import { endpoints } from "./endpoints";
import { revalidatePath } from "next/cache";
import { dashboardRoutes } from "./routes";
import { redirect } from "next/navigation";
import {
  AdminSchema,
  CenterSchema,
  RequestReservationSchema,
  ReserveSlotSchema,
} from "./z-validations";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { clientCookiesKeys } from "./constants";

const UpdateAdmin = AdminSchema.omit({ id: true, username: true });
const CreateParkingCenter = CenterSchema.omit({ id: true });

// AUTHS
async function refreshToken(tokens: _ITokens): Promise<JWT> {
  const response = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: {
      authorization: `Refresh ${tokens.refresh_token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Your Session has Expired. Sign in again to continue.");
  }

  const res = await response.json();

  console.log('testing: ', tokens)
return {
  // ...tokens,
  user: res.data.user,
  tokens: res.data.tokens,
};

}

async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

async function signOutHelper() {
  await signOut();
}

export const getServerSideCookies = async (key: string) => {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get(key);
  const cookieValue = themeCookie?.value;

  return cookieValue;
};

export const setServerSideCookies = async (key: string, value: any) => {
  const cookieStore = cookies();
  cookieStore.set(key, value);
};

export const deleteServerSideCookies = async (key: string) => {
  const cookieStore = cookies();
  cookieStore.delete(key);
};

// END AUTHS

// ADD
async function addParkingCenter(
  prevState: _IValidationState,
  formData: FormData
) {
  const validatedFields = CreateParkingCenter.safeParse({
    owner: formData.get("owner"),
    center_name: formData.get("center_name"),
    description: formData.get("description"),
    address: formData.get("address"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    // image: formData.get('file'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to create this center",
    };
  }

  console.log(validatedFields.data);
  const { center_name, description, address, latitude, longitude } =
    validatedFields.data;

  // const url = `${endpoints.USERS.GET_SINGLE_USER}/${owner}`;
  const url = `${endpoints.PARKING_CENTER.ADD_CENTER}`;
  // try {
  //   await fetcher(url, "POST", "default", validatedFields.data);
  // } catch (error: any) {
  //   console.log(error.message);
  //   return {
  //     message: error.message,
  //   };
  // }

  revalidatePath(dashboardRoutes.PARKING_LOTS.BASE);
  redirect(dashboardRoutes.PARKING_LOTS.BASE);
}

async function addParkingCenterImages(
  prevState: _IValidationState,
  formData: FormData
) {
  console.log(formData.get("files"));
  const validatedFields = CreateParkingCenter.safeParse({});

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to create this center",
    };
  }
  revalidatePath(dashboardRoutes.PARKING_LOTS.BASE);
  redirect(dashboardRoutes.PARKING_LOTS.BASE);
}

async function addSlot() {}

async function addSlotImages() {}

async function addVehicle() {}

async function addVehicleImages() {}

async function requestReservation(
  {
    center_id,
    currentPage,
    pageSize,
  }: {
    center_id: string;
    currentPage: number;
    pageSize: number;
  },
  prevState: _IRequestReservationState,
  formData: FormData
) {
  const validatedFields = RequestReservationSchema.safeParse({
    start_time: formData.get("start_time"),
    reservation_duration: formData.get("duration"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Some fields failed validation. Failed to Update Your Details.",
    };
  }

  const { start_time, reservation_duration } = validatedFields.data;

  const url = `${endpoints.PARKING_CENTER.BASE}/${center_id}/available-slots`;

  const response = await fetcher<_ISlotPageWithSlots>(
    `${url}?currentPage=${currentPage}&size=${pageSize}`,
    "POST",
    "no-store",
    { start_time, reservation_duration }
  );

  response.statusCode === 200 &&
    response.data &&
    (await Promise.all([
      setServerSideCookies(clientCookiesKeys.REQUEST_RESERVATION, true),
      setServerSideCookies(
        clientCookiesKeys.REQUEST_RESERVATION_DATA,
        JSON.stringify(response.data.slots)
      ),
      setServerSideCookies(
        clientCookiesKeys.AVAILABLE_SLOTS_PAGES,
        response.data.totalPages
      ),
      setServerSideCookies(
        process.env.NEXT_PUBLIC_REQUEST_RESERVATION_PAYLOAD,
        JSON.stringify({ start_time, reservation_duration })
      ),
    ]));
;
  return {
    message: response.message,
    slots: response.data.slots,
    code: response.statusCode,
  };
}

async function reserveSlot(formData: FormData ) {
    const validatedFields = ReserveSlotSchema.safeParse({
      center_id: formData.get("center_id"),
      slot_id: formData.get("slot_id"),
      vehicle_id: formData.get("vehicle_id"),
      start_time: formData.get("start_time"),
      reservation_duration: formData.get("duration"),
      current_page: formData.get("current_page"),
      size: formData.get("size"),
    });

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message:
          "Some fields failed validation. Failed to Update Your Details.",
      };
    }

    const { start_time, reservation_duration, center_id, slot_id, vehicle_id, current_page, size } = validatedFields.data;

    const url = `${endpoints.PARKING_CENTER.BASE}/${center_id}/slots/${slot_id}/reserve-slot`;

    const response = await fetcher<_ISlotReservation>(
      `${url}?currentPage=${current_page}&size=${size}&vehicle_id=${vehicle_id}`,
      "POST",
      "no-store",
      { start_time, reservation_duration }
    );
  console.log(response)
  // response.statusCode === 200 &&
  //   response.data &&
  //   await Promise.all([
  //     deleteServerSideCookies(process.env.NEXT_PUBLIC_REQUEST_RESERVATION),
  //     deleteServerSideCookies(
  //       process.env.NEXT_PUBLIC_REQUEST_RESERVATION_DATA
  //     ),
  //     deleteServerSideCookies(
  //       process.env.NEXT_PUBLIC_AVAILABLE_SLOTS
  //     ),
  //     deleteServerSideCookies(
  //       process.env.NEXT_PUBLIC_REQUEST_RESERVATION_PAYLOAD
  //     ),
  //   ]);
    
  revalidatePath(
    `/parking-lots/${center_id}/slots/${slot_id}/successful-reservation?code=${response.data.reservationId}`
  );
  redirect(`/parking-lots/${center_id}/slots/${slot_id}/successful-reservation?code=${response.data.reservationId}`);
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

async function updateVehicle() {}

async function updateParkingcenter() {}

async function updateSlot() {}

export {
  authenticate,
  refreshToken,
  signOutHelper,
  addParkingCenter,
  addParkingCenterImages,
  addSlot,
  addSlotImages,
  addVehicle,
  addVehicleImages,
  updateUserProfile,
  updateParkingcenter,
  updateSlot,
  updateVehicle,
  requestReservation,
  reserveSlot,
};
