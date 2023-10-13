import { createContext, useState } from "react";

export const OneBoardingContext = createContext();

export function OneBoardingProvider({ children }) {
  const [oneboardingVisible, setOneboardingVisible] = useState(false);
  const [userCustomData, setUserCustomData] = useState();
  const [gridSentenceView, setGridSentenceView] = useState(false);

  return (
    <OneBoardingContext.Provider
      value={{
        oneboardingVisible,
        setOneboardingVisible,
        userCustomData,
        setUserCustomData,
        gridSentenceView,
        setGridSentenceView,
      }}
    >
      {children}
    </OneBoardingContext.Provider>
  );
}
