import PropTypes from 'prop-types';

export default function MessageOut({ children }) {
    return (
        <div className='chat-bubble chat-bubble-accent max-w-xl break-words whitespace-pre-wrap'>
            {children}
        </div>
    );
}

MessageOut.propTypes = {
    children: PropTypes.node,
};

