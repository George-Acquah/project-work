export interface _IFormattedReservation {
  [key: string]: string | number | null;
  _id: string;
  slot_name: string;
  driver_name: string;
  image: string | null;
  wait_time: number;
  time_reserved: string;
  start_time: string;
  end_time: string;
  vehicle_no: string;
  duration: number;
  cost: number;
  status: string;
}

export interface _IDbSlotReservationNew extends Document {
  vehicle_no: string;
}
