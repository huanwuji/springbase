package com.huanwuji.service;

import com.huanwuji.entity.bean.Attachment;
import com.huanwuji.entity.bean.Entry;
import com.huanwuji.repository.AttachmentRepository;
import com.huanwuji.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
public class AttachmentService {

    @PersistenceContext
    protected EntityManager em;

    @Autowired
    private AttachmentRepository attachmentRepository;
}
