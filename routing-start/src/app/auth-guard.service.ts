import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, satate: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.authService.isAuthenticated()
        .then(
            (authenticated: boolean) => {
                if(this.authService) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                }
            }
        )
    }
}