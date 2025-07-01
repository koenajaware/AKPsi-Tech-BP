import { supabase } from '../supabaseClient';

const users = [
  { email: 'user1@example.com', password: 'password123' },
  { email: 'user2@example.com', password: 'password456' },
];

export async function createUsers() {
  for (const user of users) {
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });
    if (error) {
      console.error('Error creating user:', error);
    } else {
      console.log('User created:', data);
    }
  }
}

// Uncomment the line below to run the user creation
// createUsers(); 