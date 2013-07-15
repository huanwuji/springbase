package com.huanwuji.utils;

import com.google.common.collect.Sets;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Random;
import java.util.Set;

/**
 * UEditor文件上传辅助类
 */
public class Uploader {
    // 输出文件地址
    private String url = "";
    // 上传文件名
    private String fileName = "";
    // 状态
    private String state = "";
    // 文件类型
    private String type = "";
    // 原始文件名
    private String originalName = "";
    // 文件大小
    private String size = "";

    private HttpServletRequest request = null;
    private String title = "";

    // 保存路径
    private String savePath = "upload";
    private String relativeFolder;
    // 文件允许格式
    private Set<String> allowFiles = Sets.newHashSet("rar", "doc", "docx", "zip", "pdf", "txt", "swf", "wmv", "gif", "png", "jpg", "jpeg", "bmp");
    // 文件大小限制，单位KB
    private int maxSize = 20 * 1024 * 1024;

    private static HashMap<String, String> ERROR_INFO = new HashMap<String, String>();

    public Uploader() {
    }

    static {
        ERROR_INFO.put("SUCCESS", "SUCCESS"); //默认成功
        ERROR_INFO.put("NOFILE", "未包含文件上传域");
        ERROR_INFO.put("TYPE", "不允许的文件格式");
        ERROR_INFO.put("SIZE", "文件大小超出限制");
        ERROR_INFO.put("ENTYPE", "请求类型ENTYPE错误");
        ERROR_INFO.put("REQUEST", "上传请求异常");
        ERROR_INFO.put("IO", "IO异常");
        ERROR_INFO.put("DIR", "目录创建失败");
        ERROR_INFO.put("UNKNOWN", "未知错误");
    }

    public void init(HttpServletRequest request) {
        this.request = request;
    }

    public void upload() throws Exception {
        MultipartRequest multipartRequest = (MultipartRequest) this.request;
        String currRelativeFolder = this.getFolder(this.relativeFolder);
        FileUtils.forceMkdir(new File(this.savePath + currRelativeFolder));
        MultipartFile multipartFile = multipartRequest.getFile("upfile");
        if (multipartFile == null) {
            this.state = ERROR_INFO.get("NOFILE");
            return;
        }
        if (multipartFile.getSize() > this.maxSize) {
            this.state = ERROR_INFO.get("SIZE");
            return;
        }
        this.originalName = multipartFile.getOriginalFilename();
        if (!this.checkFileType(this.originalName)) {
            this.state = ERROR_INFO.get("TYPE");
            return;
        }
        this.fileName = this.getName(this.originalName);
        this.type = this.getFileExt(this.originalName);
        this.url = currRelativeFolder + "/" + fileName;
        FileUtils.copyInputStreamToFile(multipartFile.getInputStream(), new File(savePath + currRelativeFolder + "/" + this.fileName));
        this.state = ERROR_INFO.get("SUCCESS");
        //UE中只会处理单张上传，完成后即退出
    }

    /**
     * 接受并保存以base64格式上传的文件
     *
     * @param fieldName
     */
    public void uploadBase64(String fieldName) {
        String savePath = this.getFolder(this.savePath);
        String base64Data = this.request.getParameter(fieldName);
        this.fileName = this.getName("test.png");
        this.url = savePath + "/" + this.fileName;
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            File outFile = new File(this.getPhysicalPath(this.url));
            OutputStream ro = new FileOutputStream(outFile);
            byte[] b = decoder.decodeBuffer(base64Data);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {
                    b[i] += 256;
                }
            }
            ro.write(b);
            ro.flush();
            ro.close();
            this.state = ERROR_INFO.get("SUCCESS");
        } catch (Exception e) {
            this.state = ERROR_INFO.get("IO");
        }
    }

    /**
     * 文件类型判断
     *
     * @param fileName
     * @return
     */
    private boolean checkFileType(String fileName) {
        String ext = FilenameUtils.getExtension(fileName);
        return allowFiles.contains(ext);
    }

    public void setRelativeFolder(String relativeFolder) {
        this.relativeFolder = relativeFolder;
    }

    /**
     * 获取文件扩展名
     *
     * @return string
     */
    private String getFileExt(String fileName) {
        return FilenameUtils.getExtension(fileName);
    }

    /**
     * 依据原始文件名生成新文件名
     *
     * @return
     */
    private String getName(String fileName) {
        Random random = new Random();
        return System.currentTimeMillis() + random.nextInt(10000) + "." + this.getFileExt(fileName);
    }

    /**
     * 根据字符串创建本地目录 并按照日期建立子目录返回
     *
     * @param path
     * @return
     */
    private String getFolder(String path) {
        SimpleDateFormat formater = new SimpleDateFormat("yyyyMMdd");
        path += "/" + formater.format(new Date());
        return path;
    }

    /**
     * 根据传入的虚拟路径获取物理路径
     *
     * @param path
     * @return
     */
    private String getPhysicalPath(String path) {
        String servletPath = this.request.getServletPath();
        String realPath = this.request.getSession().getServletContext()
                .getRealPath(servletPath);
        return new File(realPath).getParent() + "/" + path;
    }

    public void setSavePath(String savePath) {
        this.savePath = savePath;
    }

    public void setMaxSize(int size) {
        this.maxSize = size;
    }

    public String getSize() {
        return this.size;
    }

    public String getUrl() {
        return this.url;
    }

    public String getFileName() {
        return this.fileName;
    }

    public String getState() {
        return this.state;
    }

    public String getTitle() {
        return this.title;
    }

    public String getType() {
        return this.type;
    }

    public String getOriginalName() {
        return this.originalName;
    }

    public Result getResult() {
        return new Result(this);
    }

    public String getSavePath() {
        return savePath;
    }

    public void setAllowFiles(String allowFiles) {
        this.allowFiles = Sets.newHashSet(allowFiles.split(","));
    }

    public class Result {
        private Uploader uploader;

        public Result(Uploader uploader) {
            this.uploader = uploader;
        }

        public String getFileType() {
            return uploader.getType();
        }

        public String getOriginal() {
            return uploader.getOriginalName();
        }

        public String getUrl() {
            return uploader.getUrl();
        }

        public String getTitle() {
            return uploader.getTitle();
        }

        public String getState() {
            return uploader.getState();
        }
    }
}