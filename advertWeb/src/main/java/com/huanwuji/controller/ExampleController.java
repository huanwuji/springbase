package com.huanwuji.controller;

import com.huanwuji.entity.bean.Example;
import com.huanwuji.service.ExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-8-3
 * Time: 下午4:49
 * To change this template use File | Settings | File Templates.
 */
@RequestMapping("/example")
@Controller
public class ExampleController {

    @Autowired
    ExampleService exampleService;

    @RequestMapping("view")
    public String view(Model model) {
        List<Example> examples = exampleService.getExamples();
        model.addAttribute("beans", examples);
        return "view";
    }
}
