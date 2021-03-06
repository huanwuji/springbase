package com.huanwuji.utils.codeCreate.pdm;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    Logger log = LoggerFactory.getLogger(this.getClass().getName());

    private String processPropertyName(String name) {
        return StringUtils.substringBefore(name, "(").trim().replaceAll("\\.", "_");
    }

    protected void setValuesByEle(List<Element> elements, Object bean, String... ignoreProperties) {
        for (Element element : elements) {
            try {
                String name = processPropertyName(element.getName());
                if (ArrayUtils.contains(ignoreProperties, element.getName())) {
                    continue;
                }
                BeanUtils.setProperty(bean, StringUtils.uncapitalize(name), element.getStringValue());
            } catch (IllegalAccessException e) {
                System.out.println(element.getName() + ": 类型不匹配!");
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    public PdmModel parsePdm(String filePath) throws DocumentException {
        SAXReader saxReader = new SAXReader();
        Document document = saxReader.read(filePath);
        return parsePdm(document);
    }

    public PdmModel parsePdm(Document document) {
        Map<String, Table> tableMap = new HashMap<String, Table>();
        Map<String, Column> columnMap = new HashMap<String, Column>();
        Map<String, List<Reference>> referenceMap = new HashMap<String, List<Reference>>();

        PdmModel tables = new PdmModel();

        tables.setTables(parseTable(document, tableMap, columnMap));
        tables.setTableMap(tableMap);
        tables.setColumnMap(columnMap);

        parseReference(document, tableMap, columnMap, referenceMap);
        tables.setReferenceMap(referenceMap);
        return tables;
    }

    protected List<Table> parseTable(Document document, Map<String, Table> tableMap, Map<String, Column> columnMap) {
        List<Table> tableList = new ArrayList<Table>();
        List<Element> tableEles = document.selectNodes("//c:Tables//o:Table");
        for (Element tableEle : tableEles) {
            Table table = new Table();

            String tableId = tableEle.attributeValue("Id");
            tableMap.put(tableId, table);
            table.setId(tableId);
            setValuesByEle(tableEle.elements(), table, "ExtendedCollections", "Columns", "Keys", "PrimaryKey");

            parseColumn(tableEle, table, columnMap);

            List<Element> keyColumns = tableEle.selectNodes("c:Keys/o:Key/c:Key.Columns/o:Column");
            List<Column> keyColumnList = new ArrayList<Column>();
            for (Element keyColumn : keyColumns) {
                keyColumnList.add(columnMap.get(keyColumn.attributeValue("Ref")));
            }
            table.setKeys(keyColumnList);

            List<Column> primaryKeys = new ArrayList<Column>();
            List<Element> primaryKeyEles = tableEle.selectNodes("c:PrimaryKey/o:Key");
            for (Element primaryKeyEle : primaryKeyEles) {
                primaryKeys.add(columnMap.get(primaryKeyEle.attributeValue("Ref")));
            }
            table.setPrimaryKeys(primaryKeys);
            tableList.add(table);
        }
        return tableList;
    }

    protected void parseColumn(Element tableEle, Table table, Map<String, Column> columnMap) {
        List<Element> columnEles = tableEle.selectNodes("c:Columns/o:Column");
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
        table.setColumns(columnList);
    }

    protected void parseReference(Document document, Map<String, Table> tableMap, Map<String, Column> columnMap, Map<String, List<Reference>> referenceMap) {
        List<Element> referenceEles = document.selectNodes("//c:References//o:Reference");
        for (Element referenceEle : referenceEles) {
            Reference reference = new Reference();
            String referenceId = referenceEle.attributeValue("Id");

            reference.setId(referenceId);
            setValuesByEle(referenceEle.elements(), reference, "ParentTable", "ChildTable", "ParentKey", "Joins");

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
    }

    private void putToReferenceMap(Map<String, List<Reference>> referenceMap, String columnId, Reference reference) {
        List<Reference> referenceList = referenceMap.get(columnId);
        if (referenceList == null) {
            referenceList = new ArrayList<Reference>();
            referenceMap.put(columnId, referenceList);
        }
        referenceList.add(reference);
    }

}
