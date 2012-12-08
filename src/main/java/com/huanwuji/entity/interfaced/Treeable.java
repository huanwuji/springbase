package com.huanwuji.entity.interfaced;

/**
 * Created by IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-12-2
 * Time: 下午1:26
 * To change this template use File | Settings | File Templates.
 */
public interface Treeable<T> {

    public Long getId();

    public T getParent();

    public Boolean getIsLeaf();

    public void setIsLeaf(Boolean b);

    public String getTreeId();

    public void setTreeId(String s);
}

