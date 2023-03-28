package com.doran.doran.model.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;

@Getter
@Setter
public class OrderInfoDto {
    @NotBlank(message = "주문자명은 필수 입력값입니다.")
    private String orderName;
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    @Pattern(regexp = "^\\d{6}$", message = "비밀번호는 6자리 숫자로 구성하세요.")
    private String orderPassword;
    private String orderMemo;
}
