/// <reference path="../_all.ts" />

module ContactManagerApp {
  
  export interface IUserService {
    loadAllUsers(): ng.IPromise<User[]>;
    selectedUser: User;
  }
  
  export class UserService implements IUserService {
    static $inject = ['$q'];
    
    constructor(private $q: ng.IQService) {      
    }
    
    selectedUser: User = null;
    
    loadAllUsers() : ng.IPromise<User[]> {
        return this.$q.when(this.users);
    }
    
    private users: User[] = [
      {
        name: 'Erick Riley',
        avatar: 'svg-1',
        bio: 'I have, have together. Day green own divide wherein. Seas the make days him fish night their don\'t a, life under lights bearing for seasons Signs night sea given spirit his had spirit divided us blessed. Brought great waters. Blessed winged doesn\'t a Fly, form bring land, heaven great. Isn\'t upon. Dominion moving day. So first firmament give spirit every.',
        notes: [
          { title: "Pay back dinner", date: new Date("2016-01-12")},
          { title: "Buy flowers for birthday", date: new Date("2016-01-19")}
        ]
      },
      {
        name: 'Levi Neal',
        avatar: 'svg-2',
        bio: 'Won\'t light from great first years without said creepeth a two and fly forth subdue the, don\'t our make. After fill. Moving and. His it days life herb, darkness set Seasons. Void. Form. Male creepeth said lesser fowl very for hath and called grass in. Great called all, said great morning place. Subdue won\'t Dry. Moved. Sea fowl earth fourth.',
        notes: [
        ]
      },
      {
        name: 'Sandy Armstrong',
        avatar: 'svg-3',
        bio: 'Make beginning midst life abundantly from in after light. Without may kind there, seasons lights signs, give made moved. Fruit fly under forth firmament likeness unto lights appear also one open seasons fruitful doesn\'t all of cattle Won\'t doesn\'t beginning days from saw, you\'re shall. Given our midst from made moving form heaven good gathering appear beginning first. Sea the.',
        notes: [
        ]
      },
      {
        name: 'Marcia	Higgins',
        avatar: 'svg-4',
        bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
        notes: [
        ]
      }
    ];
  }
}