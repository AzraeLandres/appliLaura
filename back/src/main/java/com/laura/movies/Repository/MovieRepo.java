package com.laura.movies.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.laura.movies.Entity.MovieEntity;

@Repository
public interface MovieRepo extends JpaRepository<MovieEntity, Integer> {

    List<MovieEntity> findByGenreId(Integer id);

    List<MovieEntity> findByWhoId(Integer id);

    List<MovieEntity> findBySeen(Boolean seen);

    @Query("SELECT m FROM MovieEntity m WHERE m.seen = false")
    List<MovieEntity> findUnseen();

    @Query("SELECT m FROM MovieEntity m WHERE m.seen = false")
    List<MovieEntity> findUnseenLast3(Pageable pageable);

    List<MovieEntity> findAll();

    List<MovieEntity> findByTag(String tag);

    List<MovieEntity> findAllByOrderByRatingAsc();

    List<MovieEntity> findAllByOrderByRatingDesc();

    List<MovieEntity> findAllByOrderByDateAsc();

    @Query("SELECT m FROM MovieEntity m WHERE m.date IS NOT NULL ORDER BY m.date DESC")
    List<MovieEntity> findAllByOrderByDateDesc();

    @Query("SELECT m FROM MovieEntity m WHERE m.date IS NOT NULL ORDER BY m.date DESC")
    List<MovieEntity> find3ByOrderByDateDesc(Pageable pageable);

    List<MovieEntity> findByDuration(Integer duration);

    List<MovieEntity> findByDurationGreaterThan(Integer duration);

    List<MovieEntity> findByDurationLessThan(Integer duration);

    List<MovieEntity> findByDurationBetween(Integer start, Integer end);

    @SuppressWarnings("unchecked")
    @Override
    MovieEntity save(MovieEntity movieEntity);

}
