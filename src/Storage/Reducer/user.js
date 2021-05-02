const userStorage = JSON.parse(localStorage.getItem('user'));
const initialState = userStorage ? userStorage : {};

const user = (state = initialState, { type, user }) => {
  switch (type) {
    case 'LOGIN':
      return user;
    case 'LOGOUT':
      return (state = initialState);
    default:
      return state;
  }
};

export default user;
