const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'https://rickandmortyapi.com/api';
const BASE_URL = `${API_BASE_URL}/character`;

const EMPTY_RESULTS = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};

function getEmptyResults() {
  return {
    info: { ...EMPTY_RESULTS.info },
    results: [],
  };
}

export async function fetchCharacters({
  page = 1,
  name = '',
  status = '',
  signal,
} = {}) {
  const query = new URLSearchParams({ page: String(page) });

  if (name) {
    query.set('name', name);
  }

  if (status) {
    query.set('status', status);
  }

  try {
    const response = await fetch(`${BASE_URL}?${query.toString()}`, { signal });

    if (response.status === 404) {
      return getEmptyResults();
    }

    if (!response.ok) {
      let message = 'Unable to load characters right now.';

      try {
        const payload = await response.json();
        if (typeof payload?.error === 'string') {
          message = payload.error;
        }
      } catch {
        // Ignore JSON parse issues and use the default message.
      }

      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error;
    }

    throw new Error(
      error?.message || 'Network issue while loading characters.'
    );
  }
}

export async function fetchCharacterById(id, { signal } = {}) {
  if (!id) {
    throw new Error('Character id is required.');
  }

  try {
    const response = await fetch(`${BASE_URL}/${id}`, { signal });

    if (response.status === 404) {
      throw new Error('Character not found in this dimension.');
    }

    if (!response.ok) {
      throw new Error('Unable to load character details right now.');
    }

    return await response.json();
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error;
    }

    throw new Error(
      error?.message || 'Network issue while loading character details.'
    );
  }
}
