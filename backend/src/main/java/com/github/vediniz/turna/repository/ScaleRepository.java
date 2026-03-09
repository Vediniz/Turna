package com.github.vediniz.turna.repository;

import com.github.vediniz.turna.entity.Scale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScaleRepository extends JpaRepository<Scale, Long> {
}