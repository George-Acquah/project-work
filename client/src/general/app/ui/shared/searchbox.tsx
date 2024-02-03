import React, { ChangeEvent } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import ComboboxComp, { MapCombobox } from "./combobox";
import { _ICoodinates } from "./map";

interface _ISearchBoxProps {
  onAddressSelect?: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
  defaultValue: string;
}

const SearchBox = ({ onAddressSelect, defaultValue }: _ISearchBoxProps) => {
  return (
    <UseSearchBox
      onAddressSelect={onAddressSelect}
      defaultValue={defaultValue}
    />
  );
};

export default SearchBox;

const UseSearchBox = ({ onAddressSelect, defaultValue }: _ISearchBoxProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { data, status },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === "") {
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    if (onAddressSelect) {
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = getLatLng(results[0]);
        onAddressSelect(address, lat, lng);
      } catch (error) {
        console.error(`😱 Error:`, error);
      }
    }
  };

  return (
    <ComboboxComp
      placeholder={"Search your location"}
      value={value}
      autoComplete={"off"}
      disabled={!ready}
      // data={data}
      handleChange={handleChange}
      handleSelect={handleSelect}
      // status={status}
    >
      <MapCombobox value={value} status={status} data={data} />
    </ComboboxComp>
  );
};
