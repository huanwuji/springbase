package com.huanwuji.entity.bean;

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
@Table(name = "example")
public class Example extends BasicMethod {

    private String text;

//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name = "CUST_ID", nullable = false, updatable = false)
//
//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "customer")

    public Example() {
    }

//    @Column(name = "text", nullable = true, scale = 1, precision = 1, length = 10)
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
