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
});
