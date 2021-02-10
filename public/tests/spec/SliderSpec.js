var fixture = null;
beforeEach(function () {
  loadFixtures('slider.html');
  fixture = $('#jquery-slideshow');
  fixture.slider();
  spyOn($.fn, "animate");
});

afterEach(function () {
  $('#jquery-slideshow').remove();
});

describe('slider', function() {
  it('to be defined', function() {
    expect( fixture ).toBeDefined();
  });
  it('adjust main ul width', function() {
    let item_width = fixture.parent().outerWidth();
    expect( fixture.width() ).toBe( item_width * fixture.children("li").length );
  });

  describe('slider events', function() {
    it("click prev", function() {
      var spyEvent = spyOnEvent('#jquery-slideshow-container #btn-prev', 'click' );
      $('#jquery-slideshow-container #btn-prev').click();
      expect( 'click' ).toHaveBeenTriggeredOn( '#jquery-slideshow-container #btn-prev' );
      expect( spyEvent ).toHaveBeenTriggered();
      expect($.fn.animate).toHaveBeenCalled();
    });
    it("click next", function() {
      var spyEvent = spyOnEvent('#jquery-slideshow-container #btn-next', 'click' );
      $('#jquery-slideshow-container #btn-next').click();
      expect( 'click' ).toHaveBeenTriggeredOn( '#jquery-slideshow-container #btn-next' );
      expect( spyEvent ).toHaveBeenTriggered();
      expect($.fn.animate).toHaveBeenCalled();
    });
  });
});