import products from './products';

export default function getRandomItems(amount) {
  let items = [];
  let i = amount;
  while (i > 0) {
    const randomItem = products[Math.floor(Math.random() * products.length)];
    if (items.map((item) => item.id).includes(randomItem.id)) {
      items = items.map((item) => {
        if (item.id === randomItem.id) return { ...item, quantity: item.quantity + 1 };
        return item;
      });
    } else items.push({ ...randomItem, isInCart: true, quantity: 1 });
    i -= 1;
  }
  return items;
}
