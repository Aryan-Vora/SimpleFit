import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import Onboarding from "../components/Onboarding";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    // If user is logged in, redirect to home screen
    // router.push("/Home");
  }, []);

  return <Onboarding />;
}
