import axios from "axios";
import { env } from "@/env";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

export default api;