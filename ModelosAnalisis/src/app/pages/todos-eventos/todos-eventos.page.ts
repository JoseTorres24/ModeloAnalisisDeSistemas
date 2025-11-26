import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonIcon, 
  IonButton, IonSearchbar, IonItem, IonLabel, IonCheckbox, IonSelect, IonSelectOption, 
  IonSpinner, IonRadio, IonInput, IonHeader, IonToolbar, IonTitle, IonButtons, IonChip, 
  IonAvatar, IonModal, IonAccordionGroup, IonAccordion, IonAlert
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  filterOutline,
  refreshOutline,
  calendarOutline,
  timeOutline,
  locationOutline,
  heartOutline,
  heart,
  peopleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  personAddOutline,
  logInOutline,
  schoolOutline,
  closeOutline,
  personOutline,
  logOutOutline,
  informationCircleOutline,
  cashOutline,
  cardOutline,
  downloadOutline,
  checkmarkOutline,
  checkmarkCircle,
  shieldCheckmarkOutline,
  lockClosedOutline,
  funnelOutline
} from 'ionicons/icons';

interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  image: string;
  costo: number;
  cupoTotal: number;
  cupoDisponible: number;
  exclusivoUANL: boolean;
  isFavorite: boolean;
  dependencia: string;
}

interface User {
  id: number;
  nombre: string;
  email: string;
  tipo: 'externo' | 'estudiante' | 'organizador' | 'admin';
}

@Component({
  selector: 'app-todos-eventos',
  standalone: true,
  templateUrl: './todos-eventos.page.html',
  styleUrls: ['./todos-eventos.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    IonHeader, IonToolbar, IonTitle, IonButtons,
    IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonBadge, IonIcon, IonButton, IonSearchbar, 
    IonItem, IonLabel, IonCheckbox, IonSelect, IonSelectOption,
    IonSpinner, IonRadio, IonInput,
    IonChip, IonAvatar, IonModal, IonAccordionGroup, IonAccordion, IonAlert
  ]
})
export class TodosEventosPage implements OnInit {
  loading = true;
  allEvents: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm = '';
  
  filters = {
    categories: {
      academico: true,
      cultural: true,
      deportivo: true,
      otros: true
    },
    access: {
      todos: true,
      estudiantes: true
    },
    fecha: 'todas',
    dependencia: 'todas',
    costo: 'todos',
    ubicacion: 'todas'
  };
  
  sortBy = 'recientes';
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;

  currentUser: User | null = null;
  showRegisterModal = false;
  showLoginModal = false;
  showUANLAuthModal = false;
  showEventDetailModal = false;
  showSuccessModal = false;
  showAuthRequiredModal = false;
  selectedEvent: Event | null = null;
  
  registerForm: FormGroup;
  loginForm: FormGroup;
  uanlAuthForm: FormGroup;

