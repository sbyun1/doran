package com.doran.doran.model.repository;

import com.doran.doran.model.entity.OrderToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderTokenRepository extends CrudRepository<OrderToken, String> {
    Optional<OrderToken> findByOrderTelAndTokenNum(String orderTel, String tokenNum);
}