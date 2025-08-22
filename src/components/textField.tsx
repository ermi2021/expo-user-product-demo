import { View, TextInput, Text, KeyboardTypeOptions } from "react-native";

interface TextInputProps {
  id: string;
  fieldTitle: string;
  placeholder?: string;
  containerClassName?: string;
  labelClassName?: string;
  textInputClassName?: string;
  error?: string;
  onInputChange?: (text: string) => void;
  keyBoardType?: KeyboardTypeOptions;
  autoCapitalize?: "words" | "none" | "sentences" | "characters" | undefined;
  value?: string;
  autoCorrect?: boolean;
}

const TextInputClassNames = {
    ERROR_BORDER_CLASS: "border-red-500 bg-red-50",
    DEFAULT_BORDER_CLASS: "border-gray-300",
    ERROR_LABEL_CLASS: "text-red-500 text-sm mt-1 ml-1",
}

const TextInputComponent: React.FC<TextInputProps> = (
  props: TextInputProps
) => {
  return (
    <View key={props.id} className={props.containerClassName || "mb-4"}>
      <Text
        className={
          props.labelClassName || "text-sm font-medium text-gray-700 mb-2"
        }
      >
        {props.fieldTitle}
      </Text>
      <TextInput
        className={`${
          props.textInputClassName || "border rounded-lg px-4 py-3 text-base"
        } ${
          props.error
            ? TextInputClassNames.ERROR_BORDER_CLASS
            : TextInputClassNames.DEFAULT_BORDER_CLASS
        } `}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChangeText={props.onInputChange}
        autoCapitalize={props.autoCapitalize}
        keyboardType={props.keyBoardType || "default"}
        autoCorrect={props.autoCorrect}
      />
      {props.error && (
        <Text className={TextInputClassNames.ERROR_LABEL_CLASS}>{props.error}</Text>
      )}
    </View>
  );
};

export default TextInputComponent;
