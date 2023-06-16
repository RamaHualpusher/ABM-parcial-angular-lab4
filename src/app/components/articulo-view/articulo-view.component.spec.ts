import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloViewComponent } from './articulo-view.component';

describe('ArticuloViewComponent', () => {
  let component: ArticuloViewComponent;
  let fixture: ComponentFixture<ArticuloViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticuloViewComponent]
    });
    fixture = TestBed.createComponent(ArticuloViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
