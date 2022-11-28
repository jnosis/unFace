import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type TechContextType = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const TechContext = createContext<TechContextType>({
  selected: '',
  setSelected: () => {},
});

export function TechContextProvider({ children }: PropsWithChildren) {
  const [selected, setSelected] = useState<string>('');

  return (
    <TechContext.Provider value={{ selected, setSelected }}>
      {children}
    </TechContext.Provider>
  );
}

export function useTechContext() {
  return useContext(TechContext);
}
