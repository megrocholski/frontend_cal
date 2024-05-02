import { UserBack } from "@/app/interfaces/User";
import { APP_ROUTES } from "@/constants/app-routes";
import {
  checkIsAdminRoute,
  checkIsPublicRoute,
} from "@/functions/check-routes";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { ReactNode, useEffect } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  pathname: string;
}

const PrivateRoute = ({ children, pathname }: PrivateRouteProps) => {
  const { push } = useRouter();
  const isAuthenticated = checkUserAuthenticated();
  let access = false;

  useEffect(() => {
    if (!isAuthenticated) {
      push(APP_ROUTES.public.login);
    } else {
      const { ["seg.token"]: token } = parseCookies();
      var decoded: UserBack = jwtDecode(token);
      access = checkIsAdminRoute(pathname);

      if (!access) {
        push(APP_ROUTES.ADMIN.telaInicial);
      }
    }
  }, [isAuthenticated, push]);

  return (
    <>
      {!isAuthenticated && null}
      {!access && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
