import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] justify-center items-center px-4">
          <Image
            className="w-[130px] h-[84px]"
            resizeMode="contain"
            source={logo}
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-primary font-bold text-center">
              Discover Endless Lens Loops{" "}
              <Text className="text-secondary-200 underline">LensLoop</Text>
            </Text>
          </View>
          <Text className="text-sm font-pregular text-gray-700 mt-7 text-center">
            Explore Others Lenses
          </Text>

          <CustomButton
            title={"continue with Email"}
            handlePress={() => router.push("/home")}
            ContainerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      {/* <StatusBar backgroundColor="#161622" style="dark" /> */}
    </SafeAreaView>
  );
}
