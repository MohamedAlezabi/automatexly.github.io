import React, { useEffect } from 'react';

/**
 * ManyChatWidget
 * Global script injector for ManyChat Growth Tools.
 * INSTRUCTIONS: 
 * 1. Replace 'YOUR_PAGE_ID' with your actual ManyChat Page ID.
 * 2. Ensure your domain is whitelisted inside the ManyChat Growth Tools settings.
 */
export function ManyChatWidget() {
  useEffect(() => {
    // Prevent multiple injections
    if (document.getElementById('manychat-script')) return;

    const mcScript = document.createElement('script');
    mcScript.id = 'manychat-script';
    // The standard ManyChat injection script
    mcScript.src = 'https://widget.manychat.com/YOUR_PAGE_ID.js';
    mcScript.async = true;
    
    document.body.appendChild(mcScript);

    return () => {
      // Cleanup if component unmounts (optional, ManyChat usually persists)
      const script = document.getElementById('manychat-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null; // This component handles side-effects only, no UI
}
