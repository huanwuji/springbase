package com.huanwuji.repository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.data.jpa.repository.support.LockMetadataProvider;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import javax.persistence.*;
import javax.persistence.criteria.*;
import java.io.Serializable;
import java.util.*;

import static org.springframework.data.jpa.repository.query.QueryUtils.*;

/**
 * 基础service类
 */
@org.springframework.stereotype.Repository
@Transactional(readOnly = true)
public class BaseRepository<ID extends Serializable> {

    //    private final JpaEntityInformation<T, ?> entityInformation;
    @PersistenceContext
    private EntityManager em;

    private LockMetadataProvider lockMetadataProvider;

    private static final String countQueryPlaceholder = "x";

    private final Map<Class, JpaEntityInformation> entityInfoMap = new WeakHashMap<Class, JpaEntityInformation>();

    private <T> JpaEntityInformation<T, ?> getJpaEntityInformation(Class<T> domainClass) {
        JpaEntityInformation entityInformation = entityInfoMap.get(domainClass);
        if (entityInformation == null) {
            synchronized (entityInfoMap) {
                if (entityInformation == null) {
                    entityInformation = JpaEntityInformationSupport.getMetadata(domainClass, em);
                    entityInfoMap.put(domainClass, entityInformation);
                }
            }
        }
        return entityInformation;
    }

    public String getEntityName(Class clazz) {
        return getJpaEntityInformation(clazz).getEntityName();
    }


    private <T> Class<T> getDomainClass(Class<T> clazz) {
        return getJpaEntityInformation(clazz).getJavaType();
    }

    /**
     * Configures a custom {@link LockMetadataProvider} to be used to detect {@link javax.persistence.LockModeType}s to be applied to
     * queries.
     *
     * @param lockMetadataProvider
     */
    public void setLockMetadataProvider(LockMetadataProvider lockMetadataProvider) {
        this.lockMetadataProvider = lockMetadataProvider;
    }


    private String getDeleteAllQueryString(Class clazz) {
        return getQueryString(DELETE_ALL_QUERY_STRING, getEntityName(clazz));
    }

