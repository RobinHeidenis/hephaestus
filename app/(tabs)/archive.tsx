import { View } from "react-native";
import { Surface } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { LinkCard } from "@/components/LinkCard";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { useArchivedLinksQuery } from "@/queries/useArchivedLinksQuery";
import { LinkOptionsBottomSheet } from "@/components/LinkOptionsBottomSheet";

export default function ArchiveScreen() {
  const { data } = useArchivedLinksQuery();
  const linkOptionsRef = useRef<BottomSheetModal>(null);

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
                linkOptionsRef.current?.present(item);
              }}
            />
          )}
        />
      </View>
      <LinkOptionsBottomSheet ref={linkOptionsRef} />
    </Surface>
  );
}
