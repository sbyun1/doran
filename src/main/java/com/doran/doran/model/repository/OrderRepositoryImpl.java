package com.doran.doran.model.repository;

import static com.doran.doran.model.entity.QOrder.order;

import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

        Long queryResults = jpaQueryFactory
                .select(order.count())
                .from(order)
                .where(formattedDate.eq(formattedCurrentDate))
                .fetchOne();

        return queryResults;
    }
}
