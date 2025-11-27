import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonItem, IonLabel, IonInput, IonButton, 
  IonIcon, IonCheckbox, IonSegment, IonSegmentButton,
  IonAccordionGroup, IonAccordion
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  schoolOutline, shieldCheckmarkOutline, peopleOutline,
  informationCircleOutline, arrowBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonItem, IonLabel, IonInput, IonButton,
    IonIcon, IonCheckbox, IonSegment, IonSegmentButton,
    IonAccordionGroup, IonAccordion, RouterLink
  ]
})
export class AdminLoginPage {
  userType: 'admin' | 'organizador' = 'admin';

  constructor() {
    addIcons({
      'school-outline': schoolOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'people-outline': peopleOutline,
      'information-circle-outline': informationCircleOutline,
      'arrow-back-outline': arrowBackOutline
    });
  }
}