package com.huanwuji.entity.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.huanwuji.core.jpa.SystemParamsListener;
import com.huanwuji.core.jpa.TreeableEntityListener;
import com.huanwuji.entity.BasicMethod;
import com.huanwuji.entity.SystemParams;
import com.huanwuji.entity.Treeable;
import com.huanwuji.search.Search;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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
@EntityListeners(value = {TreeableEntityListener.class, SystemParamsListener.class})
@Table(name = "MENU")
@Search(all = true)
public class Menu extends BasicMethod implements Treeable<Menu, Long>, SystemParams {

    @Column(name = "CODE", nullable = true, length = 30)
    private String code;
    @Column(name = "NAME", nullable = true, length = 50)
    private String name;
    @Column(name = "TITLE", nullable = true, length = 200)
    private String title;
    @Column(name = "leaf", nullable = true, length = 2)
    private Boolean leaf;
    @Column(name = "TREE_ID", nullable = true, length = 100)
    private String treeId;
    @Column(name = "DESCR", nullable = true, length = 500, columnDefinition = "TEXT")
    private String descr;
    @Column(name = "URL", nullable = true, length = 250)
    private String url;
    @Column(name = "ICON", nullable = true, length = 255)
    private String icon;
    @Column(name = "TYPE", nullable = true, length = 20)
    private String type;
    @Column(name = "VALID", nullable = true, length = 2)
    private Boolean valid;

    @CreatedDate
    @Column(name = "CREATE_DATE", nullable = true, columnDefinition = "DATETIME")
    private Date createDate;

    @LastModifiedDate
    @Column(name = "MODIFY_DATE", nullable = true, columnDefinition = "DATETIME")
    private Date modifyDate;

    @JsonIgnore
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", nullable = true, updatable = false)
    private Menu parent;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parent")
    private List<Menu> subMenu;

    public Menu() {
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

    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }

    public String getTreeId() {
        return treeId;
    }

    public void setTreeId(String treeId) {
        this.treeId = treeId;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
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

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public Menu getParent() {
        return parent;
    }

    public void setParent(Menu parent) {
        this.parent = parent;
    }

    public List<Menu> getSubMenu() {
        return subMenu;
    }

    public void setSubMenu(List<Menu> subMenu) {
        this.subMenu = subMenu;
    }
}
