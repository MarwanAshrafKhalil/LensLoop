import Icon from "react-native-vector-icons/AntDesign";
import { useAppSelector } from "../redux/app/hooks";

import { Video } from "expo-av";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE_URL = "http://192.168.1.2:3000";

export default function MediaCard({ caption, type: fileType, url, mediaId }) {
  const userFetch = useAppSelector((state) => state.user.currentUser);

  const handleLike = async (like) => {
    if (Object.keys(userFetch).length === 0) {
      router.push("/sign-in");
    }
    const jsonData = {
      mediaId: mediaId,
      type: fileType,
    };
    const response = await fetch(`${API_BASE_URL}/api/inter/${like}`, {
      method: "POST",
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      console.log("failed to find media");
    }
  };

  return (
    <SafeAreaView className="bg-white  ">
      <ScrollView className="  bg-white ">
        <View className="flex flex-col ">
          <View className="bg-white shadow-md rounded-lg my-10 h-[400px] w-[350px] mx-auto">
            <View className="h-[250px] object-contain  ">
              {fileType === "image" ? (
                <View className="">
                  <Image
                    source={{ uri: url }}
                    resizeMode="cover"
                    className="w-full h-full rounded-t-lg"
                  />
                </View>
              ) : (
                <Video
                  className="w-full h-full rounded-t-lg"
                  source={{ uri: url }}
                  resizeMode="cover"
                  shouldPlay={false}
                  useNativeControls
                />
              )}
              <View className="flex items-center justify-center">
                <View className=" h-24 font-psemibold  text-center justify-center items-center  ">
                  <Text className="font-psemibold  text-center">{caption}</Text>
                </View>
                <View className="  w-full flex flex-row gap-10  justify-center  ">
                  <TouchableOpacity onPress={() => handleLike("like")}>
                    <Icon
                      name="like1"
                      size={30}
                      color="#161622"
                      className="mx-5"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleLike("dislike")}>
                    <Icon
                      name="dislike1"
                      size={30}
                      color="#161622"
                      className="mx-5"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
