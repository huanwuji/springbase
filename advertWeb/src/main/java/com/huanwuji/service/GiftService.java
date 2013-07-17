package com.huanwuji.service;

import com.huanwuji.entity.bean.Gift;
import com.huanwuji.entity.query.QGift;
import com.huanwuji.repository.GiftRepository;
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
public class GiftService {

    @PersistenceContext
    protected EntityManager em;

    @Autowired
    private GiftRepository giftRepository;

    public Page<Gift> findAll(Long cid, Pageable pageable) {
        return findAll(cid, null, pageable);
    }

    public Page<Gift> findAll(final Long cid, final Boolean vaild, Pageable pageable) {
        return giftRepository.findAll(new Specification<Gift>() {
            @Override
            public Predicate toPredicate(Root<Gift> giftRoot, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>(2);
                predicates.add(criteriaBuilder.equal(giftRoot.get(QGift.CATEGORY), cid));
                if (vaild != null) {
                    predicates.add(criteriaBuilder.equal(giftRoot.get(QGift.VALID), vaild));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        }, pageable);
    }
}
