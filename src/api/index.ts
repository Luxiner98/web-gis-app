import { Dkp } from "./client/Dkp";

export const ApiDKP = new Dkp({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  paramsSerializer: { indexes: null },
});
