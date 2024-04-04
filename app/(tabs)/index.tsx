import { FAB, Surface, Text } from "react-native-paper";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinkCard } from "@/components/LinkCard";
import { useEffect, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { NewLinkBottomSheet } from "@/components/NewLinkBottomSheet";
import { LinkOptionsBottomSheet } from "@/components/LinkOptionsBottomSheet";
import { useAllActiveLinksQuery } from "@/queries/useAllActiveLinksQuery";
import { useShareIntentContext } from "expo-share-intent";
import { router } from "expo-router";

export default function TabOneScreen() {
  const { hasShareIntent } = useShareIntentContext();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const linkOptionsRef = useRef<BottomSheetModal>(null);
  const { data } = useAllActiveLinksQuery();

  useEffect(() => {
    if (hasShareIntent) {
      router.replace("/share");
    }
  }, [hasShareIntent]);

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
        {data?.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
          >
            <Text variant={"displaySmall"}>No links yet</Text>
            <Text variant={"headlineSmall"} style={{ textAlign: "center" }}>
              Go find some interesting links to save for later!
            </Text>
          </View>
        )}
        <FlashList
          data={data}
          estimatedItemSize={101}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}
          renderItem={({ item }) => (
            <LinkCard
              title={item.title}
              url={item.url}
              onLongPress={() => {
                linkOptionsRef.current?.present(item);
              }}
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
      <LinkOptionsBottomSheet ref={linkOptionsRef} />
    </Surface>
  );
}
