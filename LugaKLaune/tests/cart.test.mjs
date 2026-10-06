import test from 'node:test';
import assert from 'node:assert/strict';
import { hydrateCart, withAddedItem, withQuantity, subtotalOf } from '../utils/cart.ts';
const product = { id: '1', name: 'Test blazer', price: 19.99, stock: 3, sizes: ['S','M'], category: 'Clothing', audience: 'Women', description: 'Test', imageUrl: '/test.jpg', imageAlt: 'Test', color: 'Sand', swatch: '#aaa', material: 'Test' };
test('corrupt stored bag entries are discarded', () => {
  assert.deepEqual(hydrateCart([null, {}, { id:'unknown', size:'S', quantity:1 }, { id:'1', size:'XL', quantity:1 }, { id:'1', size:'S', quantity:NaN }, { id:'1', size:'S', quantity:-1 }, { id:'1', size:'S', quantity:1.5 }], [product]), []);
  assert.deepEqual(hydrateCart('invalid', [product]), []);
});
test('hydration uses catalog price and caps stock across sizes', () => {
  const cart = hydrateCart([{ id:'1', size:'S', quantity:2, price:0.01 }, { id:'1', size:'M', quantity:5 }], [product]);
  assert.deepEqual(cart.map(i => [i.size,i.quantity,i.price]), [['S',2,19.99],['M',1,19.99]]);
});
test('duplicate stored lines cannot overfill the bag', () => {
  const cart = hydrateCart([{ id:'1', size:'S', quantity:1 }, { id:'1', size:'S', quantity:2 }], [product]);
  assert.equal(cart.length,1);
  assert.equal(cart[0].quantity,1);
});
test('size variants stay separate and repeated choices merge', () => {
  let cart = withAddedItem([], product, 'S');
  cart = withAddedItem(cart, product, 'M');
  cart = withAddedItem(cart, product, 'S');
  assert.deepEqual(cart.map(i => [i.lineId,i.quantity]), [['1:S',2],['1:M',1]]);
});
test('repeated additions never exceed shared product inventory', () => {
  let cart = [];
  for (let i = 0; i < 20; i++) cart = withAddedItem(cart, product, i % 2 ? 'M' : 'S');
  assert.equal(cart.reduce((n,i) => n+i.quantity,0),3);
  assert.deepEqual(withAddedItem([], { ...product, stock:0 }, 'S'),[]);
  assert.deepEqual(withAddedItem([], product, 'XL'),[]);
});
test('invalid quantities cannot corrupt totals', () => {
  const cart = withAddedItem([], product, 'S');
  for (const quantity of [NaN,Infinity,-1,0,1.5]) assert.equal(withQuantity(cart,[product],'1:S',quantity),cart);
});
test('quantity updates reserve inventory for other sizes', () => {
  const cart = withAddedItem(withAddedItem([],product,'S'),product,'M');
  const updated = withQuantity(cart,[product],'1:S',100);
  assert.deepEqual(updated.map(i => i.quantity),[2,1]);
});
test('totals use integer cents and handle an empty bag', () => {
  const cart = [{ ...product, lineId:'1:S', size:'S', quantity:3 }];
  assert.equal(subtotalOf(cart),59.97);
  assert.equal(subtotalOf([]),0);
});

