export const initialStore = () => {
  return {
    message: null,
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_favorite':
      // Aseguramos que el nuevo favorito se añada a la lista actual
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'remove_favorite':
      // Filtramos eliminando el que coincida exactamente con el ID recibido
      return {
        ...store,
        favorites: store.favorites.filter(fav => {
          // Si el payload tiene people_id, filtramos por eso
          if (action.payload.people_id) return fav.people_id !== action.payload.people_id;
          // Si el payload tiene planet_id, filtramos por eso
          if (action.payload.planet_id) return fav.planet_id !== action.payload.planet_id;
          // Si el payload tiene vehicle_id, filtramos por eso
          if (action.payload.vehicle_id) return fav.vehicle_id !== action.payload.vehicle_id;
          
          return true; // Si no hay coincidencia, mantenemos el favorito
        })
      };

    case 'set_favorites':
      // reemplaza toda la lista con lo que trae el backend
      return {
        ...store,
        favorites: action.payload
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