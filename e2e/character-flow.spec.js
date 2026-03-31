import { expect, test } from 'playwright/test';

const CHARACTERS = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    type: '',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' },
    episode: ['1', '2', '3'],
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    type: '',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Earth (Replacement Dimension)' },
    episode: ['1', '2'],
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    type: '',
    origin: { name: 'Earth (Replacement Dimension)' },
    location: { name: 'Earth (Replacement Dimension)' },
    episode: ['6', '7'],
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  },
  {
    id: 4,
    name: 'Beth Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    type: '',
    origin: { name: 'Earth (Replacement Dimension)' },
    location: { name: 'Earth (Replacement Dimension)' },
    episode: ['3', '4'],
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  },
  {
    id: 47,
    name: 'Birdperson',
    status: 'Dead',
    species: 'Bird-Person',
    gender: 'Male',
    type: '',
    origin: { name: 'Bird World' },
    location: { name: 'Planet Squanch' },
    episode: ['11'],
    image: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
  },
];

async function mockApi(page) {
  const characterById = new Map(
    CHARACTERS.map((character) => [character.id, character])
  );

  await page.route('**/api/character?**', async (route) => {
    const url = new URL(route.request().url());
    const nameQuery = (url.searchParams.get('name') || '').toLowerCase().trim();
    const statusQuery = (url.searchParams.get('status') || '')
      .toLowerCase()
      .trim();

    const filtered = CHARACTERS.filter((character) => {
      const matchesName =
        !nameQuery || character.name.toLowerCase().includes(nameQuery);
      const matchesStatus =
        !statusQuery || character.status.toLowerCase() === statusQuery;
      return matchesName && matchesStatus;
    });

    if (filtered.length === 0) {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'There is nothing here' }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        info: {
          count: filtered.length,
          pages: 1,
          next: null,
          prev: null,
        },
        results: filtered,
      }),
    });
  });

  await page.route('**/api/character/*', async (route) => {
    const path = new URL(route.request().url()).pathname;
    const id = Number(path.split('/').pop());
    const character = characterById.get(id);

    if (!character) {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Character not found' }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(character),
    });
  });
}

test.beforeEach(async ({ page }) => {
  await mockApi(page);
});

test('renders home grid and keeps image loading strategy', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Rick and Morty Character Explorer' })
  ).toBeVisible();
  await expect(page.locator('a.character-link')).toHaveCount(5);

  const firstCardImage = page
    .locator('a.character-link')
    .first()
    .locator('img');
  await expect(firstCardImage).toHaveAttribute('width', '300');
  await expect(firstCardImage).toHaveAttribute('height', '300');
  await expect(firstCardImage).toHaveAttribute('loading', 'eager');
  await expect(firstCardImage).toHaveAttribute('fetchpriority', 'high');

  const fifthCardImage = page.locator('a.character-link').nth(4).locator('img');
  await expect(fifthCardImage).toHaveAttribute('loading', 'lazy');
});

test('shows empty state when search has no matches', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Search characters').fill('Nope');
  await expect(
    page.getByRole('heading', { name: 'No characters found in this dimension' })
  ).toBeVisible();
  await expect(
    page.getByText(
      'No match for "Nope". Try a different keyword or status filter.'
    )
  ).toBeVisible();
});

test('opens details from a card and allows returning home', async ({
  page,
}) => {
  await page.goto('/');

  await page
    .getByRole('link', { name: 'Open details for Rick Sanchez' })
    .click();
  await expect(page).toHaveURL(/#\/character\/1$/);
  await expect(
    page.getByRole('heading', { name: 'Rick Sanchez' })
  ).toBeVisible();
  await expect(page.getByText('Citadel of Ricks')).toBeVisible();

  await page.getByRole('link', { name: 'Back to Portal' }).click();
  await expect(page).toHaveURL(/#\/$/);
  await expect(
    page.getByRole('heading', { name: 'Rick and Morty Character Explorer' })
  ).toBeVisible();
});
