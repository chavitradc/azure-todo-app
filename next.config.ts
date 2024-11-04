import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DELETE_KEY: process.env.NEXT_PUBLIC_DELETE_KEY,
    NEXT_PUBLIC_GET_KEY: process.env.NEXT_PUBLIC_GET_KEY,
    NEXT_PUBLIC_PUT_KEY: process.env.NEXT_PUBLIC_PUT_KEY,
    NEXT_PUBLIC_POST_KEY: process.env.NEXT_PUBLIC_POST_KEY,
    
  },
};

export default nextConfig;