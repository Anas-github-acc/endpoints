const pool = require('../db/pool');

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

async function createSchool(data) {
  const { name, address, latitude, longitude } = data;

  const [result] = await pool.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );

  return {
    id: result.insertId,
    name,
    address,
    latitude,
    longitude,
  };
}

async function getSchoolsSortedByDistance(userLatitude, userLongitude) {
  const [schools] = await pool.execute(
    'SELECT id, name, address, latitude, longitude FROM schools'
  );

  const withDistance = schools.map((school) => ({
    ...school,
    distanceKm: Number(
      haversineDistanceKm(userLatitude, userLongitude, school.latitude, school.longitude).toFixed(3)
    ),
  }));

  withDistance.sort((a, b) => a.distanceKm - b.distanceKm);

  return withDistance;
}

module.exports = {
  createSchool,
  getSchoolsSortedByDistance,
};
