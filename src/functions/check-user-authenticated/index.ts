//importação api's e framewotks
import { parseCookies } from "nookies";

//importação componentes

//importação imagens

export const checkUserAuthenticated = () => {
  const { ["seg.token"]: token } = parseCookies();

  return !!token;
};
