import { Modals, modalsConfig } from "./modalConfig";

type Handler = (modal: CurrentModal<unknown> | null) => void;

const subs: Set<Handler> = new Set();
let modal: CurrentModal<unknown> | null;

export const currentModal = {
  subscribe(handler: Handler): () => void {
    if (typeof handler === "function") {
      subs.add(handler);
    }

    return () => {
      subs.delete(handler);
    };
  },
  set(current: CurrentModal<unknown> | null) {
    modal = current;
    subs.forEach((handler) => {
      handler(modal);
    });
  },
  get(modals: Modals) {
    return modalsConfig[modals] ?? null;
  },
};

export type CurrentModal<P> = {
  name: Modals;
  props: P;
};
