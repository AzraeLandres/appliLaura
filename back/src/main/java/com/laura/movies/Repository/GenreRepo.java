package com.laura.movies.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laura.movies.Entity.GenreEntity;

@Repository
public interface GenreRepo extends JpaRepository<GenreEntity, Integer> {

    List<GenreEntity> findAll();

}
