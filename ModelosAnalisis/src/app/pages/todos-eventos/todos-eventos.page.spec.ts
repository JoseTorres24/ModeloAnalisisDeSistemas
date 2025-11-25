import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosEventosPage } from './todos-eventos.page';

describe('TodosEventosPage', () => {
  let component: TodosEventosPage;
  let fixture: ComponentFixture<TodosEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
