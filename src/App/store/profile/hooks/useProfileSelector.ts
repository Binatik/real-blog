import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { ProfileState } from "../store";

export const useProfileSelector: TypedUseSelectorHook<ProfileState> =
  useSelector;
