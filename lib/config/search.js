const searcheableOptions = {
  ALL: {
    id: null,
    label: 'Tutto',
    value: 'all',
    order: 0
  },
  TRAVELS: {
    id: 1,
    label: 'Travels',
    value: 'travels',
    order: 1
  },
  TOURS: {
    id: 2,
    label: 'Tours',
    value: 'tours',
    order: 2
  },
  USERS: {
    id: 3,
    label: 'Utenti',
    value: 'users',
    order: 3,
    admin: true
  }
}

export { searcheableOptions }
