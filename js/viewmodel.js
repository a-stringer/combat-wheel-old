function playerCharacter(name, dvMod, joinBattle){
  var self = this;

  self.name = name;
  self.dvMod = ko.observable(dvMod);
  self.joinBattle = ko.observable(joinBattle);
}

function AppViewModel() {
  self.party = ko.observableArray([
    new playerCharacter("Lexi", 0, 0),
    new playerCharacter("Ian", 0, 0),
    new playerCharacter("Ed", 0, 0),
    new playerCharacter("Mark", 0, 0),
    new playerCharacter("Ryan", 0, 0)
  ]);

}

ko.applyBindings(new AppViewModel());