import { FlowPage } from './app.po';

describe('flow App', function() {
  let page: FlowPage;

  beforeEach(() => {
    page = new FlowPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
