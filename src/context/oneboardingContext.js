import { createContext, useState } from "react";

export const OneBoardingContext = createContext();

export function OneBoardingProvider({ children }) {
  const [oneboardingVisible, setOneboardingVisible] = useState(false);

  return (
    <OneBoardingContext.Provider
      value={{ oneboardingVisible, setOneboardingVisible }}
    >
      {children}
    </OneBoardingContext.Provider>
  );
}
