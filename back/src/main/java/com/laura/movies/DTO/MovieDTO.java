package com.laura.movies.DTO;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MovieDTO {
    private Integer id;
    private Date date;
    private String vo;
    private String vf;
    private Integer year;
    private Integer duration;
    private Float rating;
    private String tag;
    private String review;
    private Boolean seen;
    private String posterUrl;

    private Set<GenreDTO> genre;
    private Set<WhoDTO> who;
}
