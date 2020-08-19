import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [
        {
          "id": 524047,
          "poster_path": "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
          "title": "Greenland",
          "average_rating": 9,
          "release_date": "2020-07-29"
        },
        {
          "id": 606234,
          "poster_path": "https://image.tmdb.org/t/p/original//eDnHgozW8vfOaLHzfpHluf1GZCW.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg",
          "title": "Archive",
          "average_rating": 8.5,
          "release_date": "2020-08-13"
        },
        {
          "id": 149,
          "poster_path": "https://image.tmdb.org/t/p/original//5KlRFKKSbyCiyYpZSS3A6G5bW0K.jpg",
          "backdrop_path": "https://image.tmdb.org/t/p/original//qZ4NYuwME0j6QgJmIE6AZMgmCaj.jpg",
          "title": "Akira",
          "average_rating": 9,
          "release_date": "1988-07-16"
        }
      ]
    }
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <main>
          <Movies movies={this.state.movies} />
        </main>
      </div>
    )
  }
}

export default App;
