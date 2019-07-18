import { connect } from 'react-redux';
import FilterInputScreen from '../screens/FilterInputScreen';


const mapStateToProps = () => ({
});
const mapDispatchToProps = () => ({
  onFilter: () => { console.log('filter'); },
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterInputScreen);
