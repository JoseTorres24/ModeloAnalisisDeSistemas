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
  // Por ahora este componente es principalmente visual.
  // Cuando quieras trasladar la lógica (filtros, carga real de eventos,
  // autenticación) lo hacemos como servicios y modales de Ionic.
}
