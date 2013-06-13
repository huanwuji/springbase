package com.huanwuji.entity.bean;

import com.huanwuji.core.jpa.TreeableEntityListener;
import com.huanwuji.entity.interfaced.Treeable;

import javax.persistence.*;
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
@EntityListeners(value = TreeableEntityListener.class)
@Table(name = "MENU")
public class Menu extends BasicMethod implements Treeable<Menu, Long> {

    public static final String CODE = "code";
    public static final String NAME = "name";
    public static final String IS_LEAF = "isLeaf";
    public static final String TREE_ID = "treeId";
    public static final String DESCR = "descr";
    public static final String URL = "url";
    public static final String ICON = "icon";
    public static final String TYPE = "type";
    public static final String IS_VALID = "isValid";
    public static final String PARENT = "parent";

    //编码
    @Column(name = "CODE", nullable = true, length = 50)
    private String code;

    //名称
    @Column(name = "NAME", nullable = true, length = 255)
    private String name;

    //是否是叶子节点
    @Column(name = "IS_LEAF", nullable = true, length = 2)
    private Boolean isLeaf;

    //树Id
    @Column(name = "TREE_ID", nullable = true, length = 50)
    private String treeId;

    //描述
    @Column(name = "DESCR", nullable = true, length = 65535)
    @Lob
    private String descr;

    //链接
    @Column(name = "URL", nullable = true, length = 65535, columnDefinition = "TEXT")
    private String url;

    //图标
    @Column(name = "ICON", nullable = true, length = 255)
    private String icon;

    //类型
    @Column(name = "TYPE", nullable = true, length = 10)
    private Integer type;

    //是否有效
    @Column(name = "IS_VALID", nullable = true, length = 2)
    private Boolean isValid;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", nullable = true, updatable = false)
    private Menu parent;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parent")
    private List<Menu> menus;

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

    public Boolean getIsLeaf() {
        return isLeaf;
    }

    public void setIsLeaf(Boolean isLeaf) {
        this.isLeaf = isLeaf;
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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Boolean getIsValid() {
        return isValid;
    }

    public void setIsValid(Boolean isValid) {
        this.isValid = isValid;
    }

    public Menu getParent() {
        return parent;
    }

    public void setParent(Menu parent) {
        this.parent = parent;
    }

    public List<Menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }
}
