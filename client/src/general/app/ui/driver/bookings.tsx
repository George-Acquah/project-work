"use client";
import React, { useState } from "react";
import BookingCard from "./booking-cards"; // Assume a separate component for booking card
import { Tab } from "@headlessui/react";
import Modal from "@/app/auth-modal";
import Button from "../shared/button";
import { ClockIcon, MapIcon, StarIcon } from "@heroicons/react/24/outline";
import MapComp from "../shared/map";

interface _IBookingCompProps {
  upcomingBookings: _IBooking[];
  bookingHistory: _IBooking[];
  favoriteParkingCenters: _IFavoriteParkingCenter[];
}

const BookingsPage = ({
  upcomingBookings,
  bookingHistory,
  favoriteParkingCenters,
}: _IBookingCompProps) => {
  const [activeTab, setActiveTab] = useState("upcoming"); // State to manage active tab
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State to control details modal
  const [openMap, setOpenMap] = useState(false); // State to control details modal
  const [selectedBooking, setSelectedBooking] = useState<
    _IBooking | _IFavoriteParkingCenter | null
  >(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

const handleOpenMap = () => {
  setOpenMap(true);
  };
  
  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const handleShowDetailsModal = (
    booking: _IBooking | _IFavoriteParkingCenter
  ) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
    setOpenMap(false);
  };

  const renderBookingCards = (bookings: _IBooking[]) => {
    return (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
        {bookings.map((booking, i) => (
          <BookingCard
            key={i}
            booking={booking}
            onViewDetails={() => handleShowDetailsModal(booking)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-green-900/5 rounded-md">
          <Tab
            key="upcoming"
            className={({ selected }) =>
              `flex-1 py-2.5 text-center rounded ${
                selected
                  ? "bg-green-900 text-white"
                  : "text-green-700 hover:bg-green-800 hover:text-white"
              }`
            }
          >
            Upcoming
          </Tab>
          <Tab
            key="history"
            className={({ selected }) =>
              `flex-1 py-2.5 text-center rounded ${
                selected
                  ? "bg-green-900 text-white"
                  : "text-green-700 hover:bg-green-800 hover:text-white"
              }`
            }
          >
            History
          </Tab>
          <Tab
            key="favorites"
            className={({ selected }) =>
              `flex-1 py-2.5 text-center rounded ${
                selected
                  ? "bg-green-900 text-white"
                  : "text-green-700 hover:bg-green-800 hover:text-white"
              }`
            }
          >
            Favorites
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel key="upcoming">
            {renderBookingCards(upcomingBookings)}
          </Tab.Panel>
          <Tab.Panel key="history">
            {renderBookingCards(bookingHistory)}
          </Tab.Panel>
          <Tab.Panel key="favorites">
            <div className="mt-4 h-80 sm:h-40 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
              {favoriteParkingCenters.map((parkingCenter, i) => (
                <BookingCard
                  key={i}
                  booking={parkingCenter}
                  onBookNow={() => {}}
                  onViewDetails={() => handleShowDetailsModal(parkingCenter)}
                />
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Details Modal */}
      {showDetailsModal && (
        <Modal
          reason="Reservation Details"
          text="Review the details of your upcoming reservation."
          isOpen={showDetailsModal}
          closeModal={handleCloseDetailsModal}
        >
          <div className="mt-4">
            {selectedBooking && (
              <>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-semibold">Parking Center:</span>{" "}
                  {selectedBooking.parkingCenterName}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {selectedBooking.location}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-semibold">Date and Time:</span>{" "}
                  {selectedBooking.location}
                  {"dateTime" in selectedBooking &&
                    "status" in selectedBooking && (
                      <>
                        <div className="flex items-center mb-2 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                          <ClockIcon className="h-5 w-5" />
                          <span className="ml-2 ">
                            {selectedBooking.dateTime}
                          </span>
                        </div>
                        <div
                          className={`flex items-center mb-2 text-base font-medium dark:border-white dark:border-opacity-10 ${
                            selectedBooking.status === "Pending"
                              ? "text-[#FDE047]"
                              : "text-green-500"
                          }`}
                        >
                          <StarIcon className={`"h-5 w-5  `} />
                          <span className="ml-2">{selectedBooking.status}</span>
                        </div>
                      </>
                    )}
                </p>
                {/* Add other details */}
                {/* Map */}
                {openMap ? (
                  <div className="my-4 flex w-fit" onClick={handleCloseMap}>
                    <MapIcon className="h-6 w-6 text-green-500" />
                    <span className="ml-2 text-green-500 cursor-pointer">
                      Collapse Map
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 flex w-fit" onClick={handleOpenMap}>
                    <MapIcon className="h-6 w-6 text-green-500" />
                    <span className="ml-2 text-green-500 cursor-pointer">
                      View Map
                    </span>
                  </div>
                )}

                {openMap && <MapComp centers={[selectedBooking] as any} />}
              </>
            )}
          </div>
          {/* Additional content goes here */}
          <div className={`flex justify-end items-center gap-x-2 mt-2 ${openMap && 'mt-4'}`}>
            <Button
              onClick={handleCloseDetailsModal}
              variant="outline"
              className="bg-transparent border-none shadow-none"
            >
              Cancel Booking
            </Button>
            <Button className="">Book Now</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BookingsPage;
