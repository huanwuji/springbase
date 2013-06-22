package com.huanwuji.service;

import com.huanwuji.entity.bean.Example;
import com.huanwuji.repository.ExampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-8-3
 * Time: 下午3:24
 * To change this template use File | Settings | File Templates.
 */
@Repository
@Transactional(readOnly = true)
public class ExampleService {

    @Autowired
    private ExampleRepository exampleRepository;

    @PersistenceContext
    private EntityManager em;

    public List<Example> getExamples() {
        return em.createQuery("select t from Example t").getResultList();
    }

    public List<Example> getAllExamples() {
        return exampleRepository.findAll();
    }
}
