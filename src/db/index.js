/**
 * Offline database using Dexie.js.
 *
 * This SHOULD be treated as schema migrations, i.e.:
 * DO NOT modify existing versions, rather increase the version
 * and provide an upgrade handler.
 *
 * For more information, see https://dexie.org/docs/Version/Version.upgrade()
 */
import Dexie from 'dexie';

const db = new Dexie('Finances');

/**
 * Initial schema
 *
 * == Categories
 *
 * They are all stored in the same collection, but subcategories are
 * differentiated by the field `isSubcategory` which is a simple boolean flag.
 *
 * == Preferences
 *
 * This is meant to be a key-value collection for things like user settings,
 * and the like. Maybe even stuff that doesn't fit anywhere else (like a
 * savings goal).
 * Feel free to add any property to **stored** objects, we only declare
 * properties that we want to index.
 *
 * See https://dexie.org/docs/API-Reference#quick-reference
 */
db.version(1).stores({
  accounts: '&key,name,balance,color',
	categories: '&key,name,icon,isSubcategory',
  expenses: '++id,description,price,date',
	preferences: '&key,value'
});

export default db;
