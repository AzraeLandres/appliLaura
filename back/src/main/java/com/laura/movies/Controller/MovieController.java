package com.laura.movies.Controller;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.laura.movies.Entity.MovieEntity;
import com.laura.movies.Service.MovieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping("/add")
    public void addMovie(@RequestBody MovieEntity movie) {
        movieService.save(movie);
    }

    @GetMapping("/all")
    public List<MovieEntity> getAllMovies() {
        return movieService.findAll();
    }

}
