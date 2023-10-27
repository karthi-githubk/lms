import React from 'react';

const UserCount = ({ data }) => {
  const userCount = data.length;

  return (
    <div>
      <p>Total users: {userCount}</p>
    </div>
  );
};

export default UserCount;