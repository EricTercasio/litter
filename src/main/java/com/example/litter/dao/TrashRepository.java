package com.example.litter.dao;

import com.example.litter.model.Trash;
import com.example.litter.model.TrashLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface TrashRepository extends JpaRepository<Trash, Long> {
    Collection<Trash> findChildrenById(Long tid);
    Collection<Trash> findByParentIdIsNull();
}
