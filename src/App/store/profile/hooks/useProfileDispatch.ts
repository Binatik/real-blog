import { useDispatch } from "react-redux";
import type { ProfileDispatch } from "../store";

export const useProfileDispatch: () => ProfileDispatch = useDispatch;
