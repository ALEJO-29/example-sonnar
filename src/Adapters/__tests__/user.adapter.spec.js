// src/__tests__/users.adapter.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getUsers } from '../users.adapter.js';

describe('Users Adapter', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    vi.clearAllMocks();
  });

  it('should fetch users successfully', async () => {
    const mockUsers = [{
      id: 10,
      name: "Clementina DuBuque",
      username: "Moriah.Stanton",
      email: "Rey.Padberg@karina.biz",
      address: {
        street: "Kattie Turnpike",
        suite: "Suite 198",
        city: "Lebsackbury",
        zipcode: "31428-2261",
        geo: { lat: "-38.2386", lng: "57.2232" }
      },
      phone: "024-648-3804",
      website: "ambrose.net",
      company: {
        name: "Hoeger LLC",
        catchPhrase: "Centralized empowering task-force",
        bs: "target end-to-end models"
      }
    }];

    // Mock fetch
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUsers)
    });

    // Llamada a la función
    const result = await getUsers();

    // Aserciones
    expect(globalThis.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(result).toEqual(mockUsers);
    expect(result[0]).toHaveProperty('address');
    expect(result[0].address).toHaveProperty('geo');
    expect(result[0]).toHaveProperty('company');
  });

  it('should handle fetch errors', async () => {
    // Mock fetch para que falle
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    // Verificar que la función lance el error
    await expect(getUsers()).rejects.toThrow('Network error');
  });
});
