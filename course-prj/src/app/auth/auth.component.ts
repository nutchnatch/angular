import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromAuth from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;

    constructor(
            private store: Store<fromAuth.AppState>
        ) {}
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            //  this.error = "ERRRRRR";
            console.log('onInit, error: ' + this.error)
            // if(this.error) {
            //     this.isLoading = false;
            // }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        if(this.isLoginMode) {
            // authObs = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
        } else {
            this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
            // authObs = this.authService.signup(email, password);
        }

        // authObs.subscribe(authData => {
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes']);
        //     console.log(authData);
        // }, errorMessage => {
        //     console.log(errorMessage);
        //     this.error = errorMessage;
        //     // this.showErrorAlert(errorMessage);
        //     this.isLoading = false;
        // });
        

        form.reset();   
    }

    onHandleError() {
        console.log('habdloing error')
        this.store.dispatch(new AuthActions.ClearError());
    }

    // private showErrorAlert(message: string) {
    //     // const alertCmp = new AlertComponent();
    //     const alertComponent = this.componenetFactoryResolver.resolveComponentFactory(AlertComponent);

    //     const hostViewContainerRef = this.alertHost.viewContainerRef;
    //     hostViewContainerRef.clear();

    //     hostViewContainerRef.createComponent(alertComponent);
    // }

    ngOnDestroy() {
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}