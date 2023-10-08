import { createContext, useState } from "react";

export const OneBoardingContext = createContext();

export function OneBoardingProvider({ children }) {
  const [oneboardingVisible, setOneboardingVisible] = useState(false);
  const [userCustomData, setUserCustomData] = useState();

  return (
    <OneBoardingContext.Provider
      value={{ oneboardingVisible, setOneboardingVisible, userCustomData, setUserCustomData }}
    >
      {children}
    </OneBoardingContext.Provider>
  );
}
