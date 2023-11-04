import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TasksCollection } from '../api/TasksCollection';
import { ReactiveDict } from 'meteor/reactive-dict';
import './App.html';
import './Task.js';
import './Login.js';

const HIDE_COMPLETED_STRING = 'hideCompleted';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

const getTasksFilter = () => {
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  return pendingOnlyFilter ;
};

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.events({
  'click #hide-completed-button'(event, instance) {
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
  },
  'click .user'() {
    Meteor.logout();
  },
});

Template.mainContainer.helpers({
  tasks() {
    const instance = Template.instance();
    const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

    const { pendingOnlyFilter, userFilter } = getTasksFilter();

    if (!isUserLogged()) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  },
  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },
  incompleteCount() {
    if (!isUserLogged()) {
      return '';
    }

    const { pendingOnlyFilter } = getTasksFilter();

    const incompleteTasksCount = TasksCollection.find(
      pendingOnlyFilter
    ).count();
    return incompleteTasksCount ? `(${incompleteTasksCount})` : '';
  },
  isUserLogged() {
    return isUserLogged();
  },
});

Template.form.events({
  'submit .task-form'(event) {
    event.preventDefault();
    const { target } = event;
    const text = target.text.value;

    TasksCollection.insert({
      text,
      userId: getUser()._id,
      createdAt: new Date(),
    });
    target.text.value = '';
  },
});