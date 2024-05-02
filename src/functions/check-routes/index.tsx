//importação api's e framewotks

//importação componentes
import { APP_ROUTES } from "@/constants/app-routes";

//importação imagens

export const checkIsPublicRoute = (asPath: string) => {
  const appPublicRoutes = Object.values(APP_ROUTES.public);

  return appPublicRoutes.includes(asPath);
};

export const checkIsAdminRoute = (asPath: string) => {
  const appAdminRoutes = Object.values(APP_ROUTES.ADMIN);

  return appAdminRoutes.includes(asPath);
};
