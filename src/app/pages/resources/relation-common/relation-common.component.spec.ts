import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationCommonComponent } from './relation-common.component';

describe('RelationCommonComponent', () => {
  let component: RelationCommonComponent;
  let fixture: ComponentFixture<RelationCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