    private String getCountQueryString(Class clazz) {

        String countQuery = String.format(COUNT_QUERY_STRING, countQueryPlaceholder, "%s");
        return getQueryString(countQuery, getEntityName(clazz));
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.repository.CrudRepository#delete(java.io.Serializable)
      */
    @Transactional
    public void delete(Class clazz, ID id) {

        Assert.notNull(id, "The given id must not be null!");

        if (!exists(clazz, id)) {
            throw new EmptyResultDataAccessException(String.format("No %s entity with id %s exists!",
                    getJpaEntityInformation(clazz).getJavaType(), id), 1);
        }

        delete(findOne(clazz, id));
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Object)
      */
    @Transactional
    public void delete(Object entity) {

        Assert.notNull(entity, "The entity must not be null!");
        em.remove(em.contains(entity) ? entity : em.merge(entity));
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Iterable)
      */
    @Transactional
    public void delete(Iterable entities) {

        Assert.notNull(entities, "The given Iterable of entities not be null!");

        for (Object entity : entities) {
            delete(entity);
        }
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaRepository#deleteInBatch(java.lang.Iterable)
      */
    @Transactional
    public void deleteInBatch(Iterable entities) {

        Assert.notNull(entities, "The given Iterable of entities not be null!");

        if (!entities.iterator().hasNext()) {
            return;
        }

        applyAndBind(getQueryString(DELETE_ALL_QUERY_STRING, getEntityName(entities.iterator().next().getClass())), entities, em)
                .executeUpdate();
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.repository.Repository#deleteAll()
      */
    @Transactional
    public void deleteAll(Class clazz) {

        for (Object element : findAll(clazz)) {
            delete(element);
        }
    }

    /* 
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaRepository#deleteAllInBatch()
      */
    @Transactional
    public void deleteAllInBatch(Class clazz) {
        em.createQuery(getDeleteAllQueryString(clazz)).executeUpdate();
    }

    /*
      * (non-Javadoc)
      * 
      * @see
      * org.springframework.data.repository.Repository#readById(java.io.Serializable
      * )
      */
    public <T> T findOne(Class<T> clazz, ID id) {

        Assert.notNull(id, "The given id must not be null!");
        return em.find(getDomainClass(clazz), id);
    }

    public EntityManager getEntityManager() {
        return em;
    }

    /*
          * (non-Javadoc)
          * @see org.springframework.data.repository.CrudRepository#exists(java.io.Serializable)
          */
    public boolean exists(Class clazz, ID id) {

        Assert.notNull(id, "The given id must not be null!");
        JpaEntityInformation entityInformation = getJpaEntityInformation(clazz);
        if (entityInformation.getIdAttribute() != null) {

            String placeholder = countQueryPlaceholder;
            String entityName = entityInformation.getEntityName();
            String idAttributeName = entityInformation.getIdAttribute().getName();
            String existsQuery = String.format(EXISTS_QUERY_STRING, placeholder, entityName, idAttributeName);

            TypedQuery<Long> query = em.createQuery(existsQuery, Long.class);
            query.setParameter("id", id);

            return query.getSingleResult() == 1;
        } else {
            return findOne(clazz, id) != null;
        }
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaRepository#findAll()
      */
    public <T> List<T> findAll(Class<T> clazz) {
        return getQuery(clazz, null, (Sort) null).getResultList();
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.repository.CrudRepository#findAll(ID[])
      */
    public <T> List<T> findAll(final Class<T> clazz, Iterable<ID> ids) {

        return getQuery(clazz, new Specification<T>() {
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                JpaEntityInformation entityInformation = getJpaEntityInformation(clazz);
                Path<?> path = root.get(entityInformation.getIdAttribute());
                return path.in(cb.parameter(Iterable.class, "ids"));
            }
        }, (Sort) null).setParameter("ids", ids).getResultList();
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaRepository#findAll(org.springframework.data.domain.Sort)
      */
    public <T> List<T> findAll(Class<T> clazz, Sort sort) {
        return getQuery(clazz, null, sort).getResultList();
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Pageable)
      */
    public <T> Page<T> findAll(Class<T> clazz, Pageable pageable) {

        if (null == pageable) {
            return new PageImpl<T>(findAll(clazz));
        }

        return findAll(null, pageable);
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaSpecificationExecutor#findOne(org.springframework.data.jpa.domain.Specification)
      */
    public <T> T findOne(Class<T> clazz, Specification<T> spec) {

        try {
            return getQuery(clazz, spec, (Sort) null).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaSpecificationExecutor#findAll(org.springframework.data.jpa.domain.Specification)
      */
    public <T> List<T> findAll(Class clazz, Specification<T> spec) {
        return getQuery(clazz, spec, (Sort) null).getResultList();
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaSpecificationExecutor#findAll(org.springframework.data.jpa.domain.Specification, org.springframework.data.domain.Pageable)
      */
    public <T> Page<T> findAll(Class clazz, Specification<T> spec, Pageable pageable) {

        TypedQuery<T> query = getQuery(clazz, spec, pageable);
        return pageable == null ? new PageImpl<T>(query.getResultList()) : readPage(clazz, query, pageable, spec);
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaSpecificationExecutor#findAll(org.springframework.data.jpa.domain.Specification, org.springframework.data.domain.Sort)
      */
    public <T> List<T> findAll(Class clazz, Specification<T> spec, Sort sort) {

        return getQuery(clazz, spec, sort).getResultList();
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.repository.CrudRepository#count()
      */
    public long count(Class clazz) {
        return em.createQuery(getCountQueryString(clazz), Long.class).getSingleResult();
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaSpecificationExecutor#count(org.springframework.data.jpa.domain.Specification)
      */
    public <T> long count(Class clazz, Specification<T> spec) {

        return getCountQuery(clazz, spec).getSingleResult();
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.repository.CrudRepository#save(java.lang.Object)
      */
    @Transactional
    public <T> T save(T entity) {

        JpaEntityInformation entityInformation = getJpaEntityInformation(entity.getClass());
        if (entityInformation.isNew(entity)) {
            em.persist(entity);
            return entity;
        } else {
            return em.merge(entity);
        }
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaRepository#saveAndFlush(java.lang.Object)
      */
    @Transactional
    public <T> T saveAndFlush(T entity) {

        T result = save(entity);
        flush();

        return result;
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaRepository#save(java.lang.Iterable)
      */
    @Transactional
    public <T> List<T> save(Iterable<T> entities) {

        List<T> result = new ArrayList<T>();

        if (entities == null) {
            return result;
        }

        for (T entity : entities) {
            result.add(save(entity));
        }

        return result;
    }

    /*
      * (non-Javadoc)
      * @see org.springframework.data.jpa.repository.JpaRepository#flush()
      */
    @Transactional
    public void flush() {

        em.flush();
    }

    /**
     * Reads the given {@link TypedQuery} into a {@link Page} applying the given {@link Pageable} and
     * {@link Specification}.
     *
     * @param query    must not be {@literal null}.
     * @param spec     can be {@literal null}.
     * @param pageable can be {@literal null}.
     * @return
     */
    private <T> Page<T> readPage(Class clazz, TypedQuery<T> query, Pageable pageable, Specification<T> spec) {

        query.setFirstResult(pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        Long total = QueryUtils.executeCountQuery(getCountQuery(clazz, spec));
        List<T> content = total > pageable.getOffset() ? query.getResultList() : Collections.<T>emptyList();

        return new PageImpl<T>(content, pageable, total);
    }

    /**
     * Creates a new {@link TypedQuery} from the given {@link Specification}.
     *
     * @param spec     can be {@literal null}.
     * @param pageable can be {@literal null}.
     * @return
     */
    private <T> TypedQuery<T> getQuery(Class<T> clazz, Specification<T> spec, Pageable pageable) {

        Sort sort = pageable == null ? null : pageable.getSort();
        return getQuery(clazz, spec, sort);
    }

    /**
     * Creates a {@link TypedQuery} for the given {@link Specification} and {@link Sort}.
     *
     * @param spec can be {@literal null}.
     * @param sort can be {@literal null}.
     * @return
     */
    private <T> TypedQuery<T> getQuery(Class<T> clazz, Specification<T> spec, Sort sort) {

        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<T> query = builder.createQuery(getDomainClass(clazz));

        Root<T> root = applySpecificationToCriteria(clazz, spec, query);
        query.select(root);

        if (sort != null) {
            query.orderBy(toOrders(sort, root, builder));
        }

        return applyLockMode(em.createQuery(query));
    }

    /**
     * Creates a new count query for the given {@link Specification}.
     *
     * @param spec can be {@literal null}.
     * @return
     */
    private <T> TypedQuery<Long> getCountQuery(Class clazz, Specification<T> spec) {

        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);

        Root<T> root = applySpecificationToCriteria(clazz, spec, query);
        query.select(builder.count(root));

        return em.createQuery(query);
    }

    /**
     * Applies the given {@link Specification} to the given {@link CriteriaQuery}.
     *
     * @param spec  can be {@literal null}.
     * @param query must not be {@literal null}.
     * @return
     */
    private <T> Root<T> applySpecificationToCriteria(Class<T> clazz, Specification<T> spec, CriteriaQuery query) {

        Assert.notNull(query);
        Root<T> root = query.from(getDomainClass(clazz));

        if (spec == null) {
            return root;
        }

        CriteriaBuilder builder = em.getCriteriaBuilder();
        Predicate predicate = spec.toPredicate(root, query, builder);

        if (predicate != null) {
            query.where(predicate);
        }

        return root;
    }

    private <T> TypedQuery<T> applyLockMode(TypedQuery<T> query) {

        LockModeType type = lockMetadataProvider == null ? null : lockMetadataProvider.getLockModeType();
        return type == null ? query : query.setLockMode(type);
    }
}

