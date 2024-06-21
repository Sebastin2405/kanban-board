import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanModalsComponent } from './kanban-modals.component';

describe('KanbanModalsComponent', () => {
  let component: KanbanModalsComponent;
  let fixture: ComponentFixture<KanbanModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanModalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
