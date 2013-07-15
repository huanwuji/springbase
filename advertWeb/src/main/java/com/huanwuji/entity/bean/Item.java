package com.huanwuji.entity.bean;

import com.huanwuji.core.jpa.TreeableEntityListener;
import com.huanwuji.entity.BasicMethod;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-7-31
 * Time: 下午5:09
 * To change this template use File | Settings | File Templates.
 */
@Entity
@EntityListeners(value = TreeableEntityListener.class)
@Table(name = "ITEM")
public class Item extends BasicMethod {
    @Column(name = "NAME", nullable = true, length = 50)
    private String name;
    @Column(name = "TITLE", nullable = true, length = 50)
    private String title;
    @Column(name = "PRICE", nullable = true)
    private Float price;
    @Column(name = "ICON", nullable = true, length = 255)
    private String icon;
    @Column(name = "TYPE", nullable = true, length = 20)
    private String type;
    @Column(name = "VALID", nullable = true, length = 2)
    private Boolean valid;
    @Column(name = "DESCR", nullable = true, length = 500, columnDefinition = "TEXT")
    private String descr;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "category", nullable = true, updatable = false)
    private SystemCode category;

    public Item() {
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

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
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

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public SystemCode getCategory() {
        return category;
    }

    public void setCategory(SystemCode category) {
        this.category = category;
    }
}
