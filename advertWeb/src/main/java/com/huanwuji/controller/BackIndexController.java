package com.huanwuji.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-23 下午8:58
 */
@RequestMapping("/back_index")
@Controller
public class BackIndexController {

    @RequestMapping("")
    public String backIndex() {
        return "back_index";
    }

}
