interface _ISafeUser {
  _id: string;
  email: string;
  userType: UserType;
  phone_number: string;
}

interface _ISafeReservations {
  customerMobileNumber: string;
  reservation_id: string;
}

declare namespace Express {
  interface Request {
    user: _ISafeUser; // Replace with your actual user type
    reservation?: _ISafeReservations;
  }
}
