import { Divider, List, Text, useTheme } from "react-native-paper";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { BottomSheetBackHandler } from "@/components/BottomSheetBackHandler";
import { Share, View } from "react-native";

export const LinkOptionsBottomSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const theme = useTheme();

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
        const { title, url } = data?.data as unknown as {
          title: string;
          url: string;
        };
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
                onPress={() => {}}
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
                onPress={() => {}}
              />
            </List.Section>
          </BottomSheetView>
        );
      }}
    </BottomSheetModal>
  );
});
