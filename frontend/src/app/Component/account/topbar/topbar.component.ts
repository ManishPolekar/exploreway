import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.isLoggedIn = !!user;
    });
  }
}
