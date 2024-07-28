import { FONTS } from "@/constants/fonts";
import { Link } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import Button from "./button";

interface _IStepBtn {
  href?: string;
  onPress?: (() => any) |( (param: any) => void);
  type: "back" | "next" | "cancel" | "submit";
  text?: string;
  pending?: boolean;
}

export function StepBtn({
  onPress,
  type,
  href,
  text,
  pending = false,
}: _IStepBtn) {
  return (
    <View style={{ marginTop: 24 }}>
      {/* // className="mt-6 transition-all duration-300"> */}
      {type === "cancel" && href ? (
        <Link
          href={href}
          style={[
            {
              display: "flex",
              height: 42,
              alignItems: "center",
              borderRadius: 6,
              textTransform: "capitalize",
              paddingHorizontal: 16,
            },
          ]}
        >
          <Text style={[FONTS.pr2]}>{type}</Text>
        </Link>
      ) : (
        <Button
          aria-disabled={pending}
          style={{ borderRadius: 8, height: 36 }}
          size="sm"
          // color={
          //   type === "submit" ? "green" : type === "back" ? "gray" : "blue"
          // }
          // type={type === "submit" ? "submit" : "button"}
          onPress={onPress}
        >
          {pending ? (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ textTransform: "capitalize" }}>{text}...</Text>
              <ActivityIndicator size={"small"} color="white" />
            </View>
          ) : (
            <Text style={{ textTransform: "capitalize" }}>{type}</Text>
          )}
        </Button>
      )}
    </View>
  );
}
