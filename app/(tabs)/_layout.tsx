import React from "react";
import { Tabs } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";
import { Appbar, BottomNavigation } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => {
          const title = getHeaderTitle(props.options, props.route.name);

          return (
            <Appbar.Header style={{ gap: 16, paddingHorizontal: 16 }}>
              <Appbar.Content title={title} />

              {props.options.headerRight
                ? props.options.headerRight({})
                : undefined}
            </Appbar.Header>
          );
        },
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined &&
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name ?? "UHHHH";

            return label;
          }}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Links",
          tabBarIcon: (props) => (
            <MaterialCommunityIcons {...props} name={"link-variant"} />
          ),
        }}
      />
      <Tabs.Screen
        name="tags"
        options={{
          title: "Tags",
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              name={props.focused ? "tag-multiple" : "tag-multiple-outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: "Archive",
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              name={props.focused ? "archive" : "archive-outline"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
