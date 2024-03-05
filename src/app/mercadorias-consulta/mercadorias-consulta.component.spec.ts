import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoriasConsultaComponent } from './mercadorias-consulta.component';

describe('MercadoriasConsultaComponent', () => {
  let component: MercadoriasConsultaComponent;
  let fixture: ComponentFixture<MercadoriasConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercadoriasConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MercadoriasConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
