import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
  IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonLabel, IonBadge, IonAvatar, IonList
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonItem, IonLabel, IonBadge, IonAvatar, IonList
  ]
})
export class AdminDashboardPage {
  pendingEvents = [
    {
      titulo: 'Semana de la Física 2023',
      dependencia: 'FCFM',
      fecha: '25-30 Nov 2023',
      descripcion: 'Varios talleres y conferencias especializadas'
    },
    {
      titulo: 'Festival de Danza Folklórica',
      dependencia: 'Facultad de Música',
      fecha: '18 Nov 2023',
      descripcion: 'Presentación de grupos estudiantiles'
    },
    {
      titulo: 'Torneo de Debate Interfacultades',
      dependencia: 'Facultad de Derecho',
      fecha: '22 Nov 2023',
      descripcion: 'Competencia de oratoria y debate'
    }
  ];

  organizadores = [
    {
      nombre: 'Lic. Ana Martínez',
      dependencia: 'FCFM',
      email: 'org.fcfm@uanl.edu.mx',
      activo: true
    },
    {
      nombre: 'Dr. Carlos Ruiz',
      dependencia: 'Facultad de Medicina',
      email: 'org.medicina@uanl.edu.mx',
      activo: true
    },
    {
      nombre: 'Mtro. José López',
      dependencia: 'Facultad de Derecho',
      email: 'org.derecho@uanl.edu.mx',
      activo: false
    }
  ];

  topDependencias = [
    { nombre: 'Facultad de Medicina', eventos: 28, asistentes: 3500, ingresos: 45200 },
    { nombre: 'FCFM', eventos: 24, asistentes: 2800, ingresos: 38500 },
    { nombre: 'Facultad de Derecho', eventos: 18, asistentes: 1200, ingresos: 15600 },
    { nombre: 'Facultad de Ingeniería Mecánica', eventos: 15, asistentes: 900, ingresos: 11200 },
    { nombre: 'Facultad de Contaduría', eventos: 12, asistentes: 750, ingresos: 8900 }
  ];

  recentActivity = [
    {
      action: 'Nuevo evento creado',
      details: 'Taller de Redacción - Facultad de Filosofía',
      time: 'Hace 5 min',
      icon: 'add-circle-outline',
      color: 'success'
    },
    {
      action: 'Evento aprobado',
      details: 'Congreso de Medicina',
      time: 'Hace 15 min',
      icon: 'checkmark-done-outline',
      color: 'primary'
    },
    {
      action: 'Nuevo organizador registrado',
      details: 'Facultad de Arquitectura',
      time: 'Hace 30 min',
      icon: 'person-add-outline',
      color: 'warning'
    },
    {
      action: 'Pago procesado',
      details: '$2,500 - Concierto Sinfónico',
      time: 'Hace 1 hora',
      icon: 'card-outline',
      color: 'success'
    }
  ];
}