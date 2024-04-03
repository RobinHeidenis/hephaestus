import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { db } from "@/db/db";
import { Link, links } from "@/db/schema";
import { useState } from "react";

export default function ArchiveScreen() {
  const [data, setData] = useState<Link[]>([]);

  return (
    <View>
      <Text>Archive</Text>
      <Button
        onPress={() => {
          db.insert(links)
            .values({
              title: "test",
              url: "https://example.com",
            })
            .then(() => {
              db.query.links.findMany().then((data) => setData(data));
            });
        }}
      >
        SEED
      </Button>
      {data.map((link) => (
        <Text key={link.id}>
          {link.title} ; {link.url}
        </Text>
      ))}
    </View>
  );
}
