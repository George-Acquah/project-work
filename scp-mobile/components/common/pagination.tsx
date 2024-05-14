import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link, useLocalSearchParams, usePathname } from "expo-router";
import { generatePagination } from "@/utils/functions/pagination";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DARK_THEME, LIGHT_THEME, SHARED_COLORS } from "@/constants/Colors";
 
const Pagination = ({ totalPages }: { totalPages: number }) => {
  const colorScheme = useColorScheme() ?? 'dark'
  const pathname = usePathname();
  const searchParams = useLocalSearchParams<{ page?: string }>();

  const currentPage = Number(searchParams.page) || 1;

    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", pageNumber.toString());

      return `${pathname}?${params.toString()}`;
    };

  const allPages = generatePagination(currentPage, totalPages);
  return (
    <View style={styles.container}>
      <View style={styles.paginationContainer}>
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
        <View style={styles.pageNumbersContainer}>
          {allPages.map((page, index) => {
            let position: "first" | "last" | "middle" | "single" | undefined;

            if (index === 0) position = "first";
            else if (index === allPages.length - 1) position = "last";
            else if (allPages.length === 1) position = "single";
            else if (page === "...") position = "middle";
            else position = undefined; // Ensure all code paths assign a value to position

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </View>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </View>
    </View>
  );
};

const PaginationArrow = ({
  href,
  direction,
  isDisabled,
}: {
  href: any;
  direction: "left" | "right";
  isDisabled?: boolean;
  }) => {
  return (
    <Link
      style={[
        styles.arrowContainer,
        direction === "right" && styles.containerRight,
      ]}
      href={href}
      // onPress={handlePress}
      disabled={isDisabled}
    >
      <Entypo
        name={direction === "left" ? "triangle-left" : "triangle-right"}
        size={24}
        color={isDisabled ? "gray" : "black"}
      />
      {/* <Text style={[styles.text, isDisabled && styles.disabledText]}>
        {direction === "left" ? "Prev" : "Next"}
      </Text> */}
    </Link>
  );
};

const PaginationNumber = ({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: any;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) => {
  const containerStyles = [
    styles.numberContainer,
    position === "single" && styles.singleContainer,
    isActive && styles.activeContainer,
    !isActive && position !== "middle" && styles.inactiveContainer,
    position === "middle" && styles.middleContainer,
  ];

  const textStyles = [
    styles.pagText,
    isActive && styles.activeText,
    !isActive && position === "middle" && styles.inactiveText,
  ];

  return (
    <Link style={containerStyles} href={href}>
      <Text style={[textStyles, { justifyContent: "center"}]}>{page}</Text>
    </Link>
  );
};


const styles = StyleSheet.create({
  //Pagination Arrows
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor:
      useColorScheme() === "light"
        ? SHARED_COLORS.gray100
        : SHARED_COLORS.gray800,
    marginRight: 10,
  },
  containerRight: {
    marginRight: 0,
    marginLeft: 10,
  },
  //Page numbers
  numberContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    borderRadius: 5,
    backgroundColor:
      useColorScheme() === "light"
        ? SHARED_COLORS.gray100
        : SHARED_COLORS.gray800,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 2,
  },
  singleContainer: {
    borderRadius: 5,
    backgroundColor:
      useColorScheme() === "light"
        ? SHARED_COLORS.gray100
        : SHARED_COLORS.gray800,
  },
  activeContainer: {
    backgroundColor:
      useColorScheme() === "light"
        ? LIGHT_THEME.primary500
        : SHARED_COLORS.gray900,
  },
  inactiveContainer: {
    backgroundColor:
      useColorScheme() === "light"
        ? SHARED_COLORS.gray200
        : SHARED_COLORS.gray700,
  },
  middleContainer: {
    backgroundColor: "transparent",
  },
  pagText: {
    fontSize: 16,
    fontWeight: "bold",
    color:
      useColorScheme() === "light"
        ? SHARED_COLORS.gray900
        : SHARED_COLORS.gray100,
  },
  activeText: {
    color:
      useColorScheme() === "light"
        ? SHARED_COLORS.gray100
        : SHARED_COLORS.gray900,
  },
  inactiveText: {
    color:
      useColorScheme() === "light"
        ? SHARED_COLORS.gray500
        : SHARED_COLORS.gray400,
  },

  // Pagination Return
  container: {
    width: "100%",
    paddingHorizontal: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  pageNumbersContainer: {
    flexDirection: "row",
    marginHorizontal: 1,
  },
});

  export default Pagination;
