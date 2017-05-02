import { NgJoanneLeePage } from './app.po';

describe('ng-joanne-lee App', () => {
  let page: NgJoanneLeePage;

  beforeEach(() => {
    page = new NgJoanneLeePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
