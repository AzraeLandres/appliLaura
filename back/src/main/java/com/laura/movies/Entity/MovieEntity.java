package com.laura.movies.Entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;

@Data
@Entity
@Table(name = "movies")
@NoArgsConstructor
@AllArgsConstructor
public class MovieEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @JsonBackReference(value = "genre-movie")
    @ManyToOne
    @JoinColumn(name = "id_genre")
    private GenreEntity genre;

    @JsonBackReference(value = "who-movie")
    @ManyToOne
    @JoinColumn(name = "id_who")
    private WhoEntity who;

}
