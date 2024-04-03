import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { forwardRef } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BottomSheetBackHandler } from "@/components/BottomSheetBackHandler";
import { useCreateLinkMutation } from "@/mutations/useCreateLinkMutation";

const newLinkSchema = z.object({
  title: z.string().min(1, "You need to enter a title"),
  url: z.string().url("You need to enter a valid URL"),
});

export const NewLinkBottomSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(newLinkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });
  const { mutate } = useCreateLinkMutation();
  if (typeof ref === "function")
    throw new Error("Please pass a ref instead of a function");

  const submit = (values: { title: string; url: string }) => {
    mutate(values);
    ref?.current?.close();
  };

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      handleIndicatorStyle={{ backgroundColor: theme.colors.surfaceVariant }}
      index={0}
      snapPoints={[380]}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: theme.colors.surface }}
    >
      <BottomSheetView style={{ paddingHorizontal: 20 }}>
        <BottomSheetBackHandler />
        <Text variant={"titleLarge"}>New link</Text>
        <View
          style={{
            justifyContent: "space-between",
            height: 310,
          }}
        >
          <View>
            <Controller
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextInput
                  ref={ref}
                  label={"Title"}
                  mode={"outlined"}
                  style={{ marginTop: 16, marginBottom: 4 }}
                  autoCorrect
                  autoFocus
                  enterKeyHint={"next"}
                  error={!!errors.title}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus("url")}
                  blurOnSubmit={false}
                />
              )}
              name={"title"}
              control={control}
            />
            {errors.title && (
              <Text
                variant={"bodySmall"}
                style={{ marginLeft: 16, color: theme.colors.error }}
              >
                {errors.title.message}
              </Text>
            )}
            <Controller
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextInput
                  ref={ref}
                  label={"Link"}
                  mode={"outlined"}
                  style={{ marginTop: 16, marginBottom: 4 }}
                  enterKeyHint={"send"}
                  error={!!errors.url}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  textContentType={"URL"}
                  onSubmitEditing={handleSubmit(submit)}
                />
              )}
              name={"url"}
              control={control}
            />
            {errors.url && (
              <Text
                variant={"bodySmall"}
                style={{ marginLeft: 16, color: theme.colors.error }}
              >
                {errors.url.message}
              </Text>
            )}
          </View>
          <Button
            mode={"contained"}
            icon={"plus"}
            onPress={handleSubmit(submit)}
          >
            Add link
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});
