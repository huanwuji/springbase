package com.huanwuji.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class BaseController {

    Logger logger = LoggerFactory.getLogger(BaseController.class);

    protected void sendJson(HttpServletResponse response, String text) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType(MediaType.TEXT_XML_VALUE);
        try {
            response.getWriter().print(text);
        } catch (IOException e) {
            logger.error("发送json异常!", e);
        }
    }

    protected void sendSuccess(HttpServletResponse response, String text) {
        try {
            sendJson(response,
                    new ObjectMapper()
                            .writeValueAsString(new Status(true, text)));
        } catch (Exception e) {
            logger.error("发送json异常!", e);
        }
    }

    protected void sendError(HttpServletResponse response, String text) {
        try {
            sendJson(response,
                    new ObjectMapper().writeValueAsString(new Status(false,
                            text)));
        } catch (Exception e) {
            logger.error("发送json异常!", e);
        }
    }

    class Status {

        private boolean success;
        private String msg;

        public Status() {
        }

        public Status(boolean success, String msg) {
            super();
            this.success = success;
            this.msg = msg;
        }

        public boolean isSuccess() {
            return success;

        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }

    }
}