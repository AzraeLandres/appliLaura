package com.laura.movies.Controller;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

import com.laura.movies.Entity.MovieEntity;
import com.laura.movies.Repository.MovieRepo;
import com.laura.movies.Service.MovieService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieRepo movieRepository;

    @PostMapping("/add")
    public void addMovie(@RequestBody MovieEntity movie) {
        movieService.save(movie);
    }

    @GetMapping("/all")
    public List<MovieEntity> getAllMovies() {
        return movieService.findAll();

    }

    @GetMapping("/all/asc")
    public List<MovieEntity> getAllMoviesByVoAsc() {
        return movieService.findAllByOrderByVoAsc();
    }

    @GetMapping("/{id}")
    public Optional<MovieEntity> getMovieById(@PathVariable Integer id) {
        return movieService.findByMovieId(id);
    }

    @GetMapping("/genre/{id}")
    public List<MovieEntity> getMoviesByGenreId(@PathVariable Integer id) {
        return movieService.findByGenreId(id);
    }

    @GetMapping("/who/{id}")
    public List<MovieEntity> getMoviesByWhoId(@PathVariable Integer id) {
        return movieService.findByWhoId(id);
    }

    @GetMapping("/seen/{seen}")
    public List<MovieEntity> getMoviesBySeen(@PathVariable Boolean seen) {
        return movieService.findBySeen(seen);
    }

    @GetMapping("/unseen")
    public List<MovieEntity> getUnseenMovies() {
        return movieService.findUnseen();
    }

    @GetMapping("/unseen/last3")
    public List<MovieEntity> getUnseenLast3Movies() {
        return movieService.findUnseenLast3();
    }

    @GetMapping("/tag/{tag}")
    public List<MovieEntity> getMoviesByTag(@PathVariable String tag) {
        return movieService.findByTag(tag);
    }

    @GetMapping("/rating/asc")
    public List<MovieEntity> getMoviesByRatingAsc() {
        return movieService.findAllByOrderByRatingAsc();
    }

    @GetMapping("/rating/desc")
    public List<MovieEntity> getMoviesByRatingDesc() {
        return movieService.findAllByOrderByRatingDesc();
    }

    @GetMapping("/date/asc")
    public List<MovieEntity> getMoviesByDateAsc() {
        return movieService.findAllByOrderByDateAsc();
    }

    @GetMapping("/date/desc")
    public List<MovieEntity> getMoviesByDateDesc() {
        return movieService.findAllByOrderByDateDesc();
    }

    @GetMapping("/date/top3")
    public List<MovieEntity> getTop3MoviesByDateDesc() {
        return movieService.find3ByOrderByDateDesc();
    }

    @GetMapping("/duration/greater/{duration}")
    public List<MovieEntity> getMoviesByDurationGreaterThan(@PathVariable Integer duration) {
        return movieService.findByDurationGreaterThan(duration);
    }

    @GetMapping("/duration/less/{duration}")
    public List<MovieEntity> getMoviesByDurationLessThan(@PathVariable Integer duration) {
        return movieService.findByDurationLessThan(duration);
    }

    @GetMapping("/duration/between/{start}/{end}")
    public List<MovieEntity> getMoviesByDurationBetween(@PathVariable Integer start, @PathVariable Integer end) {
        return movieService.findByDurationBetween(start, end);
    }

    @PutMapping("/update/{id}")
    public void updateMovie(@RequestBody MovieEntity movie, @PathVariable Integer id) {
        movieService.updateMovie(movie, id);
    }

    @GetMapping("pages/{page}/{size}")
    public Page<MovieEntity> getMoviesByPage(@PathVariable Integer page, @PathVariable Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return movieRepository.findAll(pageable);
    }

}
