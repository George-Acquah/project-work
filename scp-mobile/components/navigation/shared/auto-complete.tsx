import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { setDestination, setOrigin } from "@/features/map/map.slice";
import { EAutoComplete } from "@/utils/enums/auto-complete";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useColorScheme } from "@/utils/hooks/useColorScheme";

interface _IAutoComplete {
  type: EAutoComplete;
  placeholder: string;
  disableScroll: boolean;
}
const PlacesAutoComplete = ({ type = EAutoComplete.ORIGIN, placeholder = "Where are you", disableScroll = false }: _IAutoComplete) => {
  const colorScheme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <GooglePlacesAutocomplete
      fetchDetails
      onPress={(data, details = null) => {
        if (details) {
          if (type === EAutoComplete.ORIGIN) {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
            // router.push("/map/");
          } else if (type === EAutoComplete.DESTINATION) {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            )
            // router.push("/account/settings/");
          } else {
            // Handle Other types here 
          }
        }
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      placeholder={placeholder}
      debounce={400}
      onFail={(error) => console.error(error)}
      minLength={2}
      enablePoweredByContainer={false}
      disableScroll= {disableScroll}
      styles={{
        container: {
          flex: 0,
        },
        textInput: {
          fontSize: 18,
          backgroundColor:
            colorScheme === "light"
              ? SHARED_COLORS.gray200
              : SHARED_COLORS.gray400,
          color:
            colorScheme === "light"
              ? LIGHT_THEME.contentPrimary
              : LIGHT_THEME.contentPrimary,
        },
      }}
      query={{
        key: process.env.GOOGLE_MAPS_API_KEY,
        language: "en",
      }}
    />
  );
};

export default PlacesAutoComplete;
