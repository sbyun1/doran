package com.doran.doran.model.repository;

import com.doran.doran.model.entity.Order;

import java.util.Date;

public interface OrderRepositoryCustom {
    Long getCurrentSequence(Date currentDate);

    Order findByOrderSeq(int orderSeq);
}
