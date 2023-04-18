package com.doran.doran.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SmsRequestBodyDto {
    private String type;
    private String contentType;
    private String countryCode;
    private String from;
    private String content;
    private List<SmsMessagesDto> messages;
}
