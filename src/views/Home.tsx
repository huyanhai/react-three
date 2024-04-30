import { LanguageType, useLanguage } from "@/store/languageStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();

  const [langList] = useState([
    {
      text: "中文",
      code: LanguageType.zh,
    },
    {
      text: "英文",
      code: LanguageType.en,
    },
    {
      text: "日文",
      code: LanguageType.ja,
    },
  ]);
  return (
    <>
      <div className="flex w-screen h-screen flex-col">
        <p className="text-5xl text-center my-10 text-cyan-900">{t("hello")}</p>
        <div className="flex justify-center">
          {langList.map((item) => {
            return (
              <button v-for="item in langList" key={item.code} className="text-cyan-700 mx-2" onClick={() => changeLanguage(item.code)}>
                {item.text}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
