"use client";

import { Message } from "../components/talkPage";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
type MenuStage = "topPage" | "selectMenu" | "talkPage";

interface ContextType {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  menuStage: MenuStage;
  setMenuStage: Dispatch<SetStateAction<MenuStage>>;
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
  aiName: string;
  setAiName: Dispatch<SetStateAction<string>>;
  purpose: string;
  setPurpose: Dispatch<SetStateAction<string>>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuStage, setMenuStage] = useState<MenuStage>("topPage");
  const [gender, setGender] = useState<string>("");
  const [aiName, setAiName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  return (
    <Context.Provider
      value={{
        showMenu,
        setShowMenu,
        menuStage,
        setMenuStage,
        gender,
        setGender,
        aiName,
        setAiName,
        purpose,
        setPurpose,
        messages,
        setMessages,
        input,
        setInput,
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
