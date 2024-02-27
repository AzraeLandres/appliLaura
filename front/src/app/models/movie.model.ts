export class Movie {
  id: number;
  date: Date;
  vo: string;
  vf: string;
  year: number;
  duration: number;
  rating: number;
  tag: string;
  review: string;
  seen: boolean;
  posterUrl: string;
  id_genre: number;
  id_who: number;

  constructor(
    id: number,
    date: Date,
    vo: string,
    vf: string,
    year: number,
    duration: number,
    rating: number,
    tag: string,
    review: string,
    seen: boolean,
    posterUrl: string,
    id_genre: number,
    id_who: number
  ) {
    this.id = id;
    this.date = date;
    this.vo = vo;
    this.vf = vf;
    this.year = year;
    this.duration = duration;
    this.rating = rating;
    this.tag = tag;
    this.review = review;
    this.seen = seen;
    this.posterUrl = posterUrl;
    this.id_genre = id_genre;
    this.id_who = id_who;
  }
}
