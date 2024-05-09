import { View, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  ContainerStyle,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`${ContainerStyle} ${
        isLoading ? "opacity-50" : ""
      }bg-secondary rounded-xl min-h-[62px] w-full justify-center items-center`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`${textStyles} text-primary font-psemibold text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
