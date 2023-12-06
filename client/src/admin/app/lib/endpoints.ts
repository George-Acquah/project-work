const endpoints = {
  AUTH: {
    REGISTER_CUSTOMER: "auth/users/customer",
    REGISTER_OWNER: "auth/users/owner",
    REGISTER_ADMIN: "auth/users/admin",
    LOGIN: "auth/login",
    REFRESH: "auth/refresh",
  },
  USERS: {
    SET_IMAGE: "users/set-image",
    VERIFY_USER: "users/me",
    GET_FILTERED_USERS: "users/admin",
    GET_SINGLE_USER: "users",
    GET_USERS_PAGE: "users/admin/total-pages",
    GET_LATEST_USERS: "users/admin/latest",
    GET_ALL_ROLES: "users/admin/roles",
    DELETE_USER: "users/admin",
  },
  VEHICLES: {
    GET_ALL_VEHICLES: "customer/vehicle",
    GET_DRIVER_VEHICLES: "customer/vehicle/driver",
    GET_SINGLE_VEHICLE: "customer/vehicle/:id",
    ADD_VEHICLE: "customer/vehicle/add",
  },
  PARKING_CENTER: {
    ADD_CENTER: "owner/parking-center",
    GET_ALL_PARKING_CENTERS: "owner/parking-center",
    GET_AVAILABLE_PARKING_CENTERS: "owner/parking-center/available",
    GET_ALL_SLOTS: "owner/parking-center/slots",
    UPDATE_CENTER: "owner/parking-center",
    ADD_SLOT: "owner/parking-center/add-slot/:center_id",
    UPDATE_SLOT: "owner/parking-center/update-slot",
    ADD_CENTER_IMAGE: "owner/parking-center/add-center-image/:center_id",
    ADD_SLOT_IMAGE: "owner/parking-center/add-slot-image/:slot_id",
    ADD_SLOT_DATA: "owner/parking-center/add-slot-data",
    UPDATE_SLOT_DATA: "owner/parking-center/update-slot-data",
    GET_PARKING_CENTER: "owner/parking-center/:center_id",
    GET_CENTER_IMAGES: "owner/parking-center/:center_id/images",
    GET_SLOTS_FOR_CENTER: "owner/parking-center/:center_id/slots",
    GET_SLOT_DETAILS: "owner/parking-center/:center_id/slots/:slot_id",
    GET_SLOT_BOOKINGS:
      "owner/parking-center/:center_id/slots/:slot_id/bookings",
    GET_SLOT_DATA: "owner/parking-center/:center_id/slots/:slot_id/data",
    GET_SLOT_IMAGES: "owner/parking-center/:center_id/slots/:slot_id/images",
  },
};

export { endpoints };
