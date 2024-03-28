import { useLocale, useTranslations } from "next-intl";
import { locales } from "./language.config";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { Select } from "@radix-ui/themes";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {locales.map((cur) => (
        <Select.Item key={cur} value={cur}>
          {" "}
          {t("locale", { locale: cur })}
        </Select.Item>
      ))}
    </LocaleSwitcherSelect>
  );
}
