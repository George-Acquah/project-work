"use client";
import { addParkingCenter } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { textColor } from "../shared/themes";
import { inter } from "../shared/font";
import { _ITestCenters } from "@/app/lib/dummy-data";
import SearchBox from "../shared/searchbox";
import { CommonGroupInputs } from "../shared/inputs";
import { addCenterAddressDetails, addCenterDetails } from "@/app/lib/constants";
import { useState } from "react";
import { setTimeout } from "timers";
import { AddParkingCenterImages } from "../shared/images";
import { AddActionButton } from "../shared/action-buttons";

interface _IProps {
  center?: _ITestCenters;
}

const ParkingCenterForm = ({ center }: _IProps) => {
  const initialState: _IValidationState = {
    message: null,
    errors: {},
  };
  const [address, setAddress] = useState(center ? center.address : "");
  const [latitude, setLatitude] = useState(center ? center.address : "");
  const [longitude, setLongitude] = useState(center ? center.address : "");
  const condition = address && latitude && longitude;

  setTimeout(() => {
    setAddress("hello");
    setLatitude("lat");
    setLongitude("lng");
  }, 5000); // TODO to be deleted, was just for testing 😀😀


  const [state, dispatch] = useFormState(addParkingCenter, initialState);
  return (
    <form
      action={dispatch}
      className={`flex-1 px-6 pt-10 pb-6 shadow-three mx-auto max-w-[500px] lg:max-w-[90%] xl:max-w-[80%] sm:p-[0px] ${textColor}`}
    >
      <div className={` ${inter.className}`}>
        <h1 className={` mb-3 text-2xl sm:text-3xl font-bold text-center`}>
          {center ? `Editing ${center.address}` : "Add a New Center"}
        </h1>
        <div className="lg:max-w-[50%] lg:mx-auto">
          <label
            htmlFor="search"
            className="mb-3 mt-5 block text-sm font-medium"
          >
            Search For Your Address
          </label>
          <SearchBox
            onAddressSelect={(address, latitude, longitude) => {
              console.log({ address, latitude, longitude });
            }}
            defaultValue={center ? center.address : ""}
          />
        </div>
        {condition && (
          <>
            <h1
              className={`mt-8 mb-2 text-lg sm:text-xl lg:max-w-[50%] lg:mx-auto`}
            >
              Center Image
            </h1>
            {center ? (
              <div className="lg:mx-auto ">
                <AddParkingCenterImages
                  custom_class={true}
                  center_image={center.image}
                />
              </div>
            ) : (
              <AddParkingCenterImages custom_class={true} />
            )}
            <div className="lg:grid lg:gap-4 lg:grid-cols-2 ">
              <div className="flex flex-col">
                <CommonGroupInputs
                  title="Center Details"
                  data={addCenterDetails}
                  reference={center}
                  state={state}
                />
              </div>

              <div className="flex flex-col">
                <CommonGroupInputs
                  title="Address Details"
                  data={addCenterAddressDetails}
                  reference={center}
                  state={state}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <AddActionButton
        href="/driver"
        label="center"
        loading_label="Updating"
        decider={center ? true : false}
      />
    </form>
  );
};

export default ParkingCenterForm;
