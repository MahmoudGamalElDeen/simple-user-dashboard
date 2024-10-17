import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then(response => {
      setUser(response.data.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div>
      <Link to="/">Back</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-details">
          <img src={user.avatar} alt={user.first_name} />
          <h2>{user.first_name} {user.last_name}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
