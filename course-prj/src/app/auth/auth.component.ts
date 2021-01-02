import { Component, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    constructor(private authService: AuthService, private router: Router) {}
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(authData => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            console.log(authData);
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            // this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });

        form.reset();   
    }

    onHandleError() {
        this.error = null;
    }

    // private showErrorAlert(message: string) {
    //     // const alertCmp = new AlertComponent();
    //     const alertComponent = this.componenetFactoryResolver.resolveComponentFactory(AlertComponent);

    //     const hostViewContainerRef = this.alertHost.viewContainerRef;
    //     hostViewContainerRef.clear();

    //     hostViewContainerRef.createComponent(alertComponent);
    // }
}