import { currentModal } from "./currentModal";
import { Modals } from "./modalConfig";

const useModal = <P>(name: Modals) => {
  return {
    open: (props: P) => {
      currentModal.set({ name, props });
    },
    close: () => {
      currentModal.set(null);
    },
  };
};

export default useModal;
