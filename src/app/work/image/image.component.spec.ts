import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageComponent } from './image.component';
import { listPortrait } from '../image.service.spec';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let element;
  const expectedImage = listPortrait[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    
    component.image = expectedImage;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();

    let image1 = fixture.debugElement.query(By.css('.image img')).nativeElement;
    let image2 = fixture.debugElement.query(By.css('.expand img')).nativeElement;
    let span = fixture.debugElement.query(By.css('.expand span')).nativeElement;

    expect(image1.getAttribute('class')).toBe('image1');
    expect(image1.getAttribute('src')).toBe(expectedImage.url);
    expect(image1.getAttribute('alt')).toBe(expectedImage.fileName);
    expect(image2.getAttribute('class')).toBe('image2');
    expect(image2.getAttribute('src')).toBe(expectedImage.thumbUrl);
    expect(span.textContent).toBe(expectedImage.text);
    
    // console.info('native', image2Span.textContent);
  });
});
