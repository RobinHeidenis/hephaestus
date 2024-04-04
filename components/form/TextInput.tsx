import { View } from "react-native";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormState,
} from "react-hook-form";
import {
  Text,
  TextInput as PaperTextInput,
  TextInputProps,
  useTheme,
} from "react-native-paper";

export const TextInput = <TControl extends FieldValues>({
  name,
  label,
  control,
  onSubmitEditing,
  inputProps,
}: {
  name: Path<TControl>;
  label: string;
  control: Control<TControl, unknown>;
  onSubmitEditing: () => void;
  inputProps?: TextInputProps;
}) => {
  const formState = useFormState({ control });
  const theme = useTheme();
  const error = formState.errors[name] as FieldError | undefined;

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <PaperTextInput
            ref={ref}
            label={label}
            mode={"outlined"}
            value={value}
            onChangeText={onChange}
            error={!!error}
            onBlur={onBlur}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false}
            {...inputProps}
          />
        )}
        name={name}
      />
      {error && (
        <Text
          variant={"bodySmall"}
          style={{ marginLeft: 16, marginTop: 4, color: theme.colors.error }}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
};
