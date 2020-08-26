export const getMovies = async () => {
  const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
  const movies = await response.json()
  return movies;
}

export const checkLoginCredentials = async (loginInfo) => {
  const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  })
    const validation = await response.json()
    return validation;
}

export const fetchUserRatings = async (userId) => {
  const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`)
   const userRatings = await response.json(); 
   return userRatings; 
}

export const postNewRating = async (userId, movieId, userRating) => {
  const postResponse = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        movie_id: movieId,
        rating: parseInt(userRating)
      }
    )
  });
  return postResponse; 
}

export const deleteRating = async (userId, ratingId) => {
  const deleteResponse = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return deleteResponse;
}