import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
  Generated class for the AuthSProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthSProvider {
	user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

	signInWithGoogle() {
			return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					let user = result.user;
					console.log(user, token);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	get authenticated(): boolean {
  	return this.user !== null;
	}

	getEmail() {
  	return this.user && this.user.email;
	}

	signOut(): Promise<void> {
  	return this.afAuth.auth.signOut();
	}
}
