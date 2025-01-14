import './NotAnsweredBox.css';
import PropTypes from 'prop-types';

function NotAnsweredBox({ value }) {
    return (
        <div className='not-answered-box'>
            {value}
        </div>
    )
};

NotAnsweredBox.propTypes = {
    value: PropTypes.number
};

export default NotAnsweredBox;