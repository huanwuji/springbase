package com.huanwuji.utils.codeCreate.pdm;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-9-2
 * Time: 上午9:35
 * To change this template use File | Settings | File Templates.
 */
public class PdmModel {

    private List<Table> tables;

    private Map<String, Table> tableMap;

    private Map<String, Column> columnMap;

    //columnId,reference
    private Map<String, List<Reference>> referenceMap;

    public PdmModel() {

    }

    public List<Table> getTables() {
        return tables;
    }

    public Table getTableByName(String tableName) {
        for (Table table : this.getTables()) {
            if (tableName.equalsIgnoreCase(table.getCode())) {
                return table;
            }
        }
        return null;
    }

    public void setTables(List<Table> tables) {
        this.tables = tables;
    }

    public Map<String, Table> getTableMap() {
        return tableMap;
    }

    public void setTableMap(Map<String, Table> tableMap) {
        this.tableMap = tableMap;
    }

    public Map<String, Column> getColumnMap() {
        return columnMap;
    }

    public void setColumnMap(Map<String, Column> columnMap) {
        this.columnMap = columnMap;
    }

    public Map<String, List<Reference>> getReferenceMap() {
        return referenceMap;
    }

    public void setReferenceMap(Map<String, List<Reference>> referenceMap) {
        this.referenceMap = referenceMap;
    }
}
