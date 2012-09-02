package com.huanwuji.repository;

import com.huanwuji.entity.bean.Example;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-8-3
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
public interface ExampleRepository extends JpaRepository<Example, Long> {

}