  constructor(private fb: FormBuilder) {
    addIcons({
      'filter-outline': filterOutline,
      'refresh-outline': refreshOutline,
      'calendar-outline': calendarOutline,
      'time-outline': timeOutline,
      'location-outline': locationOutline,
      'heart-outline': heartOutline,
      'heart': heart,
      'people-outline': peopleOutline,
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'funnel-outline': funnelOutline,
      'person-add-outline': personAddOutline,
      'log-in-outline': logInOutline,
      'school-outline': schoolOutline,
      'close-outline': closeOutline,
      'person-outline': personOutline,
      'log-out-outline': logOutOutline,
      'information-circle-outline': informationCircleOutline,
      'cash-outline': cashOutline,
      'card-outline': cardOutline,
      'download-outline': downloadOutline,
      'checkmark-outline': checkmarkOutline,
      'checkmark-circle': checkmarkCircle,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'lock-closed-outline': lockClosedOutline
    });

    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });

    this.uanlAuthForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/.*@uanl\.edu\.mx$/)]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadEvents();
    this.checkExistingSession();
  }

  loadEvents() {
    setTimeout(() => {
      this.allEvents = [
        {
          id: 1,
          title: 'Congreso de Ciencias Computacionales',
          description: 'Evento académico para estudiantes de computación con ponentes internacionales y workshops especializados.',
          category: 'academico',
          date: '15 Nov 2023',
          time: '09:00 AM',
          location: 'Auditorio Central',
          image: 'https://picsum.photos/400/300?random=1',
          costo: 0,
          cupoTotal: 200,
          cupoDisponible: 150,
          exclusivoUANL: false,
          isFavorite: false,
          dependencia: 'fcfm'
        },
        {
          id: 2,
          title: 'Festival de Danza Folklórica',
          description: 'Presentación de grupos estudiantiles de danza folklórica de toda la república mexicana.',
          category: 'cultural',
          date: '18 Nov 2023',
          time: '06:00 PM',
          location: 'Teatro Universitario',
          image: 'https://picsum.photos/400/300?random=2',
          costo: 50,
          cupoTotal: 300,
          cupoDisponible: 120,
          exclusivoUANL: false,
          isFavorite: true,
          dependencia: 'musica'
        },
        {
          id: 3,
          title: 'Torneo Interfacultades de Fútbol',
          description: 'Competencia deportiva entre facultades. Gran final y premiación especial.',
          category: 'deportivo',
          date: '22 Nov 2023',
          time: '04:00 PM',
          location: 'Estadio Universitario',
          image: 'https://picsum.photos/400/300?random=3',
          costo: 0,
          cupoTotal: 500,
          cupoDisponible: 350,
          exclusivoUANL: true,
          isFavorite: false,
          dependencia: 'deportes'
        },
      ];
      
      this.filteredEvents = [...this.allEvents];
      this.calculatePagination();
      this.loading = false;
    }, 1000);
  }

  handleSearch(event: any) {
    this.searchTerm = event.detail.value || '';
    this.applyFilters();
  }

  onKeywordChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.allEvents.filter(event => {
      const matchesSearch = !this.searchTerm || 
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = this.filters.categories[event.category as keyof typeof this.filters.categories];

      const matchesAccess = (event.exclusivoUANL && this.filters.access.estudiantes) ||
                           (!event.exclusivoUANL && this.filters.access.todos);

      const matchesCost = this.filters.costo === 'todos' ||
                         (this.filters.costo === 'gratuito' && event.costo === 0) ||
                         (this.filters.costo === 'pago' && event.costo > 0);

      const matchesDependencia = this.filters.dependencia === 'todas' || 
                                event.dependencia === this.filters.dependencia;

      return matchesSearch && matchesCategory && matchesAccess && matchesCost && matchesDependencia;
    });

    this.filteredEvents = filtered;
    this.currentPage = 1;
    this.calculatePagination();
    this.sortEvents();
  }

  clearFilters() {
    this.filters = {
      categories: {
        academico: true,
        cultural: true,
        deportivo: true,
        otros: true
      },
      access: {
        todos: true,
        estudiantes: true
      },
      fecha: 'todas',
      dependencia: 'todas',
      costo: 'todos',
      ubicacion: 'todas'
    };
    this.searchTerm = '';
    this.sortBy = 'recientes';
    this.applyFilters();
  }

  sortEvents() {
    switch (this.sortBy) {
      case 'recientes':
        this.filteredEvents.sort((a, b) => b.id - a.id);
        break;
      case 'proximos':
        this.filteredEvents.sort((a, b) => a.id - b.id);
        break;
      case 'populares':
        this.filteredEvents.sort((a, b) => 
          (a.cupoTotal - a.cupoDisponible) - (b.cupoTotal - b.cupoDisponible)
        );
        break;
      case 'alfabetico':
        this.filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  get paginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEvents.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getCategoryText(category: string): string {
    const categories: { [key: string]: string } = {
      'academico': 'Académico',
      'cultural': 'Cultural',
      'deportivo': 'Deportivo',
      'otros': 'Otros'
    };
    return categories[category] || category;
  }

  toggleFavorite(event: Event) {
    event.isFavorite = !event.isFavorite;
  }

  openEventDetails(event: Event) {
    this.selectedEvent = event;
    this.showEventDetailModal = true;
  }

  handleImageError(event: any) {
    const img = event.target;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2Yzc1N2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
    img.alt = 'Imagen no disponible';
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  openLoginModal() {
    this.showLoginModal = true;
  }

  openUANLAuthModal() {
    this.showUANLAuthModal = true;
  }

  switchToLogin() {
    this.showRegisterModal = false;
    setTimeout(() => this.showLoginModal = true, 300);
  }

  switchToRegister() {
    this.showLoginModal = false;
    setTimeout(() => this.showRegisterModal = true, 300);
  }

  switchToUANLAuth() {
    this.showRegisterModal = false;
    setTimeout(() => this.showUANLAuthModal = true, 300);
  }

  switchToUANLAuthFromLogin() {
    this.showLoginModal = false;
    setTimeout(() => this.showUANLAuthModal = true, 300);
  }

  switchToLoginFromUANL() {
    this.showUANLAuthModal = false;
    setTimeout(() => this.showLoginModal = true, 300);
  }

  registerUser() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.currentUser = {
        id: 1,
        nombre: userData.nombre,
        email: userData.email,
        tipo: 'externo'
      };
      
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.showRegisterModal = false;
      this.registerForm.reset();
      this.presentToast('¡Registro exitoso! Bienvenido/a ' + userData.nombre);
    }
  }

  loginUser() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      
      if (loginData.email === 'usuario@gmail.com' && loginData.password === 'password123') {
        this.currentUser = {
          id: 2,
          nombre: 'Usuario Externo',
          email: loginData.email,
          tipo: 'externo'
        };
      } else {
        this.currentUser = {
          id: Date.now(),
          nombre: loginData.email.split('@')[0],
          email: loginData.email,
          tipo: 'externo'
        };
      }
      
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.showLoginModal = false;
      this.loginForm.reset();
      this.presentToast('¡Bienvenido de nuevo!');
    }
  }

  authenticateUANL() {
    if (this.uanlAuthForm.valid) {
      const authData = this.uanlAuthForm.value;
      
      const testCredentials = {
        'estudiante@uanl.edu.mx': { 
          nombre: 'Juan Pérez', 
          tipo: 'estudiante' as const
        },
        'org.fcfm@uanl.edu.mx': { 
          nombre: 'Organizador FCFM', 
          tipo: 'organizador' as const 
        },
        'admin@uanl.edu.mx': { 
          nombre: 'Administrador', 
          tipo: 'admin' as const 
        }
      };

      const userInfo = testCredentials[authData.email as keyof typeof testCredentials];
      
      if (userInfo && authData.password === 'uanl123') {
        this.currentUser = {
          id: 3,
          nombre: userInfo.nombre,
          email: authData.email,
          tipo: userInfo.tipo
        };
        
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.showUANLAuthModal = false;
        this.uanlAuthForm.reset();
        this.presentToast(`¡Bienvenido ${userInfo.nombre}! (${userInfo.tipo})`);
        
        if (this.selectedEvent) {
          setTimeout(() => {
            this.registerToEvent(this.selectedEvent!);
          }, 500);
        }
      } else {
        this.presentToast('Credenciales UANL incorrectas', 'danger');
      }
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.presentToast('Sesión cerrada correctamente');
  }

  checkExistingSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  handleEventRegistration(event: Event) {
    this.selectedEvent = event;
    
    console.log('Intentando registrar en evento:', event.title);
    console.log('Usuario actual:', this.currentUser);
    console.log('Evento exclusivo UANL:', event.exclusivoUANL);

    if (!this.currentUser) {
      console.log('No hay usuario, mostrando modal de autenticación requerida');
      this.showAuthRequiredModal = true;
      return;
    }

    if (event.exclusivoUANL && this.currentUser.tipo !== 'estudiante') {
      console.log('Evento exclusivo UANL, usuario no es estudiante');
      this.showUANLAuthModal = true;
      return;
    }

    console.log('Usuario autenticado, mostrando detalles del evento');
    this.showEventDetailModal = true;
  }

  confirmRegistration(event: Event) {
    this.selectedEvent = event;
    
    if (!this.currentUser) {
      this.showEventDetailModal = false;
      this.showAuthRequiredModal = true;
      return;
    }
    
    if (event.exclusivoUANL && this.currentUser.tipo !== 'estudiante') {
      this.showEventDetailModal = false;
      this.showUANLAuthModal = true;
      return;
    }
    
    this.registerToEvent(event);
  }

  registerToEvent(event: Event) {
    console.log('Registrando al evento:', event.title);
    
    this.showEventDetailModal = false;
    this.showUANLAuthModal = false;
    this.showAuthRequiredModal = false;
    
    setTimeout(() => {
      this.showSuccessModal = true;
    }, 300);
  }

  presentToast(message: string, color: string = 'success') {
    console.log(`[${color.toUpperCase()}] ${message}`);
    
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${color === 'success' ? '#2dd36f' : '#eb445a'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }
}