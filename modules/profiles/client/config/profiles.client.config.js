(function () {
  'use strict';

  angular
    .module('profiles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Profiles',
      state: 'profiles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'profiles', {
      title: 'View Profile',
      state: 'profiles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'profiles', {
      title: 'Edit Profile',
      state: 'profiles.create',
      roles: ['user']
    });
  }
}());
