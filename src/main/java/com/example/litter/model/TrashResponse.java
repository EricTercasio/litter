package com.example.litter.model;
/*
    Subject to rename, can't think of a proper name ATM (maybe meaning this is a bad design choice?)
    This class will be used as a response for a user liking a trash
    It includes the Trash object itself, and a boolean representing if it was liked or un-liked.

 */
public class TrashResponse {

    private Trash trash;

    private Boolean liked;

    public TrashResponse(Trash trash, Boolean liked) {
        this.trash = trash;
        this.liked = liked;
    }

    public TrashResponse() {
    }

    public Trash getTrash() {
        return trash;
    }

    public void setTrash(Trash trash) {
        this.trash = trash;
    }

    public Boolean getLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }
}
