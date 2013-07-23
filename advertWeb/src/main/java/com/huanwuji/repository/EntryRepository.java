package com.huanwuji.repository;

import com.huanwuji.entity.bean.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * description:.
 * User: huanwuji
 * create: 13-7-7 下午1:30
 */
public interface EntryRepository extends JpaRepository<Entry, Long>, JpaSpecificationExecutor<Entry> {

    public Entry findEntryByCode(String code);
}
