export default function itemsReducer(items, action) {
  switch (action.type) {
    case 'add_to_cart':
      return items.map((item) => {
        if (item.id === action.id) return { ...item, isInCart: true, quantity: 1 };
        return item;
      });

    case 'remove_from_cart':
      return items.map((item) => {
        if (item.id === action.id) return { ...item, isInCart: false, quantity: 0 };
        return item;
      });

    case 'change_item_quantity':
      return (items.map((item) => {
        if (item.id === action.id) return { ...item, quantity: action.quantity };
        return item;
      }));

    default:
      throw new Error(`Unrecognized action type: '${action.type}`);
  }
}
