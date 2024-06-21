import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanTaskcardsComponent } from './kanban-taskcards.component';

describe('KanbanTaskcardsComponent', () => {
  let component: KanbanTaskcardsComponent;
  let fixture: ComponentFixture<KanbanTaskcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanTaskcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanTaskcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
