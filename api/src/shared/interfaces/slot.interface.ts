import { _IVehicle } from './vehicles.interface';

interface _ISlot {
  id: string;
  type: string; // to be changed to enum depending on slot space;
  name: string;
  description: string;
  image: string | null;
  isAvailable: boolean;
  data: _ISlotData;
  reservation: any;
}

interface _ISlotData {
  total_daily_bookings: number;
  total_weekly_bookings: number;
  total_bookings: number;
  total_monthly_bookings: number;
  total_yearly_bookings: number;
}

interface _IParkingCenter {
  id: string;
  name: string;
  description: string;
  image: string | null;
  type: string; // to be changed into enum depending on slot spaces and total slots
  slots_info: _ISlotsInfo;
}

interface _ISlotsInfo {
  total_slots: number;
  available_slots: number;
  slots: _ISlot[];
}

interface _ISlotReservation {
  id: string;
  slot: _ISlot; // can contain details of parking center
  vehicle: _IVehicle; // can contain details of customer
  time_of_reservation: Date;
  wait_time: number;
  start_time: Date;
  end_time: Date; // to be calculated automatically
  duration_of_reservation: number; // in minutes, will probably be formatted to the client
  cost_of_reservation: number;
}

export { _ISlotReservation, _IParkingCenter };
