package com.example.litter.dao;

import com.example.litter.model.Role;
import com.example.litter.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);

}

