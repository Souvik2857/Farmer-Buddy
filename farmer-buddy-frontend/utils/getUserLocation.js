
export function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy, // in meters
        });
      },
      (err) => {
        // 1 = permission denied, 2 = position unavailable, 3 = timeout
        reject(err);
      },
      {
        enableHighAccuracy: false, // faster, uses Wi-Fi/cell; set true for GPS
        timeout: 10000,
        maximumAge: 5 * 60 * 1000, // reuse a position up to 5 min old
      }
    );
  });
}