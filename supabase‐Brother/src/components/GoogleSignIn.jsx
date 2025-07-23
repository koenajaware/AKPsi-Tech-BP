import { useEffect, useRef } from 'react';

const GoogleSignIn = ({ clientId, onSuccess, onError }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Wait for Google's script to load
    const initializeGoogleSignIn = async () => {
      if (window.google && window.google.accounts) {
        try {
          // Initialize Google Sign-In
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response) => {
              // Call the global handler function
              // window.handleSignInWithGoogle(response);
              // Also call the optional onSuccess callback if provided
              if (onSuccess) {
                onSuccess(response);
              }
            },
            use_fedcm_for_prompt: true,
          });

          // Render the button
          if (buttonRef.current) {
            window.google.accounts.id.renderButton(buttonRef.current, {
              type: 'standard',
              shape: 'pill',
              theme: 'outline',
              text: 'signin_with',
              size: 'large',
              logo_alignment: 'left',
            });
          }
        } catch (error) {
          console.error('Error initializing Google Sign-In:', error);
          if (onError) {
            onError(error);
          }
        }
      } else {
        // If Google script hasn't loaded yet, wait a bit and try again
        setTimeout(initializeGoogleSignIn, 100);
      }
    };

    initializeGoogleSignIn();
  }, [clientId, onSuccess, onError]);

  return (
    <div>
      <div ref={buttonRef}></div>
    </div>
  );
};

export default GoogleSignIn; 