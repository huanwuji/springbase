package com.huanwuji.entity.bean;

import com.huanwuji.entity.BasicMethod;
import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
@Table(name = "ENTRY")
public class Entry extends BasicMethod {

    @Column(name = "CODE", nullable = true, length = 30)
    private String code;
    @Column(name = "NAME", nullable = true, length = 50)
    private String name;
    @Column(name = "TITLE", nullable = true, length = 200)
    private String title;
    @Column(name = "URL", nullable = true, length = 250)
    private String url;
    @Column(name = "ICON", nullable = true, length = 255)
    private String icon;
    @Column(name = "TYPE", nullable = true, length = 20)
    private String type;
    @Column(name = "CONTENT", nullable = true, length = 500, columnDefinition = "MEDIUMINT")
    private String content;
    @Column(name = "VALID", nullable = true, length = 2)
    private Boolean valid;
    @Column(name = "FK", nullable = true)
    private Long fk;

    @CreatedDate
    @Column(name = "CREATE_DATE", nullable = true)
    private DateTime createDate;

    @LastModifiedDate
    @Column(name = "MODIFY_DATE", nullable = true)
    private DateTime modifyDate;

    public Entry() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public Long getFk() {
        return fk;
    }

    public void setFk(Long fk) {
        this.fk = fk;
    }

    public DateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(DateTime createDate) {
        this.createDate = createDate;
    }

    public DateTime getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(DateTime modifyDate) {
        this.modifyDate = modifyDate;
    }
}
