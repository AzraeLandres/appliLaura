package com.laura.movies.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.laura.movies.Entity.MovieEntity;

public interface MovieRepo extends JpaRepository<MovieEntity, Integer> {

    List<MovieEntity> findByGenreId(Integer id);

    List<MovieEntity> findByWhoId(Integer id);

    List<MovieEntity> findBySeen(Boolean seen);

    List<MovieEntity> findAll();

    List<MovieEntity> findByTag(String tag);

    List<MovieEntity> findAllByOrderByRatingAsc();

    List<MovieEntity> findAllByOrderByRatingDesc();

    List<MovieEntity> findAllByOrderByDateAsc();

    List<MovieEntity> findAllByOrderByDateDesc();

    List<MovieEntity> findByDurationGreaterThan(Integer duration);

    List<MovieEntity> findByDurationLessThan(Integer duration);

    List<MovieEntity> findByDurationBetween(Integer start, Integer end);

}
