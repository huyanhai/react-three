import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useLanguage } from "@/store/languageStore";

import RouteTable from "./router";

const App = () => {
  const { i18n } = useTranslation();
  const { language } = useLanguage();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <RouteTable />
    </>
  );
};

export default App;
