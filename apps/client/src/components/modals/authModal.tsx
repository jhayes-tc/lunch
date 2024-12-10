import { useState } from "react";
import Modal from "./core/modal";
import {
  useCreateAccountMutation,
  useLazyGetAvailableReviewersQuery,
  useLoginMutation,
} from "../../services/authSlice";

const AuthModal = ({ onClose }: AuthModalProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState<
    string | undefined
  >();
  const [login] = useLoginMutation();
  const [createAccount] = useCreateAccountMutation();
  const { data: availableReviewers } = useLazyGetAvailableReviewersQuery();

  const onSubmit = () => {
    if (isSignup) {
      createAccount({ email: "", password: "", reviewerId: 1 });
    } else {
      login({ email: "", password: "" });
    }
  };

  return (
    <Modal open onClose={onClose} closeOnOutsideClick>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm p-6 text-primary rounded-lg">
          <div className="mb-6 border border-primary text-2xl font-bold text-center flex justify-around">
            <button
              type="button"
              className={`w-full py-2 ${isSignup ? "bg-primary text-white" : "bg-neutral text-primary"}`}
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </button>
            <button
              type="button"
              className={`w-full py-2 ${isSignup ? "bg-neutral text-primary" : "bg-primary text-white"}`}
              onClick={() => setIsSignup(false)}
            >
              Login
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full input input-bordered"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full input input-bordered"
                required
              />
            </div>
            {isSignup && (
              <div>
                <label className="block text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full input input-bordered"
                  required
                />
              </div>
            )}
            <button
              type="button"
              onClick={onSubmit}
              className="w-full btn btn-primary"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login here."
                : "Don't have an account? Sign up here."}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export interface AuthModalProps {
  onClose: () => void;
}

export default AuthModal;
