import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useTransition } from "react";
import { View, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import useDebounce from "@/utils/hooks/useDebounce";
import { LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
import { TabBarIcon } from "../TabBarIcon";

interface _ISearchProps {
  placeholder?: string;
  disabled?: boolean;
}

export default function HomeSearch({
  disabled,
  placeholder = "Search for Centers ...",
}: _ISearchProps) {
  const searchParams = useLocalSearchParams<SearchParamsKeys>();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams as any);

    if (term) {
      params.set("centers", term);
    } else {
      params.delete("centers");
    }

    setTimeout(() => {
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }, 1500)
  }, 500);

  return (
    <View style={{ position: "relative", width: "100%" }}>
      <View style={[styles.inputWrapper]}>
        <TabBarIcon
          fontProvider={Ionicons}
          name="search"
          size={24}
          color={SHARED_COLORS.gray500}
        />
        <TextInput
          onChangeText={(text) => handleSearch(text)}
          nativeID="search"
          autoCapitalize="none"
          style={[styles.input]}
          placeholder={placeholder}
          defaultValue={searchParams["centers"]}
          editable={!disabled}
        />
      </View>

      {isPending && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size={28} color={SHARED_COLORS.gray500} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: SHARED_COLORS.gray500,
    marginLeft: 5
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
    bottom: 0,
  },
});
