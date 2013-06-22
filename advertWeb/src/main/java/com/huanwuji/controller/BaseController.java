package com.huanwuji.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseController {
    Logger logger = LoggerFactory.getLogger(BaseController.class);

    class Status {
        private boolean success;
        private Object msg;

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

        public Object getMsg() {
            return msg;
        }

        public void setMsg(Object msg) {
            this.msg = msg;
        }
    }
}