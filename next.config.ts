import type { NextConfig } from "next";
import path from "path/win32";

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
