import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonIcon, IonButton, IonSearchbar, IonItem, IonLabel, IonCheckbox, IonSelect, IonSelectOption, IonSpinner, IonRadio, IonInput } from '@ionic/angular/standalone';
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
  chevronForwardOutline
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

@Component({
  selector: 'app-todos-eventos',
  standalone: true,
  templateUrl: './todos-eventos.page.html',
  styleUrls: ['./todos-eventos.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonIcon,
    IonButton,
    IonSearchbar,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonRadio,
    IonInput
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

  constructor() {
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
      'chevron-forward-outline': chevronForwardOutline
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    // Simular carga de datos
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
          image: 'assets/images/congreso-computacion.jpg',
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
          image: 'assets/images/danza-folklorica.jpg',
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
          image: 'assets/images/torneo-futbol.jpg',
          costo: 0,
          cupoTotal: 500,
          cupoDisponible: 350,
          exclusivoUANL: true,
          isFavorite: false,
          dependencia: 'deportes'
        },
        // Agrega más eventos según necesites
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
      // Filtro por búsqueda de texto
      const matchesSearch = !this.searchTerm || 
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtro por categoría
      const matchesCategory = this.filters.categories[event.category as keyof typeof this.filters.categories];

      // Filtro por acceso
      const matchesAccess = (event.exclusivoUANL && this.filters.access.estudiantes) ||
                           (!event.exclusivoUANL && this.filters.access.todos);

      // Filtro por costo
      const matchesCost = this.filters.costo === 'todos' ||
                         (this.filters.costo === 'gratuito' && event.costo === 0) ||
                         (this.filters.costo === 'pago' && event.costo > 0);

      // Filtro por dependencia
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
        // Ordenar por fecha más próxima (simulado)
        this.filteredEvents.sort((a, b) => a.id - b.id);
        break;
      case 'populares':
        // Ordenar por cupo disponible (menos disponible = más popular)
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
    // Aquí podrías guardar el estado en una base de datos
  }

  openEventDetails(event: Event) {
    // Implementar navegación a detalles del evento
    console.log('Abrir detalles del evento:', event);
  }

  handleImageError(event: any) {
    const img = event.target;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2Yzc1N2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
    img.alt = 'Imagen no disponible';
  }
}
