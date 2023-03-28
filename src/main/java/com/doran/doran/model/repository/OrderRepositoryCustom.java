package com.doran.doran.model.repository;

import java.util.Date;

public interface OrderRepositoryCustom {
    Long getCurrentSequence(Date currentDate);
}
