import { db } from '@/db';

export const exportDB = async function() {
  const data = {};
  const promises = [];

  promises.push(
    db
    .accounts
    .toArray()
    .then(arr => arr.filter(el => !el.demo))
    .then(arr => data.accounts = arr)
  );
  promises.push(db.categories.toArray().then(arr => data.categories = arr));
  promises.push(
    db
    .expenses
    .toArray()
    .then(arr => arr.filter(el => !el.demo))
    .then(arr => data.expenses = arr)
  );
  promises.push(db.preferences.toArray().then(arr => data.preferences = arr));

  await Promise.all(promises);

  return data;
}
