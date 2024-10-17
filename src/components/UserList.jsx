import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        const cachedUsers = localStorage.getItem(`users-page-${page}`);
        if (cachedUsers) {
          setUsers(JSON.parse(cachedUsers));
          setLoading(false);
        } else {
          const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
          localStorage.setItem(`users-page-${page}`, JSON.stringify(response.data.data));
          setUsers(response.data.data);
          setLoading(false);
        }
      };
      

    const navigate = useNavigate();
    const handleSearch = (event) => {
        const userId = event.target.value;
        if (userId) {
            navigate(`/user/${userId}`);
        }
    };

    return (
        <div>
            <header>
                <h1>User Dashboard</h1>
                <input type="text" placeholder="Search by ID" onChange={handleSearch} />
            </header>

            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="user-list">
                    {users.map(user => (
                        <Link key={user.id} to={`/user/${user.id}`}>
                            <div className="user-card">
                                <img src={user.avatar} alt={user.first_name} />
                                <p>{user.first_name} {user.last_name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(prev => prev + 1)}>Next</button>
        </div>
    );
};

export default UserList;