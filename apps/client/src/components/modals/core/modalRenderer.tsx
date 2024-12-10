import { Suspense, useEffect, useState } from "react";
import { currentModal, CurrentModal } from "./currentModal";

export default function ModalRenderer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modal, updateCurrentModal] = useState<CurrentModal<any> | null>(null);

  useEffect(() => currentModal.subscribe(updateCurrentModal), []);

  if (modal) {
    const Modal = currentModal.get(modal.name);

    return (
      <Suspense>
        <Modal {...modal?.props} />
      </Suspense>
    );
  }

  return null;
}
