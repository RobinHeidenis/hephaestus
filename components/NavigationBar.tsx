import {Appbar} from "react-native-paper";
import {getHeaderTitle} from "@react-navigation/elements";
import {NativeStackNavigationOptions, NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamListBase, Route} from "@react-navigation/native";

export const NavigationBar = ({navigation, route, options, back}: {
  navigation: NativeStackNavigationProp<ParamListBase>,
  route: Route<string>,
  options: NativeStackNavigationOptions,
  back?: unknown
}) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
      <Appbar.Content title={title}/>
    </Appbar.Header>
  );
}