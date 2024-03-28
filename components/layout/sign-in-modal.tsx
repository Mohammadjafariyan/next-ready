import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import { SignInMobile } from "./SignInMobile";
import { EmailSignIn } from "./EmailSignIn";

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Sign in using credentials provider
      await signIn("credentials", { email, password });

      // Redirect user to dashboard or other page upon successful login
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  const [signInMethod, setsignInMethod] = useState(2);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev">
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only your email and profile
            picture will be stored.
          </p>
        </div>

        {signInMethod == 1 && <EmailSignIn></EmailSignIn>}
        {signInMethod == 2 && <SignInMobile></SignInMobile>}

        {signInMethod != 1 && (
          <div className="flex flex-col space-y-4 bg-gray-50 px-4  md:px-16">
            <button
              className="flex h-10 w-full items-center justify-center space-x-3 rounded-md border border border-gray-200 bg-white text-sm text-black shadow-sm transition-all duration-75 hover:bg-gray-50 focus:outline-none"
              onClick={() => setsignInMethod(1)}
            >
              Sign in with Email{" "}
            </button>
          </div>
        )}

        {signInMethod != 2 && (
          <div className="flex flex-col space-y-4 bg-gray-50 px-4  md:px-16">
            <button
              className="flex h-10 w-full items-center justify-center space-x-3 rounded-md border border border-gray-200 bg-white text-sm text-black shadow-sm transition-all duration-75 hover:bg-gray-50 focus:outline-none"
              onClick={() => setsignInMethod(2)}
            >
              Sign in with Mobile{" "}
            </button>
          </div>
        )}

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("google");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Google className="h-5 w-5" />
                <p>Sign In with Google</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
