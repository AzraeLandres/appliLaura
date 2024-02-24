package com.laura.movies.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.laura.movies.Service.MovieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;
}
