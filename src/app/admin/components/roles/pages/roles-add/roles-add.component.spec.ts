/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RolesAddComponent } from './roles-add.component';

describe('RolesAddComponent', () => {
  let component: RolesAddComponent;
  let fixture: ComponentFixture<RolesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
