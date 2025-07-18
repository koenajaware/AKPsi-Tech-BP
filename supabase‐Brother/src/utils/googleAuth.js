import { supabase } from '../supabaseClient';

/**
 * Global callback function for Google Sign-In
 * This function must be available in the global scope for Google's code to find it
 * @param {Object} response - The credential response from Google
 */
async function handleSignInWithGoogle(response) {
  try {
    console.log('Google sign-in response received:', response);
    
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });

    if (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in with Google. Please try again.');
      return;
    }

    console.log('Successfully signed in with Google:', data);
    
    // Redirect to home page or dashboard after successful sign-in
    window.location.href = '/';
    
  } catch (error) {
    console.error('Unexpected error during Google sign-in:', error);
    alert('An unexpected error occurred. Please try again.');
  }
}

// Make the function available globally
window.handleSignInWithGoogle = handleSignInWithGoogle;

export { handleSignInWithGoogle }; 