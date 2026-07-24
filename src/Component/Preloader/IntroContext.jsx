import React, { createContext, useContext } from "react";

const IntroReadyContext = createContext(true);

export function IntroReadyProvider({ ready, children }) {
  return (
    <IntroReadyContext.Provider value={ready}>
      {children}
    </IntroReadyContext.Provider>
  );
}

export function useIntroReady() {
  return useContext(IntroReadyContext);
}
