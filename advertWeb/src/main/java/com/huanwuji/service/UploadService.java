package com.huanwuji.service;

import com.huanwuji.context.UploadConstants;
import com.huanwuji.entity.bean.Attachment;
import com.huanwuji.repository.AttachmentRepository;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * description:.
 * User: huanwuji
 * create: 13-7-13 下午3:17
 */
public class UploadService {

    private String remoteImageSavePath;
    private String relativeFolder;
    @Autowired
    private AttachmentRepository attachmentRepository;

    public String uploadRemoteImage(String upfile, Long fk) throws IOException {
        String state = "远程图片抓取成功！";
        String[] arr = upfile.split("ue_separate_ue");
        String[] outSrc = new String[arr.length];
        for (int i = 0; i < arr.length; i++) {
            //格式验证
            String fileType = FilenameUtils.getExtension(arr[i]);
            if (!UploadConstants.imageTypes.contains(fileType)) {
                state = "图片类型不正确！";
                continue;
            }
            String saveName = System.currentTimeMillis() + RandomUtils.nextInt(10000)
                    + "." + fileType;
            //大小验证
            HttpURLConnection.setFollowRedirects(false);
            HttpURLConnection conn = (HttpURLConnection) new URL(arr[i]).openConnection();
            if (!conn.getContentType().contains("image")) {
                state = "请求地址头不正确";
                continue;
            }
            if (conn.getResponseCode() != 200) {
                state = "请求地址不存在！";
                continue;
            }
            SimpleDateFormat formater = new SimpleDateFormat("yyyyMMdd");
            String datePath = "/" + formater.format(new Date());
            File dir = new File(remoteImageSavePath + relativeFolder + datePath);
            FileUtils.forceMkdir(dir);
            String relativePath = remoteImageSavePath + datePath + "/" + saveName;
            String absolutePath = remoteImageSavePath + relativePath;
            File savetoFile = new File(absolutePath);
            outSrc[i] = relativePath;
            try {
                InputStream is = conn.getInputStream();
                OutputStream os = new FileOutputStream(savetoFile);
                IOUtils.copy(is, os);
                int b;
                while ((b = is.read()) != -1) {
                    os.write(b);
                }
                IOUtils.closeQuietly(os);
                IOUtils.closeQuietly(is);
                // 这里处理 inputStream
            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("页面无法访问");
            }
            Attachment attachment = new Attachment();
            attachment.setFk(fk);
            attachment.setExt(fileType);
            attachment.setFileName(saveName);
            attachment.setUrl(relativePath);
            attachmentRepository.save(attachment);
        }
        String outstr = "";
        for (String anOutSrc : outSrc) {
            outstr += anOutSrc + "ue_separate_ue";
        }
        outstr = outstr.substring(0, outstr.lastIndexOf("ue_separate_ue"));
        return "{'url':'" + outstr + "','tip':'"
                + state + "','srcUrl':'" + upfile + "'}";
    }

    public void setRemoteImageSavePath(String remoteImageSavePath) {
        this.remoteImageSavePath = remoteImageSavePath;
    }

    public void setRelativeFolder(String relativeFolder) {
        this.relativeFolder = relativeFolder;
    }

    public void setAttachmentRepository(AttachmentRepository attachmentRepository) {
        this.attachmentRepository = attachmentRepository;
    }
}
