import { ShowKEYPage } from './app.po';

describe('show-key App', () => {
  let page: ShowKEYPage;

  beforeEach(() => {
    page = new ShowKEYPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
