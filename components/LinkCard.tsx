import { Card, Text } from "react-native-paper";
import { Linking, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const LinkCard = ({
  title,
  url,
  onLongPress,
}: {
  title: string;
  url: string;
  onLongPress: () => void;
}) => {
  return (
    <Card
      style={{
        width: "100%",
        marginBottom: 12,
      }}
      contentStyle={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 12,
        paddingTop: 8,
        paddingRight: 4,
      }}
      mode={"contained"}
      onPress={() => Linking.openURL(url)}
      onLongPress={onLongPress}
    >
      <View style={{ maxWidth: "95%" }}>
        <Card.Content>
          <Text variant={"titleLarge"}>{title}</Text>
          <Text variant={"labelLarge"} style={{ marginTop: 4 }}>
            {new URL(url).hostname}
          </Text>
        </Card.Content>
      </View>
      <MaterialCommunityIcons
        name={"chevron-right"}
        color={"white"}
        size={30}
        style={{ marginTop: 8 }}
      />
    </Card>
  );
};
