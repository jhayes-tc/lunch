import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import Modal from "./core/modal";
import {
  AvailableReviewers,
  useCreateAccountMutation,
  useGetAvailableReviewersQuery,
  useLoginMutation,
} from "../../services/authSlice";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";

const AuthModal = ({ onClose }: AuthModalProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<AvailableReviewers | null>();
  const [login] = useLoginMutation();
  const [createAccount] = useCreateAccountMutation();
  const { data: availableReviewers, isLoading: reviewersLoading } = useGetAvailableReviewersQuery();

  const onSubmit = () => {
    if (isSignup) {
      createAccount(
        {
          email,
          password,
          reviewerId: selectedPerson === undefined || selectedPerson === null || selectedPerson.id === -1 ? undefined : selectedPerson.id,
          reviewerName: selectedPerson === undefined || selectedPerson === null || selectedPerson.id === -1 ? newName : undefined
        });
    } else {
      login({ email, password });
    }
  };

  return (
    <Modal open onClose={onClose} closeOnOutsideClick>
      <div className="flex items-center justify-center w-96 h-96">
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
            <label className="input input-bordered flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4 opacity-70" />
              <input type="text" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <KeyIcon className="h-4 w-4 opacity-70" />
              <input type="password" className="grow" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {isSignup && (
              <>
                <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                  <ListboxButton className="w-full border rounded p-2 flex">{selectedPerson?.name ?? 'Select to connect'}</ListboxButton>
                  <ListboxOptions anchor="bottom" className="z-10 bg-neutral max-h-72 rounded overflow-y-auto flex flex-col justify-start w-56">
                    <ListboxOption key={-1} value={{ id: -1, name: "New" }} className="data-[focus]:bg-blue-900 p-2 py-0 italic">
                      New Reviewer
                    </ListboxOption>
                    {reviewersLoading ? <span /> : <>{availableReviewers!.map((person) => (
                      <ListboxOption key={person.id} value={person} className="data-[focus]:bg-blue-900 p-2">
                        {person.name}
                      </ListboxOption>
                    ))}</>}
                  </ListboxOptions>
                </Listbox>
                {selectedPerson && selectedPerson.id === -1 && <div>
                  <label className="block text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full input input-bordered"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>}
              </>
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
