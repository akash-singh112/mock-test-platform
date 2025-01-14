import './AnsweredandMarkedforReviewBox.css';
import PropTypes from 'prop-types';

function AnsweredandMarkedforReviewBox({ value }) {
    return (
        <div className='outside-box-for-answered-and-marked-for-review'>
            {value}
            <div className='inside-box-for-answered-and-marked-for-review'></div>
        </div>
    )
};

AnsweredandMarkedforReviewBox.propTypes = {
    value: PropTypes.number
};

export default AnsweredandMarkedforReviewBox;