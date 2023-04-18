package com.doran.doran.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@Setter
@Builder
@RedisHash(value = "sms", timeToLive = 180)
public class OrderToken {
    @Id
    private String id;
    private String orderTel;
    private String tokenNum;
    @TimeToLive
    private long expiredTime;
}
