function PartyMember(name, dvMod, init){
  var self = this;

  self.name = ko.observable(name);
  self.dvMod = ko.observable(dvMod);
  self.init = ko.observable(init);
};

function BattleTick(tickNo, actsOnThisTick){
  var self = this;

  self.tickNo = tickNo;
  self.actsOnThisTick = ko.observableArray();
};

function CombatWheelViewModel() {
  var self = this;

  self.isBattleRunning = ko.observable(false);
  self.currentTick = ko.observable();

  self.party = ko.observableArray([
    new PartyMember("Lexi", 0, 1),
    new PartyMember("Ben", 0, 2),
    new PartyMember("Guy", 0, 3),
    new PartyMember("Bash", 0, 4),
    new PartyMember("Cole", 0, 5)
  ]);

  self.battleOrder = ko.observableArray([
    new BattleTick(0),
    new BattleTick(1),
    new BattleTick(2),
    new BattleTick(3),
    new BattleTick(4),
    new BattleTick(5),
    new BattleTick(6),
    new BattleTick(7)
  ]);

  self.inBattle = ko.observableArray();

  // Operations
  self.addPartyMember = function(){
    self.party.push(new PartyMember("unnamed", 0, 0));
  };

  self.removePartyMember = function(member){
    self.party.remove(member)
  };

  self.joinBattle = function(member){
    var index = self.party.indexOf(member);
    var name = self.party()[index].name();
    if (self.inBattle.indexOf())
    {}else{}
    self.inBattle.push(self.party.slice(index, (index + 1)));
  };

  self.startBattle = function(){
    self.isBattleRunning(true);
    self.convertInits();
    self.placeCombatants();
    self.goToTick(0);
  };

  self.endBattle = function(){
    self.isBattleRunning(false);
    self.removeCombatants();
  };

  self.inputEnabled = function(){
    if (self.isBattleRunning() === false || self.currentTick === self.inBattle.indexOf(self.name)){
      return true;
    }else{
      return false;
    }
  };

  self.convertInits = function(){
    var highestInit = 0;
    for (i = 0; i < self.inBattle().length; i++) {
      highestInit = (highestInit < self.inBattle()[i][0].init()) ? self.inBattle()[i][0].init() : highestInit;
    }
    for (i = 0; i < self.inBattle().length; i++) {
      self.inBattle()[i][0].init(Math.abs((self.inBattle()[i][0].init()) - highestInit));
    }
  };

  self.placeCombatants = function(){
    for (i = 0; i < self.inBattle().length; i++) {
      console.log(self.inBattle()[i]);
      var newInit = self.inBattle()[i][0].init();
      var combatant = self.inBattle()[i][0].name();
      self.battleOrder()[newInit].actsOnThisTick.push(combatant);
    }
  };

  self.removeCombatants = function(){
    self.inBattle.removeAll();
  };

  self.goToTick = function(currentTick){
    self.currentTick(currentTick);
    for (i = 0; i < self.inBattle().length; i++) {
      var combatant = self.inBattle()[i][0].name();
      self.disableFields(combatant);
    }
  };

  self.disableFields = function(combatant){
  };
}

function arrayFirstIndexOf(array, predicate, predicateOwner) {
  for (var i = 0, j = array.length; i < j; i++) {
    if (predicate.call(predicateOwner, array[i])) {
      return i;
    }
  }
  return -1;
}

ko.applyBindings(new CombatWheelViewModel());