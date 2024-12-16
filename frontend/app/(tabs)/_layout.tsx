import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="Home">
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="Example"
        options={{
          title: "Example",
        }}
      />
    </Tabs>
  );
}
