import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoriasEdicaoComponent } from './mercadorias-edicao.component';

describe('MercadoriasEdicaoComponent', () => {
  let component: MercadoriasEdicaoComponent;
  let fixture: ComponentFixture<MercadoriasEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercadoriasEdicaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MercadoriasEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
