import { Component, OnInit, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router'; // Import the Router

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    isLogin = true;
    isLoggedIn = false;
    isForgotPassword = false;
    loggedInUser: string | null = null;
    userId: string | null = null;

    username: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    resetEmail: string = '';
    profilePicBase64: string | null = null;
    profilePic: string | null = null;
    showPassword: boolean = false;

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    auth: Auth = inject(Auth);
    firestore: Firestore = inject(Firestore);
    router: Router = inject(Router); // Inject the Router

    ngOnInit(): void {
        // Check if the user is already logged in when the component initializes
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.userId = user.uid;
                this.isLoggedIn = true;
                this.fetchUserData(this.userId);
                // Redirect to a dashboard or another logged-in area
                this.router.navigate(['/dashboard']); // Replace '/dashboard' with your desired route
            } else {
                this.isLoggedIn = false;
                this.loggedInUser = null;
                this.userId = null;
                this.profilePic = null;
            }
        });
    }

    toggleForm() {
        this.isLogin = !this.isLogin;
        this.isForgotPassword = false;
    }

    toggleForgotPassword() {
        this.isForgotPassword = !this.isForgotPassword;
    }

    async onSubmit() {
        if (this.isLogin) {
            await this.login();
        } else {
            await this.signUp();
        }
    }

    async signUp() {
        if (this.password !== this.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
            this.userId = userCredential.user?.uid;

            if (this.userId) {
                const userDocRef = doc(this.firestore, `users/${this.userId}`);
                await setDoc(userDocRef, {
                    id: this.userId,
                    username: this.username,
                    email: this.email,
                    profilePic: this.profilePicBase64
                });

                alert('Sign up successful! Please log in.');
                this.isLogin = true;
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    async login() {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
            this.userId = userCredential.user?.uid;

            if (this.userId) {
                await this.fetchUserData(this.userId);
                this.isLoggedIn = true;
                // Redirect to a dashboard or another logged-in area
                this.router.navigate(['/dashboard']); // Replace '/dashboard' with your desired route
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    async fetchUserData(uid: string) {
        const userDocRef = doc(this.firestore, `users/${uid}`);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as { username?: string, email?: string, profilePic?: string };
            this.loggedInUser = userData.username || 'User';
            this.email = userData.email || '';
            this.profilePic = userData.profilePic || null;
        }
    }

    async resetPassword() {
        if (!this.resetEmail) return alert("Please enter your email!");

        try {
            await sendPasswordResetEmail(this.auth, this.resetEmail);
            alert("Password reset link sent! Check your email.");
            this.toggleForgotPassword();
        } catch (error: any) {
            alert(error.message);
        }
    }

    async logout() {
        await signOut(this.auth);
        this.isLoggedIn = false;
        this.loggedInUser = null;
        this.userId = null;
        this.profilePic = null;
        this.router.navigate(['/login']); // Redirect back to login page after logout
        alert('Logged out successfully!');
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.profilePicBase64 = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }
}