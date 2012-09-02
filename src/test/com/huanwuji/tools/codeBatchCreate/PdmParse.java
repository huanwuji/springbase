package com.huanwuji.tools.codeBatchCreate;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-9-2
 * Time: 下午1:00
 * To change this template use File | Settings | File Templates.
 */
public class PdmParse {

    public static void setValuesByEle(List<Element> tabChildren, Object bean) {
        for (Element tabchid : tabChildren) {
            try {
                System.out.println();
                PropertyUtils.setProperty(bean, StringUtils.uncapitalize(tabchid.getName()), tabchid.getStringValue());
            } catch (IllegalAccessException e) {
                System.out.println(tabchid.getName() + "类型不匹配!");
//                    e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                System.out.println(tabchid.getName() + "没有该属性!");
//                    e.printStackTrace();
            }
        }

    }

    public static void main(String[] args) throws DocumentException {
        SAXReader saxReader = new SAXReader();
        Document document = saxReader.read
                ("D:\\git\\springbase\\src\\test\\com\\huanwuji\\tools\\codeBatchCreate\\PhysicalDataModel_1.xml");

        Map<String, Table> tableMap = new HashMap<String, Table>();
        Map<String, Column> columnMap = new HashMap<String, Column>();
        Map<String, List<Reference>> referenceMap = new HashMap<String, List<Reference>>();

        Tables tables = new Tables();
        List<Table> tableList = new ArrayList<Table>();
        List<Element> tableEles = document.selectNodes("//c:Tables//o:Table");
        for (Element tableEle : tableEles) {
            Table table = new Table();
            tableList.add(table);

            String tableId = tableEle.attributeValue("Id");
            tableMap.put(tableId, table);
            table.setId(tableId);
            setValuesByEle(tableEle.elements(), table);

            List<Element> columnEles = tableEle.selectNodes("//c:Columns//o:Column");
            List<Column> columnList = new ArrayList<Column>();
            for (Element columnEle : columnEles) {
                Column column = new Column();
                columnList.add(column);
                String columnId = columnEle.attributeValue("Id");
                columnMap.put(columnId, column);
                column.setId(columnId);
                setValuesByEle(columnEle.elements(), column);
                DataTypeEnum dataTypeEnum = DataTypeEnum.getDataTypeEnumByDataType(column.getDataType());
                column.setDataTypeEnum(dataTypeEnum);
                column.setClazz(dataTypeEnum.getClazz(column.getDataType()));
                if (column.getLength() == null) {
                    column.setLength(dataTypeEnum.getLength(column.getDataType()));
                }
            }

            List<String> keyColumnIds = tableEle.selectNodes("//c:Keys//o:Key//c:Key.Columns//o:Column[@Ref]");
            List<Column> keyColumnList = new ArrayList<Column>();
            for (String keyColumnId : keyColumnIds) {
                keyColumnList.add(columnMap.get(keyColumnId));
            }
            table.setKeys(keyColumnList);

            List<Column> primaryKeys = new ArrayList<Column>();
            List<String> primaryKeyColumnIds = tableEle.selectNodes("//c:PrimaryKey//o:Key//Ref");
            for (String primaryKeyColumnId : primaryKeyColumnIds) {
                primaryKeys.add(columnMap.get(primaryKeyColumnId));
            }
            table.setPrimaryKeys(primaryKeys);
        }

        List<Element> referenceEles = document.selectNodes("//c:References//o:Reference");
        for (Element referenceEle : referenceEles) {
            Reference reference = new Reference();
            String referenceId = referenceEle.attributeValue("Id");

            reference.setId(referenceId);
            setValuesByEle(referenceEle.elements(), reference);

            String parentTableId = referenceEle.element("ParentTable").element("Table").attributeValue("Ref");
            reference.setParentTable(tableMap.get(parentTableId));

            String childTableId = referenceEle.element("ChildTable").element("Table").attributeValue("Ref");
            reference.setChildTable(tableMap.get(childTableId));

            Element referenceJoinEle = referenceEle.element("Joins").element("ReferenceJoin");
            String column1Id = referenceJoinEle.element("Object1").element("Column").attributeValue("Ref");
            String column2Id = referenceJoinEle.element("Object2").element("Column").attributeValue("Ref");
            List<Column> refColumnList = new ArrayList<Column>();
            refColumnList.add(columnMap.get(column1Id));
            refColumnList.add(columnMap.get(column2Id));
            reference.setJoinColumns(refColumnList);
            putToReferenceMap(referenceMap, column1Id, reference);
            putToReferenceMap(referenceMap, column2Id, reference);
        }

        tables.setTables(tableList);
        tables.setTableMap(tableMap);
        tables.setColumnMap(columnMap);
        tables.setReferenceMap(referenceMap);

    }

    public static void putToReferenceMap(Map<String, List<Reference>> referenceMap, String columnId, Reference reference) {
        List<Reference> referenceList = referenceMap.get(columnId);
        if (referenceList == null) {
            referenceList = new ArrayList<Reference>();
            referenceMap.put(columnId, referenceList);
        }
        referenceList.add(reference);
    }
}
