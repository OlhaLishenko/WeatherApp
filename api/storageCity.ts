import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useAsyncStorage<P>(key: string, defaultValue: P[]) {
  const [value, setValue] = useState<P[]>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);

        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        }
      } catch {
        setValue(defaultValue);
      } finally {
        setIsLoading(false);
      }
    };

    loadValue();
  }, [key]);

  const saveInStorage = async (newValue: P) => {
    try {
      setValue((prev) => {
        const updatedValue = [...prev, newValue];
        AsyncStorage.setItem(key, JSON.stringify(updatedValue));
        return updatedValue;
      });
    } catch {
      throw new Error("Error saving value");
    }
  };

  const deleteFromStorage = async (valuetoDelete: P) => {
    try {
      setValue((prev) => {
        const filteredStorage = [...prev].filter(
          (city) => JSON.stringify(city) !== JSON.stringify(valuetoDelete),
        );
        AsyncStorage.setItem(key, JSON.stringify(filteredStorage));
        return filteredStorage;
      });
    } catch {
      throw new Error("Error deleting value");
    }
  };

  return {
    value,
    saveInStorage,
    deleteFromStorage,
    isLoading,
  } as const;
}
