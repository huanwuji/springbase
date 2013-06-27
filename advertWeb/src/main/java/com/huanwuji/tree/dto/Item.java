package com.huanwuji.tree.dto;

import java.util.List;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-25 下午9:07
 */
public class Item {
    private Long id;
    private Long parentId;
    private String name;
    private List<Item> children;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Item> getChildren() {
        return children;
    }

    public void setChildren(List<Item> children) {
        this.children = children;
    }
}
