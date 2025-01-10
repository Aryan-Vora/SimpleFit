import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="Account">
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
        }}
      />
      <Tabs.Screen
        name="MacroTracker"
        options={{
          title: "Macro Tracker",
        }}
      />
      <Tabs.Screen
        name="WorkoutTracker"
        options={{
          title: "WorkoutTracker",
        }}
      />
      <Tabs.Screen
        name="Progress"
        options={{
          title: "Progress",
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
