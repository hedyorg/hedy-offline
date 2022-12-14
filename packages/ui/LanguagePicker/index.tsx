import { Listbox } from "@headlessui/react";
import React from "react";
import { GrFormCheckmark } from "react-icons/gr";
import { IoEarthOutline } from "react-icons/io5";

interface LanguagePickerProps {
  languages: string[];
  lang: string;
  setLang: (lang: string) => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ languages, lang, setLang }) => {
  return (
    <Listbox value={lang} horizontal>
      {({ open }) => (
        <div>
          <Listbox.Button>
            <IoEarthOutline className={`text-neutral-100 transition-all hover:text-neutral-300 hover:rotate-45 ${open ? "text-neutral-300 rotate-45" : ""}`} size={"24px"} />
          </Listbox.Button>
          <Listbox.Options className="flex absolute z-50 shadow-2xl overflow-hidden rounded-lg right-4 bg-gray-50  flex-col">
            {languages.map((language) => (
              <Listbox.Option key={language} value={language}>
                {({ selected }) => (
                  <li className={`group cursor-pointer font-mono hover:bg-blue-500 }`}>
                    <button onClick={() => setLang(language)}>
                      <div className="px-4 group-first:pt-2 group-last:pb-2 py-1">
                        <div className="flex gap-2 items-center">
                          <div className={`${selected ? "opacity-100" : "opacity-0"}`}>
                            <GrFormCheckmark size={24} />
                          </div>
                          {getLanguage(language)}
                        </div>
                      </div>
                    </button>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};

const getLanguage = (language: string) => {
  switch (language) {
    case "en":
      return "English";
    case "nl":
      return "Nederlands";
    case "fr":
      return "Français";
    case "de":
      return "Deutsch";
    default:
      return "Unknown Language";
  }
};

export default LanguagePicker;
