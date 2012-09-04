package com.huanwuji.utils.codeCreate.pdm;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-9-2
 * Time: 上午9:46
 * To change this template use File | Settings | File Templates.
 */
public class Reference {

    private String id;
    private String objectID;
    private String name;
    private String code;
    private String creationDate;
    private String creator;
    private String modificationDate;
    private String modifier;
    private String cardinality;
    private String updateConstraint;
    private String deleteConstraint;

    private Table parentTable;

    private Table childTable;

    private List<Column> parentKey;

    private List<Column> joinColumns;

    public Reference() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getObjectID() {
        return objectID;
    }

    public void setObjectID(String objectID) {
        this.objectID = objectID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(String modificationDate) {
        this.modificationDate = modificationDate;
    }

    public String getModifier() {
        return modifier;
    }

    public void setModifier(String modifier) {
        this.modifier = modifier;
    }

    public String getCardinality() {
        return cardinality;
    }

    public void setCardinality(String cardinality) {
        this.cardinality = cardinality;
    }

    public String getUpdateConstraint() {
        return updateConstraint;
    }

    public void setUpdateConstraint(String updateConstraint) {
        this.updateConstraint = updateConstraint;
    }

    public String getDeleteConstraint() {
        return deleteConstraint;
    }

    public void setDeleteConstraint(String deleteConstraint) {
        this.deleteConstraint = deleteConstraint;
    }

    public Table getParentTable() {
        return parentTable;
    }

    public void setParentTable(Table parentTable) {
        this.parentTable = parentTable;
    }

    public Table getChildTable() {
        return childTable;
    }

    public void setChildTable(Table childTable) {
        this.childTable = childTable;
    }

    public List<Column> getParentKey() {
        return parentKey;
    }

    public void setParentKey(List<Column> parentKey) {
        this.parentKey = parentKey;
    }

    public List<Column> getJoinColumns() {
        return joinColumns;
    }

    public void setJoinColumns(List<Column> joinColumns) {
        this.joinColumns = joinColumns;
    }
}
