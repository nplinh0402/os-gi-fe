import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (!token) {
      return this.router.createUrlTree(["/login"], {
        queryParams: { returnUrl: state.url },
      });
    }

    const requiredRoles = route.data["roles"] as string[];

    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some((role) =>
        requiredRoles.includes(role)
      );

      if (!hasRole) {
        return this.router.createUrlTree(["/login"]);
      }
    }

    return true;
  }
}
