package com.laura.movies.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laura.movies.Entity.MovieEntity;
import com.laura.movies.Repository.MovieRepo;

@Service
public class MovieService {

    @Autowired
    private MovieRepo movieRepo;

    public List<MovieEntity> findAll() {
        return movieRepo.findAll();
    }

    public List<MovieEntity> findByGenreId(Integer id) {
        return movieRepo.findByGenreId(id);
    }

    public List<MovieEntity> findByWhoId(Integer id) {
        return movieRepo.findByWhoId(id);
    }

    public List<MovieEntity> findBySeen(Boolean seen) {
        return movieRepo.findBySeen(seen);
    }

    public List<MovieEntity> findByTag(String tag) {
        return movieRepo.findByTag(tag);
    }

    public List<MovieEntity> findAllByOrderByRatingAsc() {
        return movieRepo.findAllByOrderByRatingAsc();
    }

    public List<MovieEntity> findAllByOrderByRatingDesc() {
        return movieRepo.findAllByOrderByRatingDesc();
    }

    public List<MovieEntity> findAllByOrderByDateAsc() {
        return movieRepo.findAllByOrderByDateAsc();
    }

    public List<MovieEntity> findAllByOrderByDateDesc() {
        return movieRepo.findAllByOrderByDateDesc();
    }

    public List<MovieEntity> findByDurationGreaterThan(Integer duration) {
        return movieRepo.findByDurationGreaterThan(duration);
    }

    public List<MovieEntity> findByDurationLessThan(Integer duration) {
        return movieRepo.findByDurationLessThan(duration);
    }

    public List<MovieEntity> findByDurationBetween(Integer start, Integer end) {
        return movieRepo.findByDurationBetween(start, end);
    }

}
