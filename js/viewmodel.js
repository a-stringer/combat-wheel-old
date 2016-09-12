function PartyMember(name, dvMod, init){
  var self = this;

  self.name = name;
  self.dvMod = ko.observable(dvMod);
  self.init = ko.observable(init);
};


function CombatWheelViewModel() {
  var self = this;

  self.party = ko.observableArray([
    new PartyMember("Lexi", 0, 0),
    new PartyMember("Ian", 0, 0),
    new PartyMember("Ed", 0, 0),
    new PartyMember("Mark", 0, 0),
    new PartyMember("Ryan", 0, 0)
  ]);

  self.inBattle = ko.observableArray();

  self.initiatives = ko.computed(function(){
    var inits = '';
    for (i = 0; i < self.inBattle().length; i++) {
      inits += self.inBattle()[i][0].init() + ",";
    }
    console.log(inits);
  });


  self.addPartyMember = function(){
    self.party.push(new PartyMember("unnamed", 0, 0));
  };

  self.removePartyMember = function(member){
    self.party.remove(member)
  };

  self.joinBattle = function(member){
    var index = self.party.indexOf(member);
    self.inBattle.push(self.party.slice(index, (index + 1)));
    //console.log(self.inBattle()[0][0].init());
  }

}

ko.applyBindings(new CombatWheelViewModel());