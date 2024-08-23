import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoproductoComponent } from './infoproducto.component';

describe('InfoproductoComponent', () => {
  let component: InfoproductoComponent;
  let fixture: ComponentFixture<InfoproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoproductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
