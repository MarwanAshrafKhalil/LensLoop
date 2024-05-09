import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useAppSelector } from "../../redux/app/hooks";
import Icon from "react-native-vector-icons/AntDesign";
import { API_BASE_URL } from "../../lib/variablesAPI";

const Create = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

  const openPicker = async () => {
    if (Object.keys(user).length === 0) {
      router.push("/sign-in");
    }
    console.log("user: ", user);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: (selectType = [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "video/mp4",
        ]),
      });
      if (!result.canceled) {
        setFile(result.assets[0]);
      }

      console.log("result: ", result);

      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    } catch (error) {
      console.log("Error selecting: ", error);
    }
  };

  const submit = async () => {
    if ((caption === "") | !file) {
      return Alert.alert("Please provide all fields");
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("caption", caption);

      for (let pair of formData.entries()) {
        console.log(pair);
      }

      if (file && user) {
        console.log("file: ", file);
        formData.append("media", file);

        formData.append("caption", caption);
        formData.append("userId", user._id);

        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        if (file.mimeType.includes("video")) {
          await fetch(`${API_BASE_URL}/api/video/upload`, {
            method: "POST",
            body: formData,
            headers: {},
            credentials: "include",
          });
        } else if (file.mimeType.includes("image")) {
          await fetch(`${API_BASE_URL}/api/image/upload`, {
            method: "POST",
            body: formData,
            headers: {},
            credentials: "include",
          });
        }
      }
      setUploading(false);
      router.push("/home");
    } catch (error) {
      console.log("Error uploading: ", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Media</Text>

        <FormField
          title="Caption"
          value={caption}
          placeholder="Caption..."
          handleChangeText={(e) => setCaption({ ...caption, caption: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Media
          </Text>

          <TouchableOpacity onPress={() => openPicker()}>
            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
              <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                <Image
                  source={
                    <Icon
                      name="upload"
                      size={30}
                      color="#fffff"
                      className="mx-5"
                    />
                  }
                  resizeMode="contain"
                  alt="upload"
                  className="w-1/2 h-1/2"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
