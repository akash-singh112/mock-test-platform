import './AnsweredBox.css';
import PropTypes from 'prop-types';

function AnsweredBox({ value }) {
    return (
        <div className='answered-box'>
            {value}
        </div>
    )
};

AnsweredBox.propTypes = {
    value: PropTypes.number
};

export default AnsweredBox;