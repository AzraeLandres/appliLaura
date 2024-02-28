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
  genre: { id: number; name: string };
  who: { id: number; name: string };

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
    genre: { id: number; name: string },
    who: { id: number; name: string }
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
    this.genre = genre;
    this.who = who;
  }
}
