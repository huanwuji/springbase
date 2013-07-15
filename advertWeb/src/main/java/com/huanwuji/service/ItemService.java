package com.huanwuji.service;

import com.huanwuji.entity.bean.Item;
import com.huanwuji.entity.query.QItem;
import com.huanwuji.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
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
public class ItemService {

    @PersistenceContext
    protected EntityManager em;

    @Autowired
    private ItemRepository itemRepository;

    public Page<Item> findAll(Long cid, Pageable pageable) {
        return findAll(cid, null, pageable);
    }

    public Page<Item> findAll(final Long cid, final Boolean vaild, Pageable pageable) {
        return itemRepository.findAll(new Specification<Item>() {
            @Override
            public Predicate toPredicate(Root<Item> itemRoot, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>(2);
                predicates.add(criteriaBuilder.equal(itemRoot.get(QItem.CATEGORY), cid));
                if (vaild != null) {
                    predicates.add(criteriaBuilder.equal(itemRoot.get(QItem.VALID), vaild));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        }, pageable);
    }
}
