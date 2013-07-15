package com.huanwuji.entity.query;

import com.huanwuji.entity.bean.Attachment;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.*;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-17 下午10:56
 */
public class QAttachment extends EntityPathBase<Attachment> {

    private static final PathInits INITS = PathInits.DIRECT;
    public static final String ROOT = "attachment";

    public static final String ID = "id";
    public static final String FK = "fk";
    public static final String EXT = "ext";
    public static final String TYPE = "type";
    public static final String NAME = "name";
    public static final String FILE_NAME = "fileName";
    public static final String URL = "url";

    public static final QAttachment ATTACHMENT = new QAttachment(ROOT);
    public final NumberPath<Long> id = createNumber(ID, Long.class);
    public final NumberPath<Long> fk = createNumber(FK, Long.class);
    public final StringPath ext = createString(EXT);
    public final StringPath type = createString(TYPE);
    public final StringPath name = createString(NAME);
    public final StringPath fileName = createString(FILE_NAME);
    public final StringPath url = createString(URL);

    public QAttachment(String variable) {
        this(Attachment.class, forVariable(variable), INITS);
    }

    public QAttachment(BeanPath<? extends Attachment> entity) {
        this(entity.getType(), entity.getMetadata(), INITS);
    }

    public QAttachment(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QAttachment(PathMetadata<?> metadata, PathInits inits) {
        this(Attachment.class, metadata, inits);
    }

    public QAttachment(Class<? extends Attachment> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
    }
}

