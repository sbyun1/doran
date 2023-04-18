package com.doran.doran.model.service;

import com.doran.doran.model.dto.SmsRequestBodyDto;
import com.doran.doran.model.dto.SmsResponseBodyDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.doran.doran.model.dto.SmsMessagesDto;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MessageService {
    @Value("${naver.sms.url}")
    private String url;
    @Value("${naver.sms.serviceId}")
    private String serviceId;
    @Value("${naver.sms.accessKey}")
    private String accessKey;
    @Value("${naver.sms.secretKey}")
    private String secretKey;
    @Value("${naver.sms.fromTel}")
    private String fromTel;

    public void sendMessage(String tokenNum, String telNum) throws JsonProcessingException, UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException {
        Map<String, Object> result = new ConcurrentHashMap<>();
        List<SmsMessagesDto> messages = new ArrayList<>();

        String content = "[CAFE DORAN] 인증번호는 [" + tokenNum + "] 입니다.";

        messages.add(new SmsMessagesDto(telNum, content));

        HttpHeaders requestHeader = createHeader();
        String requestBody = createBody(content, messages);
        String requestURL = url + "/services/" + serviceId + "/messages";

        result.put("token", tokenNum);
        result.put("status", sendRequest(requestURL, requestBody, requestHeader));
    }

    private HttpHeaders createHeader() throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        HttpHeaders headers = new HttpHeaders();
        Long time = System.currentTimeMillis();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", makeSignature(time));

        return headers;
    }

    private String createBody(String content, List<SmsMessagesDto> messages) throws JsonProcessingException {
        SmsRequestBodyDto smsRequestBodyDto = new SmsRequestBodyDto(
                "SMS", "COMM", "82", fromTel, content, messages);
        String jsonBody = new ObjectMapper().writeValueAsString(smsRequestBodyDto);

        return jsonBody;
    }

    private boolean sendRequest(String requestURL, String requestBody, HttpHeaders requestHeader) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException {
        HttpEntity<String> request = new HttpEntity<>(requestBody, requestHeader);
        RestTemplate restTemplate = new RestTemplate();
        SmsResponseBodyDto response = restTemplate.postForObject(new URI(requestURL), request, SmsResponseBodyDto.class);
        if (!response.getStatusCode().equals("202")) { // 202인 경우에만 전송 성공
            return false;
        }
        return true;
    }

    /*
     * NAVER Cloud Platform 인증키 및 Signature 생성 가이드
     * (https://api.ncloud-docs.com/docs/common-ncpapi)
     */
    public String makeSignature(Long time) throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException {
        String space = " ";                    // one space
        String newLine = "\n";                    // new line
        String method = "POST";                    // method
        String url = "/sms/v2/services/" + serviceId + "/messages";    // url (include query string)
        String timestamp = time.toString();            // current timestamp (epoch)
        String accessKey = this.accessKey;           // access key id (from portal or Sub Account)
        String secretKey = this.secretKey;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }
}
