package com.huanwuji.entity.bean;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-7-31
 * Time: 下午5:09
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class Example extends IdEntity {

    @NotNull
    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
//    @GeneratedValue(generator = "longIdGenerator")
//    @GenericGenerator(name = "longIdGenerator", strategy = "com.justonetech.core.orm.hibernate.LongIdGenerator")

    private String text;

    public Example() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
