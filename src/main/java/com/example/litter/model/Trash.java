package com.example.litter.model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

//This would be the "parent" tweet, where its not a reply to anything.
@Entity
@Table(name = "trash")
public class Trash {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String username;

    @NotBlank
    private String message;

    private int likes;

    public Trash(String username, String message, int likes) {
        this.username = username;
        this.message = message;
        this.likes = likes;
    }

    public Trash() {
    }

    public void like(){
        this.likes++;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
