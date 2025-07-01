import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Requirements() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPoints, setUserPoints] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  // Fetch all categories
  useEffect(() => {
    async function fetchCategories() {
      let { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('id');
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setAllCategories(data);
      }
    }
    fetchCategories();
  }, []);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      let { data, error } = await supabase
        .from('users')
        .select('id, name')
        .order('id');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    }
    fetchUsers();
  }, []);

  // Fetch points for selected user
  useEffect(() => {
    if (!selectedUser) {
      setUserPoints([]); // Clear points when no user is selected
      return;
    }
    async function fetchUserPoints() {
      console.log('Fetching points for user:', selectedUser);
      let { data, error } = await supabase
        .from('user_category_points')
        .select('category_id, category_name, points')
        .eq('user_id', selectedUser);
      if (error) {
        console.error('Error fetching user points:', error);
        setUserPoints([]);
      } else {
        console.log('Fetched user points:', data);
        setUserPoints(data || []);
      }
    }
    fetchUserPoints();
  }, [selectedUser]);

  // Create a map of all categories with points
  const getCategoryPoints = () => {
    const pointsMap = new Map();
    
    // Initialize all categories with 0 points
    allCategories.forEach(category => {
      pointsMap.set(category.id, {
        name: category.name,
        points: 0
      });
    });

    // Update points for categories that have them
    userPoints.forEach(point => {
      if (point.category_id !== null && point.category_name !== null) {
         pointsMap.set(point.category_id, {
           name: point.category_name,
           points: point.points
         });
      }
    });

    return Array.from(pointsMap.values());
  };

  const categoriesWithPoints = getCategoryPoints();

  console.log('Categories with points for rendering:', categoriesWithPoints);

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Requirements</h1>

      <label>
        Select User:{' '}
        <select
          value={selectedUser || ''}
          onChange={(e) => setSelectedUser(parseInt(e.target.value))}
        >
          <option value="" disabled>
            (Choose a user)
          </option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </label>

      {!selectedUser ? (
        <p>Select a user to see their requirements.</p>
      ) : allCategories.length === 0 ? (
        <p>Loading categories…</p>
      ) : (
        <div style={{ marginTop: 20, width: '100%', maxWidth: '600px' }}>
          {categoriesWithPoints.length > 0 ? (
            <table border="1" cellPadding="4" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {categoriesWithPoints.map((category, idx) => (
                  <tr key={idx}>
                    <td>{category.name}</td>
                    <td>{category.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requirements found for this user.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Requirements; 