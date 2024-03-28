import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "../fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";

export const metadata = {
  title: "Precedent - Building blocks for your Next.js project",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFF",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cx(sfPro.variable, inter.variable)}>
        <Theme>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
            <Suspense fallback="...">
              <Nav />
            </Suspense>
            <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
              {children}
            </main>
            <Footer />
            <Analytics />
          </NextIntlClientProvider>
        </Theme>
      </body>
    </html>
  );
}
