describe("Conference Service", function() {
  // get conferences app module, have to provide the user service
  // so that it gets injected into the conferences service
  beforeEach(module('confencesApp'), function($provide) {
    $provide.value('userService');
  });

  // get the conference service
  beforeEach(inject(function($injector) {
    // use the injector to obtain the service
    service = $injector.get('conferenceService');
    // login
    $injector.get('userService').login({
      email: "a@a.com",
      password: "1234"
    });
  }));

  /*
   * Specs
   */

  it("should add a new conference", function() {
    spyOn(service.conferences, '$add').and.callThrough();
    var conf = {
      name          : "test",
      description   : "test",
      place         : "alabama",
      deadline      : 0,
      notification  : 0,
      event         : 0
    };
    service.createOrUpdate(conf);
    expect(service.conferences.$add).toHaveBeenCalled();
  });

  it("should edit a conference", function() {
    var conf = {
      name          : "test",
      description   : "test",
      place         : "alabama",
      deadline      : 0,
      notification  : 0,
      event         : 0
    };
    service.setCurrentConference(conf);
    service.currentConference.name = "test1";
    service.createOrUpdate(conf);
    expect(service.currentConference.name).toEqual("test1");
  });

  it("should filter conferences by name", function() {
    var filtered = service.filterByName("con");
    expect(filtered.length).toBeLessThan(service.conferences.length + 1); // less or eq than
  });

  it("should get the next 10 conferences by date", function() {
    var confs = [];
    service.getNextTen(function(arr) {
      confs = arr;
    });
    expect(confs.length).toBeLessThan(11);
  });
});
