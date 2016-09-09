function partyMember(name, dvMod, init){
  var self = this;

  self.name = name;
  self.initials = ko.computed(function(){return self.name.charAt(0).toUpperCase();});
  self.dvMod = ko.observable(dvMod);
  self.init = ko.observable(init);
}

function CombatWheelViewModel() {
  var self = this;

  self.party = ko.observableArray([
    new partyMember("Lexi", 0, 0),
    new partyMember("Ian", 0, 0),
    new partyMember("Ed", 0, 0),
    new partyMember("Mark", 0, 0),
    new partyMember("Ryan", 0, 0)
  ]);

  self.addPartyMember = function(){
    self.party.push(new partyMember("unnamed", 0, 0));
  };

  self.removePartyMember = function(member){
    self.party.remove(member)
  };
}

ko.applyBindings(new CombatWheelViewModel());