import { useEffect } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { BackHandler } from "react-native";

export const BottomSheetBackHandler = () => {
  const { close } = useBottomSheet();

  useEffect(() => {
    const handleBack = () => {
      close();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
  }, []);

  return null;
};
