import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: "",
    logo: "",
    phone: "",
    email: "",
    whatsapp: "",
    address: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    twitter: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/settings"
      );

      setSettings(res.data);
    } catch (error) {
      console.error("Settings fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};