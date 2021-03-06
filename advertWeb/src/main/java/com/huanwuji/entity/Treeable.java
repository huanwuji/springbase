package com.huanwuji.entity;

/**
 * Created by IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-12-2
 * Time: 下午1:26
 * To change this template use File | Settings | File Templates.
 */
public interface Treeable<T, ID extends java.io.Serializable> extends org.springframework.data.domain.Persistable<ID> {

    public ID getId();

    public T getParent();

    public Boolean getLeaf();

    public void setLeaf(Boolean b);

    public String getTreeId();

    public void setTreeId(String s);
}

