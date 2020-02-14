import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;

  links = [
    {
      route: 'homePage',
      label: 'Accueil'
    },
    {
      route: 'libraryList',
      label: 'Bibliothèque'
    },
    {
      route: 'gardenList',
      label: 'Mes jardins'
    },
    {
      route: 'login',
      label: 'Login'
    },
    {
      route: 'userAccount',
      label: 'Mon Compte'
    }
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
}
