interface _IPayload {
  username: string;
  sub: {
    name: string;
  };
}

interface _IReservationPayload {
  slot_id: string;
  vehicle_id: string;
  sub: {
    reservation_id: string;
  };
}

interface _IReservationsPayloadRequest {
  slot_id: string;
  vehicle_id: string;
  reservation_id: string;
}

interface _ITokens {
  access_token: string;
  u_id: string;
  refresh_token: string;
  expiresIn: number;
}

export {
  _IPayload,
  _IReservationPayload,
  _ITokens,
  _IReservationsPayloadRequest,
};
