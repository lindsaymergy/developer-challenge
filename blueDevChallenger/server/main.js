import { Meteor } from 'meteor/meteor';
import { AgentsCollection } from '/imports/api/AgentsCollection';

const insertAgent = (name, address, phone) => {
  AgentsCollection.insert({
    name: name,
    address: address,
    phone: phone,
  });
};

Meteor.startup(() => {
  if (AgentsCollection.find().count() === 0) {
    [
      agent = {
        name: 'christy',
        address: 'address',
        phone: 'phone'
      },
      agent = {
        name: 'belle',
        address: 'address',
        phone: 'phone'
      },
      agent = {
        name: 'megan',
        address: 'address',
        phone: 'phone'
      },
    ].forEach(agent => insertAgent(agent.name, agent.address, agent.phone));
  }
});