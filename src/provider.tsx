import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { FC, ReactNode } from "react";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
};

export default Providers;
