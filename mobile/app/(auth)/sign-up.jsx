// import { View, Text, ScrollView, Image } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import FormField from "../../components/FormField";
// import CustomButton from "../../components/CustomButton";
// import { Link } from "expo-router";
// import logo from "../../assets/logo";

// const SignUp = () => {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const submit = () => {};
//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <ScrollView>
//         <View className="w-full justify-center min-h-[85vh] px-4 my-6">
//           <Image
//             source={"/logo.png"}
//             resizeMode="contain"
//             className="w-[115px] h-[35px]"
//           />

//           <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
//             Sign up
//           </Text>
//           <FormField
//             title="Username"
//             id="username"
//             value={form.username}
//             handleChangeText={(e) => setForm({ ...form, username: e })}
//             otherStyles="mt-7"
//           />
//           <FormField
//             title="Email"
//             id="email"
//             value={form.email}
//             handleChangeText={(e) => setForm({ ...form, email: e })}
//             otherStyles="mt-7"
//           />
//           <FormField
//             title="Password"
//             id="password"
//             value={form.password}
//             handleChangeText={(e) => setForm({ ...form, password: e })}
//             otherStyles="mt-7"
//           />
//           <CustomButton
//             title="Sign Up"
//             handlePress={submit}
//             ContainerStyle="mt-7"
//             isLoading={isSubmitting}
//           />

//           <View className="justify-center pt-5 flex-row gap-2">
//             <Text className={"text-lg text-gray-100 font-pregular"}>
//               Have an account already?
//             </Text>
//             <Link
//               href={"/sign-in"}
//               className="text-lg font-psemibold text-secondary"
//             >
//               Sign In
//             </Link>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default SignUp;
