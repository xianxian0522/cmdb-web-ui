import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesCommonEditComponent } from './resources-common-edit.component';

describe('ResourcesCommonEditComponent', () => {
  let component: ResourcesCommonEditComponent;
  let fixture: ComponentFixture<ResourcesCommonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesCommonEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesCommonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
