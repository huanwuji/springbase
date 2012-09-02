package com.huanwuji.tools.codeBatchCreate;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-9-2
 * Time: 上午9:35       St
 * To change this template use File | Settings | File Templates.
 */
public class Table {

    private String id;
    private String objectID;
    private String name;
    private String code;
    private String creationDate;
    private String creator;
    private String modificationDate;
    private String modifier;
    private String totalSavingCurrency;

    private List<Column> columns;

    private List<Column> keys;

    private List<Column> primaryKeys;

    public Table() {

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

    public String getTotalSavingCurrency() {
        return totalSavingCurrency;
    }

    public void setTotalSavingCurrency(String totalSavingCurrency) {
        this.totalSavingCurrency = totalSavingCurrency;
    }

    public List<Column> getColumns() {
        return columns;
    }

    public void setColumns(List<Column> columns) {
        this.columns = columns;
    }

    public List<Column> getKeys() {
        return keys;
    }

    public void setKeys(List<Column> keys) {
        this.keys = keys;
    }

    public List<Column> getPrimaryKeys() {
        return primaryKeys;
    }

    public void setPrimaryKeys(List<Column> primaryKeys) {
        this.primaryKeys = primaryKeys;
    }
}
