import { searchParamsKeys } from "@/constants/root";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useTransition } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import useDebounce from "@/utils/hooks/useDebounce";
import { TabBarIcon } from "../navigation/TabBarIcon";
import LoadingComponent from "../skeletons/loading";
import { LIGHT_THEME } from "@/constants/Colors";
import { SEARCH_PARAMS } from "@/constants/search-params.constants";

interface IProps {
  entityType: string; // Add entityType prop
  searchLoading: boolean;
  placeholder?: string;
  disabled?: boolean;
}
interface _ISearchProps<T> {
  entityType: T; // Add entityType prop
  placeholder?: string;
  disabled?: boolean;
}

// Define the type for SEARCH_PARAMS keys
type SearchParamKeys = keyof typeof SEARCH_PARAMS;

// export default function SearchComp({
//   entityType,
//   searchLoading,
//   disabled,
//   placeholder = "Search by Name",
// }: IProps) {
//   const searchParams: Partial<SearchParamsKeys> =
//     useLocalSearchParams<SearchParamsKeys>();
//   const { replace } = useRouter();
//   const pathname = usePathname();
//   const [isPending, startTransition] = useTransition();

//   const debouncedSearch = useDebounce((text: string) => {
//     const params = new URLSearchParams();
//     // if (text) {
//     //   params.set(searchParamsKeys[entityType], text);
//     // } else {
//     //   params.delete(searchParamsKeys[entityType]);
//     // }

//     Object.entries(searchParams).forEach(([key, value]) => {
//       if (value) {
//         params.set(key, value);
//       }
//     });

//     if (text) {
//       params.set(searchParamsKeys[entityType], text);
//     } else {
//       params.delete(searchParamsKeys[entityType]);
//     }

//     startTransition(() => {
//       replace(`${pathname}?${params.toString()}` as any);
//     });
//   }, 500);

//   return (
//     <View style={{ position: "relative" }}>
//       <View
//         style={[styles.inputWrapper, disabled && styles.disabledInputWrapper]}
//       >
//         <TabBarIcon fontProvider={MaterialIcons} name="search" size={26} />
//         <TextInput
//           onChangeText={(text) => debouncedSearch(text)}
//           nativeID="search"
//           autoCapitalize="none"
//           style={[styles.input, disabled && styles.disabledInput]}
//           placeholder={placeholder}
//           defaultValue={searchParams[searchParamsKeys[entityType]]}
//           editable={!disabled}
//         />
//       </View>

//       {isPending ||
//         (searchLoading && (
//           <View
//             style={{
//               position: "absolute",
//               right: 0,
//               top: 0,
//               bottom: 0,
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <LoadingComponent pad color={LIGHT_THEME.primary700} />
//           </View>
//         ))}
//     </View>
//   );
// }

export default function Search<T extends SearchParamKeys>({
  disabled,
  placeholder = "Search by Name",
  entityType,
}: _ISearchProps<T>) {
  const searchParams: Partial<SearchParamKeys> = useLocalSearchParams<any>();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams);
    // Object.entries(searchParams).forEach(([key, value]) => {
    //   if (value) {
    //     params.set(key, value);
    //   }
    // });

    if (term) {
      params.set(SEARCH_PARAMS[entityType], term);
    } else {
      params.delete(SEARCH_PARAMS[entityType]);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <View style={{ position: "relative", display: "flex", flex: 1 }}>
      <View
        style={[styles.inputWrapper, disabled && styles.disabledInputWrapper]}
      >
        <TabBarIcon fontProvider={MaterialIcons} name="search" size={26} />
        <TextInput
          onChangeText={(text) => handleSearch(text)}
          nativeID="search"
          autoCapitalize="none"
          style={[styles.input, disabled && styles.disabledInput]}
          placeholder={placeholder}
          defaultValue={searchParams[SEARCH_PARAMS[entityType]]}
          // defaultValue={searchParams.get(SEARCH_PARAMS[entityType])?.toString()}
          editable={!disabled}
        />
      </View>

      {isPending && (
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingComponent pad color={LIGHT_THEME.primary700} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderRadius: 5,
    opacity: 1, // Default opacity
  },
  input: {
    flex: 1,
    marginVertical: 10,
    width: 300,
    fontSize: 20,
    color: "gray",
  },
  disabledInputWrapper: {
    opacity: 0.5, // Reduced opacity for disabled state
  },
  disabledInput: {
    pointerEvents: "none", // Disable pointer events for disabled state
  },
});
