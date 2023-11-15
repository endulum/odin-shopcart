### TOP: Shopping Cart
A mock shopping cart site in React.

[Section](https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart)

#### Design
- Page structure is a navigation bar and a routing outlet containing the index, shop inventory, and cart
- Cart link in navigation bar has a counter that updates when cart contents change
- Shop inventory is populated with items from an API - during development before API implementation it will be preloaded dummy data
- Shop item object notation is `{ id, title, price, category, description, image, quantity, isInCart }`
- On the Shop page, items are shown with an image, title, category, and price - the title links to a route just for the item
- Item routes display all item info including description
- To "add to cart", a shop item's `isInCart` is toggled `true` and its quantity is set to `1`. To "remove from cart, a shop item's `isInCart` is toggled `false` and its `quantity` is set to `0`
- The cart filters the shop inventory for anything whose `isInCart` is `true` and `quantity` is greater than zero
- The cart sums up the total quantity and price of items
- In the cart, an item's `quantity` can be changed but cannot be set to 0 or below

#### Goals
* [x] Use routing to divide app into an index, a shop inventory, and a shopping cart
* [x] Ensure functionality of adding and removing items from cart
* [ ] Populate shop inventory with items from an API
* [x] Allow for filtering the shop inventory using a searchbar and controls

#### Consider...
- Using a CSS component library to automatically style elements

#### Resources
- [**Academind:** Testing React.js Apps](https://academind.com/tutorials/testing-react-apps)
- [**react.dev**: Typechecking with PropTypes](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html#proptypes)