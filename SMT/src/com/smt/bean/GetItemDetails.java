package com.smt.bean;


public class GetItemDetails {
	
	
	private Long pk_temp_id;
	
	private String itemName;
	private Double salePrice;
	private Long cat_id;
	private Long item_id;
	private Long quantity;
	private Long barcodeNo;
	private String categoryName;
	private String hsnSacNo;
	private Double vat;
	private Double igst;
	private Double taxAmount;
	private Double discountGrid;
	private Double discountAmt;
	
	private Double total;
	private Double TotalQuan;
	private Double buyPriceExTax;
	private Double stock;
	
	
	
	
	public Double getStock() {
		return stock;
	}
	public void setStock(Double stock) {
		this.stock = stock;
	}
	public Double getBuyPriceExTax() {
		return buyPriceExTax;
	}
	public void setBuyPriceExTax(Double buyPriceExTax) {
		this.buyPriceExTax = buyPriceExTax;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
	public Double getTotalQuan() {
		return TotalQuan;
	}
	public void setTotalQuan(Double totalQuan) {
		TotalQuan = totalQuan;
	}
	public Double getDiscountGrid() {
		return discountGrid;
	}
	public void setDiscountGrid(Double discountGrid) {
		this.discountGrid = discountGrid;
	}
	public Double getDiscountAmt() {
		return discountAmt;
	}
	public void setDiscountAmt(Double discountAmt) {
		this.discountAmt = discountAmt;
	}
	public Long getPk_temp_id() {
		return pk_temp_id;
	}
	public void setPk_temp_id(Long pk_temp_id) {
		this.pk_temp_id = pk_temp_id;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public Double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	public Long getCat_id() {
		return cat_id;
	}
	public void setCat_id(Long cat_id) {
		this.cat_id = cat_id;
	}
	public Long getItem_id() {
		return item_id;
	}
	public void setItem_id(Long item_id) {
		this.item_id = item_id;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public Long getBarcodeNo() {
		return barcodeNo;
	}
	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Double getVat() {
		return vat;
	}
	public void setVat(Double vat) {
		this.vat = vat;
	}
	public String getHsnSacNo() {
		return hsnSacNo;
	}
	public void setHsnSacNo(String hsnSacNo) {
		this.hsnSacNo = hsnSacNo;
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
	
	
	
}
