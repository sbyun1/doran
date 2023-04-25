package com.doran.doran.model.repository;

import static com.doran.doran.model.entity.QOrder.order;

import com.doran.doran.model.entity.Order;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;

public class OrderRepositoryImpl implements OrderRepositoryCustom {
    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Override
    public Long getCurrentSequence(Date currentDate) {
        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})"
                , order.orderDate
                , ConstantImpl.create("%Y-%m-%d")
        );

        String formattedCurrentDate = new SimpleDateFormat("yyyy-MM-dd").format(currentDate);

        Long queryResult = jpaQueryFactory
                .select(formattedDate.count())
                .from(order)
                .where(formattedDate.eq(formattedCurrentDate))
                .fetchOne();

        return queryResult;
    }

    @Override
    public Order findByOrderSeq(int orderSeq) {
        Order queryResult = jpaQueryFactory
                .select(order)
                .from(order)
                .where(order.orderSeq.eq(orderSeq))
                .orderBy(order.orderDate.desc())
                .limit(1)
                .fetchOne();

        return queryResult;
    }
}
