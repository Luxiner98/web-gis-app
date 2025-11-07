import { Tegola } from "./client/Tegola";

export const ApiTegola = new Tegola({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
