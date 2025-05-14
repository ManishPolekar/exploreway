import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth: Auth = inject(Auth);
    private firestore: Firestore = inject(Firestore);
    private router: Router = inject(Router);
    private loggedInUserSubject = new BehaviorSubject<User | null>(null);
    public loggedInUser$: Observable<User | null> = this.loggedInUserSubject.asObservable();

    constructor() {
        onAuthStateChanged(this.auth, (user) => {
            this.loggedInUserSubject.next(user);
            if (user) {
                this.router.navigate(['/dashboard']); // Redirect on auth state change
            } else {
                this.router.navigate(['/login']);
            }
        });
    }

    async signUp(email: string, password: string, username: string, profilePicBase64: string | null): Promise<void> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const userId = userCredential.user?.uid;
            if (userId) {
                const userDocRef = doc(this.firestore, `users/${userId}`);
                await setDoc(userDocRef, { id: userId, username, email, profilePic: profilePicBase64 });
            }
        } catch (error: any) {
            throw error; // Re-throw the error for the component to handle
        }
    }

    async login(email: string, password: string): Promise<void> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            // The onAuthStateChanged in the constructor will handle the navigation
        } catch (error: any) {
            throw error; // Re-throw the error
        }
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
    }

    async sendPasswordResetEmail(email: string): Promise<void> {
        await sendPasswordResetEmail(this.auth, email);
    }

    getUserData(uid: string): Promise<any> {
        const userDocRef = doc(this.firestore, `users/${uid}`);
        return getDoc(userDocRef).then(snapshot => snapshot.data());
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedInUser$.pipe(
            map(user => !!user)
        );
    }
}