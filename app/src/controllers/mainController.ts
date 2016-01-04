/// <reference path="../_all.ts" />

module ContactManagerApp {
  
  export class MainController {
    static $inject = ['userService', '$mdSidenav', '$mdBottomSheet', '$mdToast', '$mdDialog', '$mdMedia' ];    
    
    constructor(
      private userService: IUserService, 
      private $mdSidenav: angular.material.ISidenavService, 
      private $mdBottomSheet: angular.material.IBottomSheetService, 
      private $mdToast: angular.material.IToastService, 
      private $mdDialog: angular.material.IDialogService, 
      private $mdMedia: angular.material.IMedia) {
        var self = this;
        
        this.userService
          .loadAllUsers()
          .then((users: User[]) => {
            self.users = users;
            self.selected = users[0];
            self.userService.selectedUser = self.selected;
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
        controller: AddUserDialogController,
        controllerAs: "ctrl",      
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      }).then((user: CreateUser) => {
        var newUser: User = User.fromCreate(user);
        self.users.push(newUser);
        self.selectUser(newUser);
        
        self.openToast("User added");
      }, () => {
        console.log('You cancelled the dialog.');
      });    
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
          .textContent(message)
          .position('top right')
          .hideDelay(5000)
        );
    }

    toggleList() {
      this.$mdSidenav('left').toggle();
    }

    selectUser ( user ) {
      this.selected = user;
      this.userService.selectedUser = user;
      
      var sidebar = this.$mdSidenav('left');
      if (sidebar.isOpen()) {
        sidebar.close();
      }
      
      this.tabIndex = 0;
    }

    showContactOptions($event) {      
      this.$mdBottomSheet.show({
        parent: angular.element(document.getElementById('wrapper')),
        templateUrl: './dist/view/contactSheet.html',
        controller: ContactPanelController,
        controllerAs: "cp",
        bindToController : true,
        targetEvent: $event
      }).then((clickedItem) => {
        clickedItem && console.log( clickedItem.name + ' clicked!');
      });
    }
  }
}
