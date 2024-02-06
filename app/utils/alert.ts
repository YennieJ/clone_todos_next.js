import { toast } from "react-toastify";

export const alertSuccess = (msg: string) => toast.success(msg);

export const alertFail = (msg: string) => toast.error(msg);
