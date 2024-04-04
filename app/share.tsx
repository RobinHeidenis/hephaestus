import { useShareIntentContext } from "expo-share-intent";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Surface, Text, useTheme } from "react-native-paper";
import { BackHandler, View } from "react-native";
import { useCreateLinkMutation } from "@/mutations/useCreateLinkMutation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "@/components/form/TextInput";

const shareIntentNewLinkSchema = z.object({
  title: z.string().min(1, "You need to enter a title"),
  url: z.string().url("You have to enter a valid URL"),
});

export default function ShareIntent() {
  const { shareIntent, error, resetShareIntent } = useShareIntentContext();
  const { control, handleSubmit, setFocus } = useForm({
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
          </Card>
        )}
        <View style={{ flex: 1, gap: 16 }}>
          <TextInput
            name={"title"}
            label={"Title"}
            control={control}
            onSubmitEditing={() => setFocus("url")}
            inputProps={{
              autoFocus: true,
              autoCorrect: true,
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
              textContentType: "URL",
              keyboardType: "url",
              enterKeyHint: "send",
              autoCapitalize: "none",
            }}
          />
        </View>
        <Button mode={"contained"} icon={"plus"} onPress={handleSubmit(submit)}>
          Save link
        </Button>
      </View>
    </Surface>
  );
}
