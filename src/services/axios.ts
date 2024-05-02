import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "nookies";
require("dotenv").config();

export function getAPIClient(ctx?: any) {
  const { "cal.token": token } = parseCookies(ctx);
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Max-Age": 8000,
    },
    params: {
      secretToken: process.env.NEXT_PUBLIC_SECRET_TOKEN,
    },
    timeoutErrorMessage: "60",
  });

  api.interceptors.request.use((config) => {
    console.log(config);
	return config;
  });

  if (token) {
    api.defaults.headers["authorization"] = `Bearer ${token}`;
  }

  return api;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", "*");
  }
  return response;
}
