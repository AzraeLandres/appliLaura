package com.laura.movies.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laura.movies.Entity.GenreEntity;
import com.laura.movies.Repository.GenreRepo;

@Service
public class GenreService {

    @Autowired
    private GenreRepo genreRepo;

    public List<GenreEntity> findAll() {
        return genreRepo.findAll();
    }
}
