import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function AttendanceRecords() {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    async function fetchAttendance() {
      let { data, error } = await supabase
        .from('attendance')
        .select(`
          id,
          user_id,
          event_id,
          recorded_at,
          users ( name ),
          events ( title, event_date )
        `)
        .order('recorded_at', { ascending: false });
      if (error) {
        console.error('Error fetching attendance:', error);
      } else {
        setAttendanceList(data);
      }
    }
    fetchAttendance();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>All Attendance Records</h1>
      {attendanceList.length === 0 ? (
        <p>Loading attendance…</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>User</th>
              <th>Event</th>
              <th>Date Recorded</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.users?.name}</td>
                <td>
                  {row.events?.title} ({row.events?.event_date})
                </td>
                <td>{new Date(row.recorded_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceRecords; 