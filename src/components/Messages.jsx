import React from 'react';
import PropTypes from 'prop-types';

export default function Messages({ tasks }) {
  return (
    <>
      <h2>Messages</h2>
      {tasks.map((message, i) =>
        // TODO: format as cards, add timestamp
        <p key={i} className={message.premium ? 'is-premium' : ''}>
          <strong>{message.sender}</strong>:<br/>
          {message.text}
        </p>
      )}
    </>
  );
}

Messages.propTypes = {
  tasks: PropTypes.array
};
