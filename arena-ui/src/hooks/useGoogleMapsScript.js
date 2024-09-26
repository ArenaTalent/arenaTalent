import { useState, useEffect } from 'react'

const SCRIPT_ID = 'google-maps-script'
const CALLBACK_NAME = 'initGoogleMaps'

const useGoogleMapsScript = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true)
      return
    }

    const apiKey = 'AIzaSyB6gP-Zq6mIDhh3FXbs3Js-ua_9FtIqLYA'
    if (!apiKey) {
      setLoadError(new Error('Google Maps API key is not defined'))
      return
    }

    // Define the callback function
    window[CALLBACK_NAME] = () => {
      setIsLoaded(true)
    }

    // Check if the script already exists
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${CALLBACK_NAME}`
      script.async = true
      script.onerror = () => {
        setLoadError(new Error('Failed to load Google Maps API'))
      }
      document.head.appendChild(script)
    } else if (window.google && window.google.maps) {
      // If the script exists and Maps is already loaded, call the callback directly
      window[CALLBACK_NAME]()
    }

    return () => {
      // Cleanup
      window[CALLBACK_NAME] = undefined
    }
  }, [])

  return { isLoaded, loadError }
}

export default useGoogleMapsScript
