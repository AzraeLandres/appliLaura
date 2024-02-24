package com.laura.movies.Entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @ManyToOne
    @JoinColumn(name = "id_genre")
    private GenreEntity genre;

    @ManyToOne
    @JoinColumn(name = "id_who")
    private WhoEntity who;

}
