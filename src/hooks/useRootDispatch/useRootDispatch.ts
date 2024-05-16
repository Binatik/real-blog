import { RootDispatch } from "@src/app/store";
import { useDispatch } from "react-redux";

export const useRootDispatch: () => RootDispatch = useDispatch;
