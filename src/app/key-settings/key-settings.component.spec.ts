import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySettingsComponent } from './key-settings.component';

describe('KeySettingsComponent', () => {
  let component: KeySettingsComponent;
  let fixture: ComponentFixture<KeySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
