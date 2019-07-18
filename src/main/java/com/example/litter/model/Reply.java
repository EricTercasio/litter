package com.example.litter.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long parentId;

    @NotBlank
    private String username;

    @NotBlank
    private String message;

    private Long likes;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date", nullable = false, updatable = false)
    private Date creation_date;

    public Reply(@NotNull Long parentId, @NotBlank String username, @NotBlank String message, Long likes) {
        this.parentId = parentId;
        this.username = username;
        this.message = message;
        this.likes = likes;
    }

    public Reply() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    @Override
    public String toString() {
        return "Reply{" +
                "id=" + id +
                ", parentId=" + parentId +
                ", username='" + username + '\'' +
                ", message='" + message + '\'' +
                ", likes=" + likes +
                ", creation_date=" + creation_date +
                '}';
    }
}
