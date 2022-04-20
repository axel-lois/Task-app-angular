import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(public loginService: LoginService) {}

  ngOnInit(): void {}

  onLogout(): void {
    Swal.fire({
      title: 'Log out',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No, I'm not",
    }).then((res) => {
      if (res.isConfirmed) {
        this.loginService.logout();
        Swal.fire({
          title: 'Success',
          text: 'You have successfully logged out',
          icon: 'success',
        }).then((res) => {
          window.location.reload();
        });
      } else if (
        /* Read more about handling dismissals below */
        res.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Logout cancelled',
          icon: 'error',
          text: 'You did not log out',
        });
      }
    });
  }
}
