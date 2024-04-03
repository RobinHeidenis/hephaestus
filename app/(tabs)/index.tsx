import { FAB, Surface } from "react-native-paper";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinkCard } from "@/components/LinkCard";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { NewLinkBottomSheet } from "@/components/NewLinkBottomSheet";
import { LinkOptionsBottomSheet } from "@/components/LinkOptionsBottomSheet";
import { useAllActiveLinksQuery } from "@/queries/useAllActiveLinksQuery";

export default function TabOneScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const linkOptionsRef = useRef<BottomSheetModal>(null);
  const { data } = useAllActiveLinksQuery();

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
                linkOptionsRef.current?.present({
                  id: item.id,
                  title: item.title,
                  url: item.url,
                });
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
