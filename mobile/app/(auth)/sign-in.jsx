import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { signinUser } from "../../redux/features/user/user.action";
import logo from "../../assets/logo";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ret, setRet] = useState("");
  const userError = useAppSelector((state) => state.user.error);

  const dispatch = useAppDispatch();

  const submit = () => {
    try {
      dispatch(signinUser(form));
      if (userError) {
        return;
      }
      router.push("/home");
    } catch (error) {
      console.log("failed: ", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          {/* <Text>{ret}</Text> */}
          <Image
            source={logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login in to Lens Loop
          </Text>
          <FormField
            title="Username"
            id="username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            id="password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign in"
            handlePress={submit}
            ContainerStyle="mt-7"
            isLoading={isSubmitting}
          />

          {/* <View className="justify-center pt-5 flex-row gap-2">
            <Text className={"text-lg text-gray-100 font-pregular"}>
              Don't have account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
