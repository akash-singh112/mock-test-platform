import './MarkedforReviewBox.css';
import PropTypes from 'prop-types';

function MarkedforReviewBox({ value }) {
    return (
        <div className='marked-for-review-box'>
            {value}
        </div>
    )
};

MarkedforReviewBox.propTypes = {
    value: PropTypes.number
};

export default MarkedforReviewBox;