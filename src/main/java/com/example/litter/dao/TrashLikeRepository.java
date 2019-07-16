package com.example.litter.dao;

import com.example.litter.model.TrashLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrashLikeRepository extends JpaRepository<TrashLike, Long> {
    Optional<TrashLike> findByUserIdAndTrashId(Long uid, Long tid);
    Long countByTrashId(Long trashId);

    Iterable<TrashLike> findByUserId(Long uid);
}
