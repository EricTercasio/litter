package com.example.litter.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.NaturalId;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;
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

    private Long likes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Trash parent;

    @OneToMany(mappedBy="parent", fetch = FetchType.LAZY)
    private Collection<Trash> children;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date", nullable = false, updatable = false)
    private Date creation_date;


    public Trash(String username, String message) {
        this.username = username;
        this.message = message;
    }

    public Trash() {
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public Trash getParent() {
        return parent;
    }

    public void setParent(Trash parent) {
        this.parent = parent;
    }

    public Collection<Trash> getChildren() {
        return children;
    }

    public void setChildren(Collection<Trash> children) {
        this.children = children;
    }
}
