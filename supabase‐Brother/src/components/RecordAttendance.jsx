import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function RecordAttendance() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      let { data, error } = await supabase
        .from('events')
        .select(`
          id,
          title,
          event_date,
          category_id,
          categories ( id, name )
        `)
        .order('event_date', { ascending: false });
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    }
    fetchEvents();
  }, []);

  // Handler for recording attendance
  const handleRecordAttendance = async () => {
    if (!selectedUser || !selectedEvent) {
      alert('Please pick both a user and an event.');
      return;
    }
    let { error } = await supabase.from('attendance').insert({
      user_id: selectedUser,
      event_id: selectedEvent,
    });
    if (error) {
      console.error('Error recording attendance:', error);
      alert('Failed to record attendance – check console.');
    } else {
      alert('Attendance recorded!');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Record Attendance</h1>

      <label>
        Pick a User:{' '}
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

      <br />
      <br />
      <label>
        Pick an Event:{' '}
        <select
          value={selectedEvent || ''}
          onChange={(e) => setSelectedEvent(parseInt(e.target.value))}
        >
          <option value="" disabled>
            (Choose an event)
          </option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title} ({ev.event_date})
            </option>
          ))}
        </select>
      </label>

      <br />
      <br />
      <button onClick={handleRecordAttendance}>Submit Attendance</button>
    </div>
  );
}

export default RecordAttendance; 