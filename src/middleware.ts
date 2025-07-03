export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/dashboard",
    "/build/:path*",
    "/my-resumes/:path*",
    "/templates/:path*",
  ],
};
