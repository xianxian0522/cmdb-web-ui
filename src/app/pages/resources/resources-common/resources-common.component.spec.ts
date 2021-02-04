import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesCommonComponent } from './resources-common.component';

describe('ResourcesCommonComponent', () => {
  let component: ResourcesCommonComponent;
  let fixture: ComponentFixture<ResourcesCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
