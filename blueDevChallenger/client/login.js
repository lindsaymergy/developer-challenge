import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './login.html';

Template.login.events({
  'submit .login-form'(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password);
  }
});