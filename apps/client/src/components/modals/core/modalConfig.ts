import React from "react";
import AuthModal from "../authModal";

export enum Modals {
  Auth,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalsConfig: Record<Modals, React.ComponentType<any>> = {
  [Modals.Auth]: AuthModal,
};
