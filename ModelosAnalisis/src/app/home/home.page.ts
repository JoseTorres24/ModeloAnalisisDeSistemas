import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonToolbar,
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
  mail,
  calendarOutline,
  timeOutline,
  locationOutline,
  heartOutline,
  listOutline,
  qrCodeOutline,
  flashOutline,
  lockClosedOutline,
  mailOutline,
  playOutline,
  checkmarkCircle,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonToolbar,
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
      mail,
      'calendar-outline': calendarOutline,
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'heart-outline': heartOutline,
      'list-outline': listOutline,
      'qr-code-outline': qrCodeOutline,
      'flash-outline': flashOutline,
      'lock-closed-outline': lockClosedOutline,
      'mail-outline': mailOutline,
      'play-outline': playOutline,
      'checkmark-circle': checkmarkCircle,

    });
  }
    handleImageError(event: any) {
    const img = event.target;
    // Imagen de placeholder genérica
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2Yzc1N2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
    img.alt = 'Imagen no disponible';
  }


}