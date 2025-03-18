import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export const getEchoInstance = () => {
  window.Pusher = Pusher

  return new Echo({
    broadcaster: 'reverb',
    // authEndpoint: 'http://www.starterapi.com/broadcasting',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  })
}
