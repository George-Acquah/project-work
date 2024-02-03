import React from "react";
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid"; // Use appropriate Heroicons
import { cardsBg } from "@/app/ui/shared/themes";
import Button from "../shared/button";

interface _IBookingCardProps {
  booking: _IBooking | _IFavoriteParkingCenter;
  onViewDetails: () => void;
  onBookNow?: () => void;
}
const BookingCard = ({ booking, onViewDetails, onBookNow }: _IBookingCardProps) => {
  return (
    <div
      className={`flex flex-col ${cardsBg} wow fadeInUp hover:shadow dark:hover:shadow-gray-dark group overflow-hidden p-4 rounded-sm shadow-one duration-300`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{booking.parkingCenterName}</h3>
        <span className="text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {booking.location}
        </span>
      </div>
      {"dateTime" in booking && "status" in booking && (
        <>
          <div className="flex items-center mb-2 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            <ClockIcon className="h-5 w-5" />
            <span className="ml-2 ">{booking.dateTime}</span>
          </div>
          <div
            className={`flex items-center mb-2 text-base font-medium dark:border-white dark:border-opacity-10 ${
              booking.status === "Pending" ? "text-[#FDE047]" : "text-green-500"
            }`}
          >
            <StarIcon className={`"h-5 w-5  `} />
            <span className="ml-2">{booking.status}</span>
          </div>
        </>
      )}
      {/* Move the button container to the bottom */}
      <div className="mt-auto flex justify-between items-center gap-x-4">
        {/* <Button variant="outline" className="bg-transparent" onClick={onViewDetails}>
          Cancel
        </Button> */}
        <Button variant="outline" className="" onClick={onViewDetails}>
          View Details
        </Button>

        {onBookNow && (
          <Button className="" onClick={onBookNow}>
            Book Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
