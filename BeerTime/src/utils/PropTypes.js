import PropTypes from 'prop-types';

export const StylePropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,

  PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object])),
  PropTypes.arrayOf(PropTypes.number),
  PropTypes.arrayOf(PropTypes.object),
]);
export const BeerProptype = PropTypes.shape({
  image_url: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  abv: PropTypes.number.isRequired,
  volume: PropTypes.shape({
    value: PropTypes.number,
    unit: PropTypes.string,
  }).isRequired,
  food_pairing: PropTypes.arrayOf(PropTypes.string),
});

export const ChildPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);
