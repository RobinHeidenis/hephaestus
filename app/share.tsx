import { useShareIntentContext } from "expo-share-intent";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { BackHandler, View } from "react-native";
import { useCreateLinkMutation } from "@/mutations/useCreateLinkMutation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const shareIntentNewLinkSchema = z.object({
  title: z.string().min(1, "You need to enter a title"),
  url: z.string().url("You have to enter a valid URL"),
});

export default function ShareIntent() {
  const { shareIntent, error, resetShareIntent } = useShareIntentContext();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      url: shareIntent.webUrl ?? "",
    },
    resolver: zodResolver(shareIntentNewLinkSchema),
  });
  const theme = useTheme();
  const { mutate: createLink } = useCreateLinkMutation();

  const submit = (values: { title: string; url: string }) => {
    createLink(values);
    resetShareIntent();
    BackHandler.exitApp();
  };

  return (
    <Surface
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          padding: 16,
          justifyContent: "space-between",
        }}
      >
        {error && (
          <Card
            mode={"outlined"}
            style={{
              width: "100%",
              marginBottom: 24,
            }}
            contentStyle={{ padding: 16 }}
          >
            <Text variant={"titleMedium"}>
              <MaterialCommunityIcons
                name={"alert-circle-outline"}
                size={16}
                color={theme.colors.error}
              />
              {"  "}
              Sharing error
            </Text>
            <Text variant={"bodyMedium"}>{error}</Text>
            <Text variant={"bodyMedium"}>
              ShareError: SyntaxError: You have some problems around this code:
              hephaestus/app/share.tsx:15:12
            </Text>
          </Card>
        )}
        <View style={{ flex: 1, gap: 16 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextInput
                ref={ref}
                label={"Title"}
                mode={"outlined"}
                value={value}
                onChangeText={onChange}
                error={!!errors.title}
                autoFocus
                autoCorrect
                enterKeyHint={"next"}
                onBlur={onBlur}
                onSubmitEditing={() => setFocus("url")}
                blurOnSubmit={false}
              />
            )}
            name={"title"}
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
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextInput
                ref={ref}
                label={"Link"}
                textContentType={"URL"}
                enterKeyHint={"send"}
                value={value}
                onBlur={onBlur}
                autoCapitalize={"none"}
                onChangeText={onChange}
                error={!!errors.url}
                mode={"outlined"}
                onSubmitEditing={handleSubmit(submit)}
              />
            )}
            name={"url"}
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
        <Button mode={"contained"} icon={"plus"} onPress={handleSubmit(submit)}>
          Save link
        </Button>
      </View>
    </Surface>
  );
}
