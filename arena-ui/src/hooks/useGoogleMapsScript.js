import { useState, useEffect } from 'react'

const useGoogleMapsScript = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      console.log('Google Maps already loaded')
      setIsLoaded(true)
      return
    }

    const apiKey = 'AIzaSyB6gP-Zq6mIDhh3FXbs3Js-ua_9FtIqLYA'
    if (!apiKey) {
      console.error('Google Maps API key is not defined')
      setLoadError('API key is missing')
      return
    }

    // Check if the script is already in the DOM
    const existingScript = document.getElementById('google-maps-script')
    if (existingScript) {
      console.log('Google Maps script already in DOM')

      // Check if it has loaded fully
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true)
      } else {
        setLoadError(
          'Google Maps script already in DOM, but failed to initialize'
        )
      }
      return
    }

    // Create and append the script element if it doesn't exist
    const script = document.createElement('script')
    script.id = 'google-maps-script'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true

    // Script load success callback
    const onScriptLoad = () => {
      console.log('Google Maps script loaded successfully')
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true)
      } else {
        console.error(
          'Google Maps script loaded, but global objects not available'
        )
        setLoadError('Google Maps failed to initialize properly')
      }
    }

    // Script load error callback
    const onScriptError = (error) => {
      console.error('Error loading Google Maps script:', error)
      setLoadError('Failed to load Google Maps')
    }

    // Attach the load and error event listeners
    script.addEventListener('load', onScriptLoad)
    script.addEventListener('error', onScriptError)

    // Append the script to the document head
    document.head.appendChild(script)

    // Cleanup function to remove event listeners when unmounting
    return () => {
      script.removeEventListener('load', onScriptLoad)
      script.removeEventListener('error', onScriptError)
    }
  }, [])

  return { isLoaded, loadError }
}

export default useGoogleMapsScript
