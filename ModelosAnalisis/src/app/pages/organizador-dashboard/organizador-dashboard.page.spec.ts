import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizadorDashboardPage } from './organizador-dashboard.page';

describe('OrganizadorDashboardPage', () => {
  let component: OrganizadorDashboardPage;
  let fixture: ComponentFixture<OrganizadorDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizadorDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
