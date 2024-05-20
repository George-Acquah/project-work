'use client'
import { requestReservationDetails } from "@/app/lib/constants";
import { LoginInput } from "../shared/inputs";
import { ActionButton } from "../shared/action-buttons";
import { useFormState } from "react-dom";
import { requestReservation } from "@/app/lib/actions";

const RequestReservationForm = ({center_id, checker}: { center_id: string, checker?: boolean}) => {
    const initialState: _IRequestReservationState = {
      message: null,
      errors: {},
      code: 0,
  };
  const requestReservationWithOptions = requestReservation.bind(
    null,
    {
      center_id,
      currentPage: 1,
      pageSize: 5,
    }
  );
  const [state, dispatch] = useFormState(requestReservationWithOptions, initialState);

  return (
    <>
      <form
        action={dispatch}
        className={`my-4 sm:max-w-[24.5rem] mx-auto ${
          checker && "hidden transition-all duration-500"
        }`}
      >
        {requestReservationDetails.map((item) => (
          <LoginInput
            key={item.id}
            required={item.required}
            mt={item.mt}
            id={item.id}
            placeholder={item.placeholder}
            label={item.label}
            icon={item.icon}
            type={item.type}
            minLenght={item.minLenght}
          />
        ))}
        <ActionButton
          href="/parking-lots/"
          label="reservation"
          loading_label="Requesting"
        />
      </form>
      {checker && state.slots && <div>
        <h1>I have the slots now, trust me</h1>
      </div>}
    </>
  );
};

export default RequestReservationForm;
