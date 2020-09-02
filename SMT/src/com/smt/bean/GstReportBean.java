package com.smt.bean;

import java.util.Date;

public class GstReportBean {
	private String itemName;
	private String catName;
	private Long quantity;
	private Double buyPrice;
	private Double salePrice;
	private Double total;
	private String billNo;
	private String contactPerson;
	private Double vat;
	private Date date;
	private Double expence;
	private Double grossTotal;
	private String GstTinNo;
	private String supplierName;
	private String ondate;
	private Long oringnalQuantity;
	private Double igst;
	private Double taxAmount;
	private String customer;
	private Double fivePercentageGST;
	private Double twelwePercentageGST;
	private Double eighteenPercentageGST;
	private Double twentyEightPercentageGST;
	private Double iGSTFivePercentage;
	private Double iGSTTwelwePercentage;
	private Double iGSTEighteenPercentage;
	private Double iGSTTwentyeightPercentage;
	private Double totalTaxAmount;
	private Long serialnumber;
	private String saleDate;
	private String gstNumber;
	private String hsnNumber;
	private Double netAmount;
	private String fetchDate;
	private String hsnsacno;
	private Double quant;
	private Long srno;
	
	
	
	
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	private Double discount;
	
	public Double getDiscount() {
		return discount;
	}
	public void setDiscount(Double discount) {
		this.discount = discount;
	}
	public Long getSrno() {
		return srno;
	}
	public void setSrno(Long srno) {
		this.srno = srno;
	}
	public Double getQuant() {
		return quant;
	}
	public void setQuant(Double quant) {
		this.quant = quant;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public Double getBuyPrice() {
		return buyPrice;
	}
	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
	}
	public Double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
	public String getBillNo() {
		return billNo;
	}
	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}
	public String getContactPerson() {
		return contactPerson;
	}
	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}
	public Double getVat() {
		return vat;
	}
	public void setVat(Double vat) {
		this.vat = vat;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Double getExpence() {
		return expence;
	}
	public void setExpence(Double expence) {
		this.expence = expence;
	}
	public Double getGrossTotal() {
		return grossTotal;
	}
	public void setGrossTotal(Double grossTotal) {
		this.grossTotal = grossTotal;
	}
	public String getGstTinNo() {
		return GstTinNo;
	}
	public void setGstTinNo(String gstTinNo) {
		GstTinNo = gstTinNo;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getOndate() {
		return ondate;
	}
	public void setOndate(String ondate) {
		this.ondate = ondate;
	}
	public Long getOringnalQuantity() {
		return oringnalQuantity;
	}
	public void setOringnalQuantity(Long oringnalQuantity) {
		this.oringnalQuantity = oringnalQuantity;
	}
	public Double getIgst() {
		return igst;
	}
	public void setIgst(Double igst) {
		this.igst = igst;
	}
	public Double getTaxAmount() {
		return taxAmount;
	}
	public void setTaxAmount(Double taxAmount) {
		this.taxAmount = taxAmount;
	}
	public Double getFivePercentageGST() {
		return fivePercentageGST;
	}
	public void setFivePercentageGST(Double fivePercentageGST) {
		this.fivePercentageGST = fivePercentageGST;
	}
	public Double getTwelwePercentageGST() {
		return twelwePercentageGST;
	}
	public void setTwelwePercentageGST(Double twelwePercentageGST) {
		this.twelwePercentageGST = twelwePercentageGST;
	}
	public Double getEighteenPercentageGST() {
		return eighteenPercentageGST;
	}
	public void setEighteenPercentageGST(Double eighteenPercentageGST) {
		this.eighteenPercentageGST = eighteenPercentageGST;
	}
	public Double getTwentyEightPercentageGST() {
		return twentyEightPercentageGST;
	}
	public void setTwentyEightPercentageGST(Double twentyEightPercentageGST) {
		this.twentyEightPercentageGST = twentyEightPercentageGST;
	}
	public Double getiGSTFivePercentage() {
		return iGSTFivePercentage;
	}
	public void setiGSTFivePercentage(Double iGSTFivePercentage) {
		this.iGSTFivePercentage = iGSTFivePercentage;
	}
	public Double getiGSTTwelwePercentage() {
		return iGSTTwelwePercentage;
	}
	public void setiGSTTwelwePercentage(Double iGSTTwelwePercentage) {
		this.iGSTTwelwePercentage = iGSTTwelwePercentage;
	}
	public Double getiGSTEighteenPercentage() {
		return iGSTEighteenPercentage;
	}
	public void setiGSTEighteenPercentage(Double iGSTEighteenPercentage) {
		this.iGSTEighteenPercentage = iGSTEighteenPercentage;
	}
	public Double getiGSTTwentyeightPercentage() {
		return iGSTTwentyeightPercentage;
	}
	public void setiGSTTwentyeightPercentage(Double iGSTTwentyeightPercentage) {
		this.iGSTTwentyeightPercentage = iGSTTwentyeightPercentage;
	}
	public Double getTotalTaxAmount() {
		return totalTaxAmount;
	}
	public void setTotalTaxAmount(Double totalTaxAmount) {
		this.totalTaxAmount = totalTaxAmount;
	}
	public Long getSerialnumber() {
		return serialnumber;
	}
	public void setSerialnumber(Long serialnumber) {
		this.serialnumber = serialnumber;
	}
	public String getSaleDate() {
		return saleDate;
	}
	public void setSaleDate(String saleDate) {
		this.saleDate = saleDate;
	}
	public String getGstNumber() {
		return gstNumber;
	}
	public void setGstNumber(String gstNumber) {
		this.gstNumber = gstNumber;
	}
	public String getHsnNumber() {
		return hsnNumber;
	}
	public void setHsnNumber(String hsnNumber) {
		this.hsnNumber = hsnNumber;
	}
	public Double getNetAmount() {
		return netAmount;
	}
	public void setNetAmount(Double netAmount) {
		this.netAmount = netAmount;
	}
	public String getFetchDate() {
		return fetchDate;
	}
	public void setFetchDate(String fetchDate) {
		this.fetchDate = fetchDate;
	}
	public String getHsnsacno() {
		return hsnsacno;
	}
	public void setHsnsacno(String hsnsacno) {
		this.hsnsacno = hsnsacno;
	}

}
