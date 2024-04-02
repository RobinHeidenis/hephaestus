import { FAB, Surface, useTheme } from "react-native-paper";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinkCard } from "@/components/LinkCard";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { NewLinkBottomSheet } from "@/components/NewLinkBottomSheet";

export default function TabOneScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();

  return (
    <Surface
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <View style={{ width: "100%", height: "100%" }}>
        <FlashList
          data={[
            { title: "Faster internet", url: "https://google.com" },
            {
              title: "Building a NextJs modal with capture all route",
              url: "https://bing.com",
            },
          ]}
          estimatedItemSize={101}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}
          renderItem={({ item }) => (
            <LinkCard
              title={item.title}
              url={item.url}
              onLongPress={() => {}}
            />
          )}
        />
      </View>
      <FAB
        icon={"plus"}
        onPress={() => bottomSheetRef.current?.present()}
        style={{ position: "absolute", margin: 16, bottom: 0, right: 0 }}
      />
      <NewLinkBottomSheet ref={bottomSheetRef} />
    </Surface>
  );
}
