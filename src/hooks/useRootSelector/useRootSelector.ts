import { RootState } from "@src/app/store";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
