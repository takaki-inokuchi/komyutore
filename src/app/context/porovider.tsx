"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type MenuStage = "topPage" | "selectMenu";

interface ContextType {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  menuStage: MenuStage;
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuStage, setMenuStage] = useState<MenuStage>("topPage");
  return (
    <Context.Provider
      value={{
        showMenu,
        setShowMenu,
        menuStage,
        setMenuStage,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const UseMenuContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("UseMenuContext must be used within a Provider");
  return context;
};
export default UseMenuContext;
