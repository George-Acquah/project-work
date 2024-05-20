import React, { Suspense } from "react";
import ParkingCenters from "../../ui/owner/parking-center";
import MapComp from "../../ui/shared/map";
import { bookingHistory, favoriteParkingCenters, testCenters, upcomingBookings } from "../../lib/dummy-data";
import { CardsSkeleton } from "@/app/ui/shared/skeletons";
import BookingsPage from "@/app/ui/driver/bookings";
import { fetchData } from "@/app/lib/data";

const DriverPage = async () => {
  const [upcomingBookingsData, bookingHistoryData, favoriteParkingCentersData] =
    await Promise.all([
      fetchData<_IBooking[]>(upcomingBookings, 300), 
      fetchData<_IBooking[]>(bookingHistory, 300), 
      fetchData<_IFavoriteParkingCenter[]>(favoriteParkingCenters, 300), 
    ]);
  
  console.log({ upcomingBookingsData, bookingHistoryData, favoriteParkingCentersData });
  
  return (
    <section className="space-y-8">
      <Suspense fallback={<CardsSkeleton />}>
        <MapComp centers={testCenters} highlighted_id="" />
      </Suspense>
      <ParkingCenters />
      <BookingsPage
        upcomingBookings={upcomingBookingsData}
        bookingHistory={bookingHistoryData}
        favoriteParkingCenters={favoriteParkingCentersData}
      />
    </section>
  );
};

export default DriverPage;
