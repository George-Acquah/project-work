import { StyleSheet } from "react-native"

const generageScrollViewStyles = (HEADER_HEIGHT: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      overflow: "hidden",
      zIndex: 1,
    },
    content: {
      flex: 1,
      gap: 16,
    },
  });
};


export {
  generageScrollViewStyles,
}