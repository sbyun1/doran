package com.doran.doran.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SmsResponseBodyDto {
    String requestId;
    String requestTime;
    String statusCode;
    String statusName;
}
