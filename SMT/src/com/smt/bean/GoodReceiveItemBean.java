package com.smt.bean;

public class GoodReceiveItemBean {
	
	private String itemName;
	private String catName;
	private double vat;
	private double igst;
	private String hsnsacno;
	private double sgst;
	private double salePrice;
	private double discount;
	private long quantity;
	private double buyPrice;
	
	private Double buyPriceEx;
	private Double TotalQuan;
	private Double buyPriceExTax;
	private Double buyPriceIncTax;
	private Double gstamt;

	
	
	
	
	public Double getBuyPriceEx() {
		return buyPriceEx;
	}
	public void setBuyPriceEx(Double buyPriceEx) {
		this.buyPriceEx = buyPriceEx;
	}
	public Double getTotalQuan() {
		return TotalQuan;
	}
	public void setTotalQuan(Double totalQuan) {
		TotalQuan = totalQuan;
	}
	public Double getBuyPriceExTax() {
		return buyPriceExTax;
	}
	public void setBuyPriceExTax(Double buyPriceExTax) {
		this.buyPriceExTax = buyPriceExTax;
	}
	public Double getBuyPriceIncTax() {
		return buyPriceIncTax;
	}
	public void setBuyPriceIncTax(Double buyPriceIncTax) {
		this.buyPriceIncTax = buyPriceIncTax;
	}
	public Double getGstamt() {
		return gstamt;
	}
	public void setGstamt(Double gstamt) {
		this.gstamt = gstamt;
	}
	public double getBuyPrice() {
		return buyPrice;
	}
	public void setBuyPrice(double buyPrice) {
		this.buyPrice = buyPrice;
	}
	public long getQuantity() {
		return quantity;
	}
	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
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
	public double getVat() {
		return vat;
	}
	public void setVat(double vat) {
		this.vat = vat;
	}
	public double getIgst() {
		return igst;
	}
	public void setIgst(double igst) {
		this.igst = igst;
	}
	public String getHsnsacno() {
		return hsnsacno;
	}
	public void setHsnsacno(String hsnsacno) {
		this.hsnsacno = hsnsacno;
	}
	public double getSgst() {
		return sgst;
	}
	public void setSgst(double sgst) {
		this.sgst = sgst;
	}
	public double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(double salePrice) {
		this.salePrice = salePrice;
	}
	
	
	

}
