import { TouchableOpacity, Text, KeyboardTypeOptions } from "react-native";

type labelStyle = string | "text-white text-center font-medium text-sm";

interface ButtonComponentProps {
  onPress: () => void;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
  labelClassName?: labelStyle;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onPress,
  label,
  className,
  labelClassName,
  disabled
}) => {
  return (
    <TouchableOpacity onPress={onPress} className={className} disabled={disabled}>
      <Text
        className={
          labelClassName || "text-white text-center font-medium text-sm"
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
