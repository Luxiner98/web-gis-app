import { Dkp } from "./client/Dkp";
import { Tegola } from "./client/Tegola";

export const ApiTegola = new Tegola({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const ApiDkp = new Dkp({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
