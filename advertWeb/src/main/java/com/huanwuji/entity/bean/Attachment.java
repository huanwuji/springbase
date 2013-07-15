package com.huanwuji.entity.bean;

import com.huanwuji.entity.BasicMethod;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-7-31
 * Time: 下午5:09
 * To change this template use File | Settings | File Templates.
 */
//菜单
@Entity
@Table(name = "ATTACHMENT")
public class Attachment extends BasicMethod {

    @Column(name = "FK", nullable = true)
    private Long fk;
    @Column(name = "EXT", nullable = true, length = 10)
    private String ext;
    @Column(name = "TYPE", nullable = true, length = 20)
    private String type;
    @Column(name = "NAME", nullable = true, length = 50)
    private String name;
    @Column(name = "FILE_NAME", nullable = true, length = 50)
    private String fileName;
    @Column(name = "URL", nullable = true, length = 250)
    private String url;

//    @CreatedDate
//    @Column(name = "CREATE_DATE", nullable = true)
//    private DateTime createDate;
//
//    @LastModifiedDate
//    @Column(name = "MODIFY_DATE", nullable = true)
//    private DateTime modifyDate;

    public Attachment() {
    }

    public Long getFk() {
        return fk;
    }

    public void setFk(Long fk) {
        this.fk = fk;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
