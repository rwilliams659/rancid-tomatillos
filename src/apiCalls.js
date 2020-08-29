export const getMovies = async () => {
  const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
  const movies = await checkResponse(response); 
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
  const validation = await checkResponse(response);
  return validation;
}

export const fetchUserRatings = async (userId) => {
  const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`)
  const userRatings = await checkResponse(response);
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
  const response = await checkResponse(postResponse)
  return response; 
}

export const deleteRating = async (userId, ratingId) => {
  const deleteResponse = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!deleteResponse.ok) {
    throw new Error(deleteResponse.statusText)
  } else {
    return 'Success';
  }
}

export const postComment = async (movieId, author, comment) => {
const response = await fetch(`http://localhost:3001/api/v1/movies/${movieId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        author: author,
        comment: comment
      }
    )
  });
  const commentResponse = await checkResponse(response)
  return commentResponse; 
}

const checkResponse = async (response) => {
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  } else {
    return response.json()
  }
};