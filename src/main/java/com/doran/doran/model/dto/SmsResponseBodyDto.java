package com.doran.doran.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SmsResponseBodyDto {
    String requestId;
    String requestTime;
    String statusCode;
    String statusName;
}
