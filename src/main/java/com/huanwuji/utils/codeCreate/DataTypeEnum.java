package com.huanwuji.utils.codeCreate;

import org.apache.commons.lang3.StringUtils;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-9-2
 * Time: 上午10:13
 * To change this template use File | Settings | File Templates.
 * 暂时注册了mysql,oracle的类型
 */
public enum DataTypeEnum {

    BOOL("BOOL", "Boolean"),
    TINYINT("TINYINT", "Short"),
    SMALLINT("SMALLINT", "Integer"),
    INT("INT", "Integer"),
    INTEGER("INTEGER", "Integer"),
    BIGINT("BIGINT", "Long"),
    FLOAT("FLOAT", "Float"),
    DOUBLE("DOUBLE", "Double"),
    DOUBLE_PRECISION("DOUBLE PRECISION", "Double"),
    BINARY_DOUBLE("BINARY_DOUBLE", "Double"),
    DECIMAL("DECIMAL", "Double"),
    REAL("REAL", "Double"),
    NUMERIC("NUMERIC", null),
    NUMBER("NUMBER", null),
    CHAR("CHAR", "String"),
    NCHAR("NCHAR", "String"),
    VARCHAR("VARCHAR", "String"),
    NATIONAL_CHAR("NATIONAL CHAR", "String"),
    VARCHAR2("VARCHAR2", "String"),
    NVARCHAR2("NVARCHAR2", "String"),
    NATIONAL_VARCHAR("NATIONAL VARCHAR", "String"),
    TEXT("TEXT", "String"),
    LONGTEXT("LONGTEXT", "String"),
    CLOB("CLOB", "String"),
    RAW("RAW", null),
    BLOB("BLOB", "byte[]"),
    LONGBLOB("LONGBLOB", "byte[]"),
    DATE("DATE", "java.sql.Date"),
    TIME("TIME", "java.sql.Time"),
    TIMESTAMP("TIMESTAMP", "java.sql.TimeStamp"),
    DATETIME("DATETIME", "java.sql.Timestamp"),
    VBIN("VBIN", null),
    VBIN33("VBIN33", null);

    private String code;

    private String clazz;

    private DataTypeEnum(String code, String clazz) {
        this.code = code;
        this.clazz = clazz;
    }

    public String getClazz() {
        return clazz;
    }

    public String getClazz(String dataType) {
        if (dataType.contains("(")) {
            String[] params = StringUtils.substringBetween(dataType, "(", ")").split(",");
            switch (this) {
                case NUMBER:
                case NUMERIC:
                    if (params.length > 1 && StringUtils.isNotEmpty(params[1])) {
                        return "Double";
                    }
                    if (StringUtils.isNotEmpty(params[0])) {
                        if (String.valueOf(Integer.MAX_VALUE).length() - 1 > Integer.parseInt(params[0])) {
                            return "Integer";
                        } else {
                            return "Long";
                        }
                    }
            }
        }
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public Integer getLength() {
        return getLength("");
    }

    public Integer getLength(String dataType) {
        String paramsStr = StringUtils.substringBetween(dataType, "(", ")");
        if (StringUtils.isNotEmpty(paramsStr)) {
            String[] params = paramsStr.split(",");
            if (StringUtils.isNotEmpty(params[0])) {
                return Integer.valueOf(params[0]);
            }
        }
        switch (this) {
            case BOOL:
                return 1;
            case TINYINT:
                return String.valueOf(Short.MAX_VALUE).length() - 1;
            case SMALLINT:
            case INT:
            case INTEGER:
                return String.valueOf(Integer.MAX_VALUE).length() - 1;
            case BIGINT:
                return String.valueOf(Long.MAX_VALUE).length() - 1;
            case FLOAT:
            case DOUBLE:
            case BINARY_DOUBLE:
            case DECIMAL:
            case REAL:
                return 19;
            case NUMERIC:
            case NUMBER:
                return 19;
            case CHAR:
            case NCHAR:
            case VARCHAR:
            case NATIONAL_CHAR:
            case VARCHAR2:
            case NVARCHAR2:
            case NATIONAL_VARCHAR:
            case TEXT:
                return 5000;
            case LONGTEXT:
            case CLOB:
                return null;
            case RAW:
                break;
            case BLOB:
                break;
            case LONGBLOB:
                break;
            case DATE:
                break;
            case TIME:
                break;
            case TIMESTAMP:
                break;
            case DATETIME:
                break;
            case VBIN:
                break;
        }
        return null;
    }

    public static DataTypeEnum getDataTypeEnumByDataType(String dataType) {
        if (dataType == null) {
            return null;
        }
        if (dataType.contains("(")) {
            dataType = StringUtils.substringBefore(dataType, "(").trim();
        }
        return getDataTypeEnumByCode(dataType.toUpperCase());
    }


    private static DataTypeEnum getDataTypeEnumByCode(String code) {
        DataTypeEnum[] dataTypeEnums = values();
        for (DataTypeEnum dataTypeEnum : dataTypeEnums) {
            if (dataTypeEnum.getCode().equals(code)) {
                return dataTypeEnum;
            }
        }
        return null;
    }
}

