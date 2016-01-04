/// <reference path="_all.ts" />

module ContactManagerApp {

  export class MainController {
    
    static $inject = ['userService', '$mdSidenav', '$mdBottomSheet', '$mdToast', '$mdDialog', '$mdMedia' ];    
    
    constructor(
      private userService: IUserService, 
      private $mdSidenav: angular.material.ISidenavService, 
      private $mdBottomSheet, 
      private $mdToast, 
      private $mdDialog, 
      private $mdMedia) {
        var self = this;
        
        this.userService
          .loadAllUsers()
          .then((users: User[]) => {
            self.users    = [].concat(users);
            self.selected = users[0];
          });          
    }
    
    searchText: string = '';
    formScope: any;        
    tabIndex: number = 0;
    selected: User = null;
    users: User[] = [ ];    
    newNote: Note = new Note('', null);
    
    setFormScope(scope) {
      this.formScope = scope;
    }

    addUser($event) {
      var self = this;
      
      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
      this.$mdDialog.show({
        templateUrl: './dist/view/newUserDialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        controller: [ '$mdDialog', DialogController],
        controllerAs: "ctrl",      
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      }).then((user) => {
        var newUser: User = { 
          name: user.firstName + ' ' + user.lastName,
          bio: user.bio,
          avatar: user.avatar,
          notes: []
        };
        self.users.push(newUser);
        self.selectUser(newUser);
        
        self.openToast("User added");
      }, () => {
        console.log('You cancelled the dialog.');
      });
  
      function DialogController($mdDialog) {
        this.user = {};
        this.avatars = [
          'svg-1','svg-2','svg-3','svg-4'
        ];
        this.cancel = function() {
          self.$mdDialog.cancel();
        };

        this.save = function() {
          self.$mdDialog.hide(this.user);
        };
      }  
    }

    removeNote(note) {
      var foundIndex = this.selected.notes.indexOf(note);
      this.selected.notes.splice(foundIndex, 1);
      this.openToast("Note removed");
    }

    addNote() {
      this.selected.notes.push(this.newNote);      
      this.newNote = new Note('', null);

      this.formScope.noteForm.$setUntouched();
      this.formScope.noteForm.$setPristine();
      
      this.openToast("Note added");
    }

    clearNotes($event) {
      var confirm = this.$mdDialog.confirm()
        .title('Are you sure you want to delete all notes?')
        .textContent('All notes will be deleted, you can\'t undo this action.')
        .ariaLabel('Delete all notes')
        .targetEvent($event)
        .ok('Yes')
        .cancel('No');
        
        var self = this;
        this.$mdDialog.show(confirm).then(() => {
          self.selected.notes = [];
          self.openToast("Cleared notes");
        });
    }

    openToast(message): void {
      this.$mdToast.show(
        this.$mdToast.simple()
          .content(message)
          .position('top right')
          .hideDelay(5000)
        );
    }

    toggleList() {
      this.$mdSidenav('left').toggle();
    }

    selectUser ( user ) {
      this.selected = user;
      
      var sidebar = this.$mdSidenav('left');
      if (sidebar.isOpen()) {
        sidebar.close();
      }
      
      this.tabIndex = 0;
    }

    showContactOptions($event) {
      var user = this.selected;

      return this.$mdBottomSheet.show({
        parent: angular.element(document.getElementById('wrapper')),
        templateUrl: './dist/view/contactSheet.html',
        controller: [ '$mdBottomSheet', ContactPanelController],
        controllerAs: "cp",
        bindToController : true,
        targetEvent: $event
      }).then((clickedItem) => {
        clickedItem && console.log( clickedItem.name + ' clicked!');
      });

      function ContactPanelController( $mdBottomSheet ) {
        this.user = user;
        this.actions = [
          { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
          { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
          { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
        ];
        this.submitContact = (action) => {
          $mdBottomSheet.hide(action);
        };
      }
    }
  }
}
