import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RecordAttendance from './components/RecordAttendance'
import AttendanceRecords from './components/AttendanceRecords'
import Requirements from './components/Requirements'
import Setup from './components/Setup'
import GoogleSignIn from './components/GoogleSignIn'

import { supabase } from './supabaseClient';

console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase client instance:', supabase);


// function App() {
//   const [count, setCount] = useState(0)
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: 20 }}>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/record-attendance">
                Record Attendance
              </Link>
            </li>
            <li>
              <Link to="/attendance-records">
                View Attendance Records
              </Link>
            </li>
            <li>
              <Link to="/requirements">
                Requirements
              </Link>
            </li>
            <li>
              <Link to="/setup">
                Setup
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h1>Brother Portal AYEE</h1>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h2>Sign In</h2>
                <GoogleSignIn 
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                  onSuccess={(response) => {
                    console.log('Google sign-in successful:', response);
                  }}
                  onError={(error) => {
                    console.error('Google sign-in error:', error);
                  }}
                />
              </div>
            </div>
          } />
          <Route path="/record-attendance" element={<RecordAttendance />} />
          <Route path="/attendance-records" element={<AttendanceRecords />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
