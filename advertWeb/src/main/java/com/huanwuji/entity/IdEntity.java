package com.huanwuji.entity;

import flexjson.JSON;
import org.springframework.data.domain.Persistable;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * 统一定义id的entity基类.
 * <p/>
 * 基类统一定义id的属性名称、数据类型、列名映射及生成策略.
 * 子类可重载getId()函数重定义id的列名映射和生成策略.
 *
 * @author calvin
 */
//JPA 基类的标识
@MappedSuperclass
public abstract class IdEntity implements Persistable<Long> {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    //@GeneratedValue(generator = "system-uuid")
    @GeneratedValue
    //@GenericGenerator(name = "system-uuid", strategy = "uuid")
//    @GeneratedValue(generator = "longIdGenerator")
//    @GenericGenerator(name = "longIdGenerator", strategy = "com.justonetech.core.orm.hibernate.LongIdGenerator")
    protected Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JSON(include = false)
    public boolean isNew() {
        return null == this.id;
    }
}
