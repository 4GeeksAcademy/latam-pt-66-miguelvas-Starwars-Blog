export const initialStore = () => {
  return {
    message: null,
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_favorite':
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };
    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type))
      };
    case 'remove_all_favorites':
      return {
        ...store,
        favorites: []
      };
    default:
      throw Error('Unknown action.');
  }
} 
