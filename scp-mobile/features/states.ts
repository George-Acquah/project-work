import { tabData } from "@/constants/root";
import { _IAuthState, _IBookingState, _ICenters, _IMapState, _IPermission, _IResrvations, _IRootState, _IRoots, _ISlots, _IVehicles } from "./types";
import { Center_Filter } from "@/utils/enums/global.enum";

const rootState: _IRootState = {
  isLoading: false,
  error: null,
  message: null,
};

const rootInitialState: _IRoots = {
  ...rootState,
  showOnboarding: true,
  viewMap: false,
  nearbyMap: true,
  centersFilter: Center_Filter.AVAILABLE,
  slotsFilter: Center_Filter.AVAILABLE,
};

const authInitialState: _IAuthState = {
  ...rootState,
  isAuthenticated: false,
  exp: 0,
  tokens: null,
  user: null,
};

const bookingsInitialState: _IBookingState = {
  ...rootState,
  selectedTab: tabData[0],
  showDetailsModal: false,
  openMap: false,
  selectedBooking: null,
  upcomingBookings: [],
  bookingHistory: [],
  favoriteParkingCenters: [],
};

const centersInitialState: _ICenters = {
  ...rootState,
  fetchedCenter: null,
  selectedCenter: null,
  availableCenters: [],
  popularCenters: [],
  nearbyCenters: [],
  savedCenter: null,
  nearbyLoading: false,
  nearbyError: null,
  nearbyMessage: null,
  availableLoading: false,
  availableError: null,
  availableMessage: null,
};

const vehiclesInitialState: _IVehicles = {
  ...rootState,
  vehicles: []
};

const slotsInitialState: _ISlots = {
  ...rootState,
  fetchedSlot: null,
  selectedSlot: null,
  availableSlots: [],
  popularSlots: [],
  nearbySlot: [],
  savedSlot: null,
  nearbyLoading: false,
  nearbyError: null,
  nearbyMessage: null,
};

const initialReservationState: _IResrvations = {
  ...rootState,
  availableSlots: null,
  totalPages: null,
  reservedSlot: null,
  reservation_loading: false,
  reservation_error: null,
  start_time: new Date().toDateString(),
  duration: 0,
}

const permissionsInitialState: _IPermission = {
  ...rootState,
  currentLocation: null
}

const mapInitialState: _IMapState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  selected: null,
};

export {
  authInitialState, bookingsInitialState, mapInitialState, centersInitialState, permissionsInitialState, slotsInitialState, initialReservationState, vehiclesInitialState, rootInitialState
};
