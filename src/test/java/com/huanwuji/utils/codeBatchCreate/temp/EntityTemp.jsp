package com.huanwuji.entity.bean;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-7-31
 * Time: 下午5:09
 * To change this template use File | Settings | File Templates.
 */
//${table.name}
@Entity
@Table(name = "${table.code}")
public class ${table.uClassName} extends BasicMethod {

<% for(ordinaryCol in ordinaryCols!) {%>
    public static final String ${ordinaryCol.code} = "${ordinaryCol.lPropName}";
<%}%>

<% for(ordinaryCol in ordinaryCols!) {%>
    //${ordinaryCol.name}
    @Column(name = "${ordinaryCol.code}", nullable = true <%
    if(ordinaryCol.precision!=null){%>,precision = ${ordinaryCol.precision}<%}%><%
    if(ordinaryCol.length!=null){%>,length = ${ordinaryCol.length}<%}%>)
    private ${ordinaryCol.clazz} ${ordinaryCol.lPropName};

<%}%>

<% for(reference in references!) {%>
    <%if(reference.childTable.code==table.code){%>
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "${reference.joinColumns[1].code}", nullable = false, updatable = false)
    private ${reference.parentTable.uClassName} ${reference.parentTable.lClassName};

    <%} else {%>
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "${table.lClassName}")
    private Set<${reference.childTable.uClassName}> ${reference.childTable.lClassName}s;

    <%}%>
<%}%>

    public ${table.uClassName}() {
    }

<% for(ordinaryCol in ordinaryCols!) {%>
    public ${ordinaryCol.clazz} get${ordinaryCol.uPropName}() {
        return ${ordinaryCol.lPropName};
    }

    public void set${ordinaryCol.uPropName}(${ordinaryCol.clazz} ${ordinaryCol.lPropName}) {
        this.${ordinaryCol.lPropName} = ${ordinaryCol.lPropName};
    }

<%}%>

<% for(reference in references!) {%>
    <%if(reference.childTable.code==table.code){%>
    public ${reference.parentTable.uClassName} get${reference.parentTable.uClassName}() {
        return ${reference.parentTable.lClassName};
    }

    public void set${reference.parentTable.uClassName}(${reference.parentTable.uClassName} ${reference.parentTable.lClassName}) {
        this.${reference.parentTable.lClassName} = ${reference.parentTable.lClassName};
    }

    <%} else {%>
    public Set<${reference.childTable.uClassName}> get${reference.childTable.uClassName}s () {
        return ${reference.childTable.lClassName}s;
    }

    public void set${reference.childTable.uClassName}s (Set<${reference.childTable.uClassName}> ${reference.childTable.lClassName}s) {
        this.${reference.childTable.lClassName}s = ${reference.childTable.lClassName}s;
    }
    <%}%>
<%}%>
}
