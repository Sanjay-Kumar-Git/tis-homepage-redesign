import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True after hydration. Avoids setState-in-effect for client-only rendering. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
