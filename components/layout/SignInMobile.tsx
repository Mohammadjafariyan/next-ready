import { Formik } from "formik";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function SignInMobile() {
  const t = useTranslations("Common");
  const [mobile, setmobile] = useState("");
  const [IsOtpSent, setIsOtpSent] = useState(false);

  const handleSendOTP = () => {
    fetch("/api/otp")
      .then((response) => {
        if (!response.ok) {
          throw new Error(t("Network response was not ok"));
        }
        return response.json();
      })
      .then((data) => {
        // Handle the JSON response data
        console.log(data);

        setIsOtpSent(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-5 md:px-16">
      <Formik
        initialValues={{ mobile: "", otp: "" }}
        validate={(values: any) => {
          const errors: any = {};
          if (!values.mobile) {
            errors.mobile = t("Required");
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="space-y-6">
            {IsOtpSent && (
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  {t("otp")}:
                </label>
                <div className="mt-2">
                  <input
                    style={{ textAlign: "center" }}
                    type="number"
                    name="otp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            {!IsOtpSent && (
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  {t("Mobile")}:
                </label>
                <div className="mt-2">
                  <input
                    style={{ textAlign: "center" }}
                    type="number"
                    name="otp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.otp}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <div>
              {IsOtpSent && (
                <button
                  onClick={() => signIn("credentials", { mobile: mobile })}
                  type="button"
                  className="flex  w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("login")}
                </button>
              )}

              {!IsOtpSent && (
                <button
                  onClick={() => handleSendOTP()}
                  type="button"
                  className="flex  w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("send sms")}
                </button>
              )}
            </div>
          </form>
        )}
      </Formik>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a
          href="#"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Start a 14 day free trial
        </a>
      </p>
    </div>
  );
}
