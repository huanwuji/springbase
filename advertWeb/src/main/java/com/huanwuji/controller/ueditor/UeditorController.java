package com.huanwuji.controller.ueditor;

import com.huanwuji.context.UploadConstants;
import com.huanwuji.entity.bean.Attachment;
import com.huanwuji.lang.KeyTools;
import com.huanwuji.repository.AttachmentRepository;
import com.huanwuji.service.UploadService;
import com.huanwuji.utils.SpringContextHolder;
import com.huanwuji.utils.Uploader;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/**
 * description:.
 * User: huanwuji
 * create: 13-7-11 下午8:36
 */
@RequestMapping("/ueditor")
@Controller
public class UeditorController {
    @Autowired
    private UploadService uploadService;
    @Autowired
    private AttachmentRepository attachmentRepository;

    public static final String SUCCESS = "SUCCESS";

    @RequestMapping(value = "/fileUp/{key}/{fkId}")
    public ResponseEntity<String> fileUp(HttpServletRequest request,
                                         @PathVariable("key") String key, @PathVariable("fkId") Long fkId) throws Exception {
        Uploader fileUploader = SpringContextHolder.getBean("fileUploader");
        fileUploader.init(request);        //允许的文件最大尺寸，单位KB
        fileUploader.upload();
        if (SUCCESS.equals(fileUploader.getState())) {
            Attachment attachment = new Attachment();
            attachment.setFk(KeyTools.getFk(key, fkId));
            attachment.setExt(fileUploader.getType());
            attachment.setName(fileUploader.getOriginalName());
            attachment.setUrl(fileUploader.getUrl());
            attachment.setFileName(fileUploader.getFileName());
            attachmentRepository.save(attachment);
        }
        return new ResponseEntity<String>("{'url':'" + fileUploader.getUrl() + "','fileType':'" +
                fileUploader.getType() + "','state':'" + fileUploader.getState() + "','original':'"
                + fileUploader.getOriginalName() + "'}", HttpStatus.OK);
    }

    @RequestMapping(value = "/getMovie")
    public ResponseEntity<String> getMovie(String searchKey, String videotype) throws IOException {
        StringBuilder readOneLineBuff = new StringBuilder();
        searchKey = URLEncoder.encode(searchKey, "utf-8");
        URL url = new URL("http://api.tudou.com/v3/gw?method=item.search&appKey=myKey&format=json&kw=" +
                searchKey + "&pageNo=1&pageSize=20&channelId=" + videotype + "&inDays=7&media=v&sort=s");
        URLConnection conn = url.openConnection();
        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
        String line;
        while ((line = reader.readLine()) != null) {
            readOneLineBuff.append(line);
        }
        String content = readOneLineBuff.toString();
        reader.close();
        return new ResponseEntity<String>(content, HttpStatus.OK);
    }

    @RequestMapping(value = "/getRemoteImage/{key}/{fkId}")
    public ResponseEntity<String> getRemoteImage(String upfile,
                                                 @PathVariable("key") String key, @PathVariable("fkId") Long fkId) throws IOException {
        String result = uploadService.uploadRemoteImage(upfile, KeyTools.getFk(key, fkId));
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/imageManager/{key}/{fkId}")
    public ResponseEntity<String> imageManager(@PathVariable("key") String key,
                                               @PathVariable("fkId") Long fkId) throws IOException {
        List<Attachment> attachments = attachmentRepository.findByFk(KeyTools.getFk(key, fkId));
        List<String> imgSrcs = new ArrayList<String>(attachments.size());
        for (Attachment attachment : attachments) {
            imgSrcs.add(attachment.getUrl());
        }
        String result = StringUtils.join(imgSrcs, UploadConstants.UE_SEPARATE).replace(File.separator, "/").trim();
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/imageUp/{key}/{fkId}")
    public ResponseEntity<Uploader.Result> imageUp(HttpServletRequest request,
                                                   @PathVariable("key") String key, @PathVariable("fkId") Long fkId) throws Exception {
        Uploader imageUploader = SpringContextHolder.getBean("imageUploader");
        imageUploader.init(request);
        imageUploader.upload();
        if (SUCCESS.equalsIgnoreCase(imageUploader.getState())) {
            Attachment attachment = new Attachment();
            attachment.setFk(KeyTools.getFk(key, fkId));
            attachment.setExt(imageUploader.getType());
            attachment.setName(imageUploader.getOriginalName());
            attachment.setUrl(imageUploader.getUrl());
            attachment.setFileName(imageUploader.getFileName());
            attachmentRepository.save(attachment);
        }
        return new ResponseEntity<Uploader.Result>(imageUploader.getResult(), HttpStatus.OK);
    }

    @RequestMapping(value = "/scrawlUp")
    public ResponseEntity<String> scrawlUp(String action, HttpServletRequest request) throws Exception {
        Uploader imageUploader = SpringContextHolder.getBean("imageUploader");
        imageUploader.init(request);
        String result;
        if (action != null && action.equals("tmpImg")) {
            imageUploader.upload();
            result = "<script>parent.ue_callback('" + imageUploader.getUrl() + "','" + imageUploader.getState() + "')</script>";
        } else {
            imageUploader.uploadBase64("content");
            result = "{'url':'" + imageUploader.getUrl() + "',state:'" + imageUploader.getState() + "'}";
        }
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }
}