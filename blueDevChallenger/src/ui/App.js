import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AgentsCollection } from '../api/AgentsCollection';
import { ReactiveDict } from 'meteor/reactive-dict';
import './App.html';
import './Login.js';
import './Agent.js';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.events({
  'click .account'() {
    Meteor.logout();
  },
});

Template.mainContainer.helpers({
  agents() {
    if (!isUserLogged()) {
      return [];
    }

    return AgentsCollection.find().fetch();
  },
  isUserLogged() {
    return isUserLogged();
  },
});