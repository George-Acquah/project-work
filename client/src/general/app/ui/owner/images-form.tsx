"use client";
import { useFormState } from "react-dom";
import { addParkingCenterImages } from "@/app/lib/actions";
import { inter } from "../shared/font";
import { _ITestCenters } from "@/app/lib/dummy-data";
import { AddActionButton } from "../shared/action-buttons";
import { AddParkingCenterImages } from "../shared/images";

interface _IProps {
  center: _ITestCenters;
}

const CenterImagesForm = ({ center }: _IProps) => {
  const initialState: _IValidationState = {
    message: null,
    errors: {},
  };

  const [state, dispatch] = useFormState(addParkingCenterImages, initialState);
  return (
    <form action={dispatch}>
      <div className={inter.className}>
        <h1 className={` mb-3 text-2xl sm:text-3xl font-bold text-center`}>
          {`Adding/Updating Images to ${center.center_name}`}
        </h1>
        <>
          <h1
            className={`mt-8 mb-2 text-lg sm:text-xl lg:max-w-[50%] lg:mx-auto`}
          >
            Center Image
          </h1>
          <div className="lg:mx-auto ">
            <AddParkingCenterImages center_image={center.image}/>
          </div>
        </>
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

export default CenterImagesForm;
