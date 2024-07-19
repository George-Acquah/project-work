import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useTransition } from "react";
import { View, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import useDebounce from "@/utils/hooks/useDebounce";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { LIGHT_THEME } from "@/constants/Colors";
import { SEARCH_PARAMS } from "@/constants/search-params.constants";

interface _ISearchProps<T> {
  entityType: T;
  placeholder?: string;
  disabled?: boolean;
}

type SearchParamKeys = keyof typeof SEARCH_PARAMS;

export default function Search<T extends SearchParamKeys>({
  disabled,
  placeholder = "Search by Name",
  entityType,
}: _ISearchProps<T>) {
  const searchParams = useLocalSearchParams<any>();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  console.log(isPending);

  const handleSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams as any);

    if (term) {
      params.set(SEARCH_PARAMS[entityType], term);
    } else {
      params.delete(SEARCH_PARAMS[entityType]);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 500);

  return (
    <View style={{ position: "relative", width: "100%" }}>
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
          defaultValue={searchParams[SEARCH_PARAMS[entityType] as any]}
          editable={!disabled}
        />
      </View>

      {isPending && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color={LIGHT_THEME.primary700} />
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
    opacity: 1,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: "gray",
    // height: SIZES.padding * 1.3,
  },
  disabledInputWrapper: {
    opacity: 0.5,
  },
  disabledInput: {
    pointerEvents: "none",
  },
  loadingOverlay: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0
  },
});
