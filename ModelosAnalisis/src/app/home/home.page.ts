import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonBadge,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSearchbar,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  search, 
  qrCode, 
  shieldCheckmark, 
  phonePortrait,
  refresh,
  location,
  call,
  mail
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonBadge,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSearchbar,
    IonIcon,
    RouterLink
  ]
})
export class HomePage {
  constructor() {
    // Registrar todos los iconos que vas a usar
    addIcons({
      search,
      'qr-code': qrCode,
      'shield-checkmark': shieldCheckmark,
      'phone-portrait': phonePortrait,
      refresh,
      location,
      call,
      mail
    });
  }
}