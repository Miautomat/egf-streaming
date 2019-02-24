class Player {
  constructor(pin, name, country, club, grade, rating, number_of_tournaments, last_tournament){
    this.pin = pin;
    this.name = name;
    this.country = country;
    this.club = club;
    this.grade = grade;
    this.rating = rating;
    this.number_of_tournaments = number_of_tournaments;
    this.last_tournament = last_tournament;
  }
};

module.exports = Player;
