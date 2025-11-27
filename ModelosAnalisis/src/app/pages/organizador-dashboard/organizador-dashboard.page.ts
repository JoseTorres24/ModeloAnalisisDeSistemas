// organizador-dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonButton,
  IonIcon,
  IonBadge,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonCheckbox
} from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  calendarOutline, 
  peopleOutline, 
  checkmarkDoneOutline,
  addOutline,
  qrCodeOutline,
  documentTextOutline,
  closeOutline,
  pricetagOutline,
  schoolOutline,
  statsChartOutline,
  timeOutline,
  locationOutline,
  informationCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-organizador-dashboard',
  templateUrl: './organizador-dashboard.page.html',
  styleUrls: ['./organizador-dashboard.page.scss'],
  imports: [
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle,
    IonButton,
    IonIcon,
    IonBadge,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonCheckbox,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class OrganizadorDashboardPage implements OnInit {
  // Datos de ejemplo
  totalEvents = 23;
  totalAttendees = 1420;
  approvedEvents = 18;
  
  recentEvents = [
    { name: 'Foro de Ingeniería', date: '2025-02-20', attendees: 120, status: 'approved' },
    { name: 'Congreso Cultural', date: '2025-02-18', attendees: 85, status: 'approved' },
    { name: 'Taller de Programación', date: '2025-02-15', attendees: 45, status: 'pending' },
    { name: 'Seminario de Matemáticas', date: '2025-02-12', attendees: 60, status: 'approved' },
    { name: 'Exposición de Arte', date: '2025-02-10', attendees: 200, status: 'rejected' }
  ];

  // Estados de modales
  isCreateEventModalOpen = false;
  isAssistantsModalOpen = false;
  isQRModalOpen = false;
  isReportModalOpen = false;

  // Formularios
  eventForm: FormGroup;
  assistantForm: FormGroup;

  // Datos para QR
  selectedEvent: number | null = null;
  generatedQR: string | null = null;

  eventsForQR = [
    { id: 1, name: 'Foro de Ingeniería' },
    { id: 2, name: 'Congreso Cultural' },
    { id: 3, name: 'Taller de Programación' }
  ];

  constructor(private fb: FormBuilder) {
    // Registrar todos los iconos
    addIcons({
      calendarOutline,
      peopleOutline,
      checkmarkDoneOutline,
      addOutline,
      qrCodeOutline,
      documentTextOutline,
      closeOutline,
      pricetagOutline,
      schoolOutline,
      statsChartOutline,
      timeOutline,
      locationOutline,
      informationCircleOutline
    });

    // Inicializar formulario de evento
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required],
      capacity: [''],
      cost: ['0'],
      studentCost: ['0'],
      isPublic: [true],
      requiresApproval: [false]
    });

    // Inicializar formulario de asistente
    this.assistantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit() {}

  // Métodos para abrir/cerrar modales
  openCreateEventModal() {
    this.isCreateEventModalOpen = true;
  }

  closeCreateEventModal() {
    this.isCreateEventModalOpen = false;
    this.eventForm.reset({
      isPublic: true,
      requiresApproval: false,
      cost: '0',
      studentCost: '0'
    });
  }

  openAssistantsModal() {
    this.isAssistantsModalOpen = true;
  }

  closeAssistantsModal() {
    this.isAssistantsModalOpen = false;
    this.assistantForm.reset();
  }

  openQRModal() {
    this.isQRModalOpen = true;
    this.selectedEvent = null;
    this.generatedQR = null;
  }

  closeQRModal() {
    this.isQRModalOpen = false;
  }

  openReportModal() {
    this.isReportModalOpen = true;
  }

  closeReportModal() {
    this.isReportModalOpen = false;
  }

  // Métodos de formularios
  onEventSubmit() {
    if (this.eventForm.valid) {
      console.log('Evento creado:', this.eventForm.value);
      // Aquí iría la lógica para guardar el evento
      this.closeCreateEventModal();
      
      // Simular actualización de estadísticas
      this.totalEvents++;
      this.approvedEvents++;
      
      // Agregar evento a la lista reciente
      this.recentEvents.unshift({
        name: this.eventForm.value.title,
        date: this.eventForm.value.date,
        attendees: 0,
        status: 'pending'
      });
    }
  }

  onAssistantSubmit() {
    if (this.assistantForm.valid) {
      console.log('Asistente agregado:', this.assistantForm.value);
      // Aquí iría la lógica para guardar el asistente
      this.closeAssistantsModal();
      
      // Simular actualización de estadísticas
      this.totalAttendees++;
    }
  }

  // Método para generar QR
  generateQR() {
    if (this.selectedEvent) {
      // En una implementación real, aquí se generaría el QR
      // Por ahora simulamos con una imagen de ejemplo
      this.generatedQR = 'assets/images/qr-example.png';
      console.log('QR generado para evento:', this.selectedEvent);
    }
  }

  // Métodos para reportes
  generateGeneralReport() {
    console.log('Generando reporte general...');
    // Lógica para generar reporte general
    this.downloadReport('reporte-general');
  }

  generateEventsReport() {
    console.log('Generando reporte de eventos...');
    // Lógica para generar reporte de eventos
    this.downloadReport('reporte-eventos');
  }

  generateAttendeesReport() {
    console.log('Generando reporte de asistentes...');
    // Lógica para generar reporte de asistentes
    this.downloadReport('reporte-asistentes');
  }

  private downloadReport(reportName: string) {
    // Simular descarga de reporte
    console.log(`Descargando ${reportName}...`);
    // En una implementación real, aquí se generaría y descargaría el archivo
  }

  // Utilidades
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'approved': 'Aprobado',
      'pending': 'Pendiente',
      'rejected': 'Rechazado'
    };
    return statusMap[status] || status;
  }

  // Método para formatear números grandes
  formatNumber(num: number): string {
    return num.toLocaleString('es-MX');
  }

  // Método para obtener el porcentaje de eventos aprobados
  getApprovalRate(): number {
    return Math.round((this.approvedEvents / this.totalEvents) * 100);
  }

  // Método para obtener iconos según el estado
getStatusIcon(status: string): string {
  const iconMap: { [key: string]: string } = {
    'approved': 'checkmark-circle-outline',
    'pending': 'time-outline',
    'rejected': 'close-circle-outline'
  };
  return iconMap[status] || 'help-circle-outline';
}
}