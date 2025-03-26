import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";
type TRole = keyof typeof roleBasePrivateRoute;
const authRoute = ["/login", "/register"];
const roleBasePrivateRoute = {
    user: [/^\/user/, /^\/create-shop/],
    admin: [/^\/admin/],
};
export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        if (authRoute.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(
                    `http://localhost:3000/login?redirectPath=${pathname}`,
                    request.url
                )
            );
        }
    }
    if (currentUser?.role && roleBasePrivateRoute[currentUser.role as TRole]) {
        const routes = roleBasePrivateRoute[currentUser.role as TRole];
        if (routes?.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }
    return NextResponse.redirect(new URL("/", request.url));
};
export const config = {
    matcher: [
        "/create-shop",
        "/admin",
        "/admin/:page",
        "/users",
        "/users/:page",
    ],
};
