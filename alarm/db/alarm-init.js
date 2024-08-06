db = new Mongo().getDB('alarm')
db.createCollection('securityRule')

db.securityRule.insertMany([
  {
    id: 'test-range-rule-1',
    type: 'range',
    author: 'user',
    activeOn: 'thing-1',
    description: 'Test range rule 1',
    validity: {
      from: new Date('2021-01-01T00:00:00Z'),
      to: new Date('2021-12-31T23:59:59Z')
    },
    contacts: [
      {
        type: 'email',
        value: 'email@email.com'
      }
    ],
    data: {
      min: 10,
      max: 30,
      measure: {
        type: 'temperature',
        unit: 'celsius'
      }
    },
    enabled: true
  },
  {
    id: 'test-intrusion-rule-1',
    type: 'intrusion',
    author: 'user',
    activeOn: 'thing-1',
    description: 'Test intrusion rule 1',
    validity: {
      from: new Date('2021-01-01T00:00:00Z'),
      to: new Date('2021-12-31T23:59:59Z')
    },
    contacts: [
      {
        type: 'email',
        value: 'email@email.com'
      }
    ],
    data: {
      objectClass: 'person'
    },
    enabled: true
  }
])
