function PartyMember(name, dvMod, init){
  var self = this;

  self.name = name;
  self.dvMod = ko.observable(dvMod);
  self.init = ko.observable(init);
};


function CombatWheelViewModel() {
  var self = this;

  self.party = ko.observableArray([
    new PartyMember("Lexi", 0, 1),
    new PartyMember("Ian", 0, 2),
    new PartyMember("Ed", 0, 3),
    new PartyMember("Mark", 0, 4),
    new PartyMember("Ryan", 0, 5)
  ]);

  self.inBattle = ko.observableArray();

  self.addPartyMember = function(){
    self.party.push(new PartyMember("unnamed", 0, 0));
  };

  self.removePartyMember = function(member){
    self.party.remove(member)
  };

  self.joinBattle = function(member){
    var index = self.party.indexOf(member);
    self.inBattle.push(self.party.slice(index, (index + 1)));
  }
  self.startBattle = function(){
    var highestInit = 0;
    for (i = 0; i < self.inBattle().length; i++) {
      highestInit = (highestInit < self.inBattle()[i][0].init()) ? self.inBattle()[i][0].init() : highestInit;
    }
    for (i = 0; i < self.inBattle().length; i++) {
      self.inBattle()[i][0].init(Math.abs((self.inBattle()[i][0].init()) - highestInit));
    }
  };

}

ko.applyBindings(new CombatWheelViewModel());