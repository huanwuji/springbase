package com.huanwuji.repository;

import com.huanwuji.entity.bean.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-8-3
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    public List<Attachment> findByFk(Long fk);
}
