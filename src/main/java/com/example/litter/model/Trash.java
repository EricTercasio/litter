package com.example.litter.model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "trash")
public class Trash {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Trash parent;

    @OneToMany(mappedBy = "parent")
    private Collection<Trash> children;

    @NotBlank
    private String username;

    @NotBlank
    private String message;

    private int likes;

    public Trash(Trash parent, String username, String message, int likes) {
        this.parent = parent;
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

    public Collection<Trash> getChildren() {
        return children;
    }

    public void setChildren(Collection<Trash> children) {
        this.children = children;
    }

    public void addChild(Trash child){
        this.children.add(child);
    }

    public Trash getParent() {
        return parent;
    }

    public void setParent(Trash parent) {
        this.parent = parent;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
