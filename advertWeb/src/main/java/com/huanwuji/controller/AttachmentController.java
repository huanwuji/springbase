package com.huanwuji.controller;

import com.huanwuji.entity.bean.Attachment;
import com.huanwuji.repository.AttachmentRepository;
import com.huanwuji.utils.ControllerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * description:.
 * User: huanwuji
 * create: 13-8-1 下午10:44
 */
@RequestMapping("/attachment")
@Controller
public class AttachmentController {

    @Autowired
    private AttachmentRepository attachmentRepository;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Object list(HttpServletRequest request) {
        return ControllerUtils.getResult(request, attachmentRepository, Attachment.class);
    }

}
