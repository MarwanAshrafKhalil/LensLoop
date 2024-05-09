import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import Icon from "react-native-vector-icons/AntDesign";

const tabsData = [
  {
    name: "Home",
    icon: <Icon name="home" size={30} color="#161622" className="mx-5" />,
  },

  {
    name: "Create",
    icon: <Icon name="plus" size={30} color="#161622" className="mx-5" />,
  },
];

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={`${color}`}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"}
         text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#161622",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#0000",
            height: 100,
          },
        }}
      >
        {tabsData.map((item, index) => (
          <Tabs.Screen
            key={index}
            name={item.name.toLowerCase()}
            options={{
              title: item.name,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={item.icon}
                  color={color}
                  name={item.name}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
