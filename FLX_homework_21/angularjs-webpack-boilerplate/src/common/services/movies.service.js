export class MoviesService {
  constructor($http) {
    this.$http = $http;
  }

  findMovieById(id) {
    return this.$http
      .get('https://reactjs-cdp.herokuapp.com/movies/' + id)
      .then(res => res.data, err => console.log(err));
  }

  getAllMovies() {
    return this.$http
      .get('https://reactjs-cdp.herokuapp.com/movies?limit=100')
      .then(res => res.data.data, err => console.log(err));
  }
}

MoviesService.serviceName = 'moviesService';
MoviesService.$inject = ['$http'];
