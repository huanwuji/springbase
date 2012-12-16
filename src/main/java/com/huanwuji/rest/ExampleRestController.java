package com.huanwuji.rest;

import com.huanwuji.entity.bean.Example;
import com.huanwuji.repository.ExampleRepository;
import com.huanwuji.service.ExampleService;
import flexjson.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-8-3
 * Time: 下午4:49
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping("/exampleRest")
public class ExampleRestController {

    @Autowired
    ExampleService exampleService;

    @Autowired
    private ExampleRepository exampleRepository;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> getAll(Model model, String callback) {
        List<Example> examples = exampleService.getExamples();
        return new ResponseEntity(callback + "(" + new JSONSerializer().exclude("*.class").serialize(examples) + ")", HttpStatus.OK);
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> findAll(Model model) {
//        List<Example> examples = exampleRepository.findAll();
        List<Example> examples = exampleService.getAllExamples();
        return new ResponseEntity(examples, HttpStatus.OK);
    }
}
