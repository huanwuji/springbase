package com.huanwuji.repository;

import com.huanwuji.entity.bean.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-8-3
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

}
