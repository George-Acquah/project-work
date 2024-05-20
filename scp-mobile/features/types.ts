interface _IRootState {
  isLoading: boolean;
  message: string | null;
  error: string | null;
}

interface _IPermission extends _IRootState {
  currentLocation: _IDestination | null
}
interface _IAuthState extends _IRootState {
  isAuthenticated: boolean | null;
  exp: number;
  tokens: _ITokens | null;
  user: {
    id: string;
    role: string;
  } | null;
}

interface _IBookingState extends _IRootState{
  selectedTab: string;
  showDetailsModal: boolean;
  openMap: boolean;
  selectedBooking: _IBooking | _IFavoriteParkingCenter | null;
  upcomingBookings: _IBooking[] | null;
  bookingHistory: _IBooking[] | null;
  favoriteParkingCenters?: _IFavoriteParkingCenter[] | null;
}

interface _ICenters extends _IRootState {
  popularCenters: _IParkingCenter[];
  nearbyCenters: _IParkingCenter[];
  availableCenters: _IParkingCenter[];
  fetchedCenter: _IParkingCenter | null;
  selectedCenter: _IParkingCenter | null;
  savedCenter: number | null;
  nearbyLoading: boolean;
  nearbyError: string | null;
  nearbyMessage: string | null;
  availableLoading: boolean;
  availableError: string | null;
  availableMessage: string | null;
}

interface _IVehicles extends _IRootState {
  vehicles: _IVehicle[];
}
interface _ISlots extends _IRootState {
  popularSlots: _ISlot[];
  nearbySlot: _ISlot[];
  filteredSlots: _ISlot[];
  fetchedSlot: _ISlot | null;
  selectedSlot: string | null;
  savedSlot: number | null;
  nearbyLoading: boolean;
  nearbyError: string | null;
  nearbyMessage: string | null;
}

interface _IResrvations extends _IRootState {
  availableSlots: _ISlot[] | null;
  reservedSlot: _ISlotReservation | null;
  reservation_loading: boolean;
  reservation_error: string | null;
  start_time: string;
  duration: number;
}

interface _IMapState {
  origin: _IDestination | null;
  destination: _IDestination | null;
  travelTimeInformation: string | null;
  selected: _ITestCenters | null;
  // mapRef: React.MutableRefObject<BottomSheetModal>;
}

export { _IAuthState, _IBookingState, _IMapState, _ICenters, _IRootState, _IPermission, _ISlots, _IResrvations, _IVehicles };
