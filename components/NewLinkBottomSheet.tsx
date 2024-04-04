import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Button, Text, useTheme } from "react-native-paper";
import { forwardRef } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BottomSheetBackHandler } from "@/components/BottomSheetBackHandler";
import { useCreateLinkMutation } from "@/mutations/useCreateLinkMutation";
import { TextInput } from "@/components/form/TextInput";

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
          <View style={{ gap: 16, marginTop: 8 }}>
            <TextInput
              name={"title"}
              label={"Title"}
              control={control}
              onSubmitEditing={() => setFocus("url")}
              inputProps={{
                autoCorrect: true,
                autoFocus: true,
                enterKeyHint: "next",
              }}
            />
            <TextInput
              name={"url"}
              label={"Link"}
              control={control}
              onSubmitEditing={handleSubmit(submit)}
              inputProps={{
                autoCorrect: false,
                enterKeyHint: "send",
                textContentType: "URL",
                keyboardType: "url",
                autoCapitalize: "none",
              }}
            />
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
