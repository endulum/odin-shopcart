import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

export default function Item({ item, dispatch }) {
  function handleAddToCart(id) {
    dispatch({
      type: 'add_to_cart',
      id,
    });
  }

  function handleRemoveFromCart(id) {
    dispatch({
      type: 'remove_from_cart',
      id,
    });
  }

  // console.log(item);

  return item ? (
    <main className="itemview">
      <Card variant="outlined" className="itemview-card">
        <div className="itemview-img-wrapper">
          <img src={item.image} alt={item.title} />
        </div>

        <div className="detail-wrapper">
          <Typography variant="overline">{item.category}</Typography>
          <Typography variant="h6">{item.title}</Typography>

          <div className="price-wrapper">
            <Typography variant="subtitle1">
              $
              {item.price}
            </Typography>

            <div>
              <Typography variant="subtitle1">
                {item.rating.count}
                {' '}
                ratings
              </Typography>
              <Rating name="read-only" value={item.rating.rate} />
            </div>
          </div>
          <br />
          <Divider />
          <br />
          <Typography variant="body1">{item.description}</Typography>
          <br />
          <Typography variant="body2">
            You have
            {' '}
            {item.quantity}
            {' '}
            in your cart.
            {' '}
          </Typography>
          <br />
          {item.isInCart && item.quantity > 0 ? (
            <Button variant="outlined" type="button" onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</Button>
          ) : (
            <Button variant="contained" type="button" onClick={() => handleAddToCart(item.id)}>Add to Cart</Button>
          )}
        </div>
      </Card>
    </main>
  ) : (
    <main className="error">
      <p>No item found at this URL.</p>
    </main>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    isInCart: PropTypes.bool,
    quantity: PropTypes.number,
    rating: PropTypes.shape({
      count: PropTypes.number,
      rate: PropTypes.number,
    }),
  }),
  dispatch: PropTypes.func.isRequired,
};

Item.defaultProps = {
  item: PropTypes.null,
};
