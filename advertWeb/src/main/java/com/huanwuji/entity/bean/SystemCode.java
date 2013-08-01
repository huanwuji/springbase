package com.huanwuji.entity.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.huanwuji.core.jpa.TreeableEntityListener;
import com.huanwuji.entity.BasicMethod;
import com.huanwuji.entity.Treeable;
import com.huanwuji.search.Search;

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
@Table(name = "SYSTEM_CODE")
@Search(all = true)
public class SystemCode extends BasicMethod implements Treeable<SystemCode, Long> {

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
    @Column(name = "TYPE", nullable = true, length = 20)
    private String type;
    @Column(name = "VALID", nullable = true, length = 2)
    private Boolean valid;

    @JsonIgnore
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", nullable = true, updatable = false)
    private SystemCode parent;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "parent")
    private List<SystemCode> subCode;

    public SystemCode() {
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

    public SystemCode getParent() {
        return parent;
    }

    public void setParent(SystemCode parent) {
        this.parent = parent;
    }
}
