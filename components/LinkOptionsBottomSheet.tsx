import { Divider, List, Text, useTheme } from "react-native-paper";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { BottomSheetBackHandler } from "@/components/BottomSheetBackHandler";
import { Share, View } from "react-native";
import { useDeleteLinkMutation } from "@/mutations/useDeleteLinkMutation";
import { z } from "zod";
import { useArchiveLinkMutation } from "@/mutations/useArchiveLinkMutation";

const LinkOptionsBottomSheetDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
});

export const LinkOptionsBottomSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const theme = useTheme();
  const { mutate: deleteLink } = useDeleteLinkMutation();
  const { mutate: archiveLink } = useArchiveLinkMutation();
  if (typeof ref === "function")
    throw new Error("Please pass a ref instead of a function");

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
      enableDynamicSizing
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: theme.colors.surface }}
      style={{ marginBottom: 20 }}
    >
      {(data) => {
        const { id, title, url } = LinkOptionsBottomSheetDataSchema.parse(
          data?.data,
        );

        return (
          <BottomSheetView>
            <BottomSheetBackHandler />
            <View style={{ paddingHorizontal: 20 }}>
              <Text variant={"titleLarge"}>{title}</Text>
              <Text>{url}</Text>
            </View>
            <Divider style={{ marginTop: 12 }} />
            <List.Section>
              <List.Item
                title={"Share"}
                left={(props) => (
                  <List.Icon {...props} icon={"share-outline"} />
                )}
                onPress={() => {
                  void Share.share(
                    {
                      title: `Hephaestus link: ${title}`,
                      message: `Check out this link:\n${title}\n${url}`,
                    },
                    {},
                  );
                }}
              />
              <List.Item
                title={"Archive"}
                left={(props) => (
                  <List.Icon {...props} icon={"archive-outline"} />
                )}
                onPress={() => {
                  archiveLink(id);
                  ref?.current?.close();
                }}
              />
              <List.Item
                title={"Delete"}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={"trash-can-outline"}
                    color={theme.colors.error}
                  />
                )}
                titleStyle={{ color: theme.colors.error }}
                onPress={() => {
                  deleteLink(id);
                  ref?.current?.close();
                }}
              />
            </List.Section>
          </BottomSheetView>
        );
      }}
    </BottomSheetModal>
  );
});
