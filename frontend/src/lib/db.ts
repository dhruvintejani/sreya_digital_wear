import Dexie, { Table } from 'dexie';
import { Product, Category } from '@/types';

export class SDWDatabase extends Dexie {
  products!: Table<Product>;
  categories!: Table<Category>;

  constructor() {
    super('SDWInventoryDB');
    this.version(1).stores({
      products: 'id, name, category, createdAt, updatedAt',
      categories: 'id, name, isCustom, createdAt',
    });
  }
}

export const db = new SDWDatabase();

// Seed default categories if none exist
export async function seedCategories(defaultCategories: string[]) {
  const count = await db.categories.count();
  if (count === 0) {
    const now = new Date().toISOString();
    await db.categories.bulkAdd(
      defaultCategories.map((name) => ({
        id: crypto.randomUUID(),
        name,
        isCustom: false,
        createdAt: now,
      }))
    );
  }
}
