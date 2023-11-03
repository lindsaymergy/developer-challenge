import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import "./login.js";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.mainContainer.helpers({
  isUserLogged() {
    return isUserLogged();
  }
});
