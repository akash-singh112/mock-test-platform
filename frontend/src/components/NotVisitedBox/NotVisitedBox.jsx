import './NotVisitedBox.css';
import PropTypes from 'prop-types';

function NotVisitedBox({value}){
    return(
        <div className='not-visited-box'>
            {value}
        </div>
    )
};

NotVisitedBox.propTypes = {
    value: PropTypes.number
};

export default NotVisitedBox;