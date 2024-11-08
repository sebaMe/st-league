import { KeyFilter, onKeyStroke, useFocusWithin } from "@vueuse/core";
import { ShallowRef } from "vue";

export const useKeyStrokeNoFocus = (
  keyFilter: KeyFilter,
  inputGroupElement: Readonly<ShallowRef<HTMLElement | null>>,
  cb: (e: KeyboardEvent) => void
) => {
  const { focused } = useFocusWithin(inputGroupElement);

  onKeyStroke(keyFilter, (e) => {
    if (focused.value === false) {
      cb(e);
    }
  });
};
