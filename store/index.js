import { proxy } from 'valtio';

export const uiState = proxy({
  mobileNavOpen: false,
  filter: {
    region: 'All',
    theme: 'All'
  },
  favorites: []
});

export function toggleMobileNav() {
  uiState.mobileNavOpen = !uiState.mobileNavOpen;
}

export function closeMobileNav() {
  uiState.mobileNavOpen = false;
}

export function setFilter(key, value) {
  uiState.filter[key] = value;
}

export function toggleFavorite(id) {
  if (uiState.favorites.includes(id)) {
    uiState.favorites = uiState.favorites.filter((fav) => fav !== id);
  } else {
    uiState.favorites = [...uiState.favorites, id];
  }
}
