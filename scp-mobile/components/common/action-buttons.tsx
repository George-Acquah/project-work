import { FONTS } from "@/constants/fonts";
import { Link } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import Button from "./button";

interface _IStepBtn {
  href?: string;
  onClick?: () => any;
  type: "back" | "next" | "cancel" | "submit";
  text?: string;
  pending?: boolean;
}

export function StepBtn({ onClick, type, href, text, pending= false }: _IStepBtn) {
  return (
    <div className="mt-6 transition-all duration-300">
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
          <Text style={[ FONTS.pr2]}>{type}</Text>
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
          onPress={type === "submit" ? undefined : onClick}
        >
          {pending ? (
            <div className="flex items-center justify-between capitalize">
              <p className="">{text}...</p>
              <ActivityIndicator size={'small'} color="white" />
            </div>
          ) : (
            `${type}`
          )}
        </Button>
      )}
    </div>
  );
}
