package com.smt.hibernate;

import java.util.Date;

public class OtherBill {
	
	private Long pkBillId;
	private String itemName;
	private Long quantity;
	private Double salePrice;
	private Double grossamt;
	private Date current_date;
	private Double totalAmt;
	private Long billNo;
	private String categoryName;
	private Long pkItemId;
	private Long barcodeNo;
	private Double discount;
	private Double totalperItem;
	private String ownerName;
	private String carNo;
	private Long contactNo;
	private String hsnSacNo;
	private Double vat;
	private Double igst;
	private Double taxAmount;
	private Double discountGrid;
	private Double discountAmt;

	private Double totalQuan;
    private Double buyPriceEXTax;
    private String description;

 //   private String vehicle;
	
    
	

	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Double getTotalQuan() {
		return totalQuan;
	}


	public void setTotalQuan(Double totalQuan) {
		this.totalQuan = totalQuan;
	}


	public Double getBuyPriceEXTax() {
		return buyPriceEXTax;
	}


	public void setBuyPriceEXTax(Double buyPriceEXTax) {
		this.buyPriceEXTax = buyPriceEXTax;
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


	public OtherBill(Long pkBillId, String itemName, Long quantity, Double salePrice, Double grossamt, Date current_date, Double totalAmt, Long billNo, String categoryName, Long pkItemId, Long barcodeNo, Double discount, Double totalperItem, String ownerName, String carNo, Long contactNo, String hsnSacNo, Double vat, Double igst, Double taxAmount) {
		super();
		this.pkBillId = pkBillId;
		this.itemName = itemName;
		this.quantity = quantity;
		this.salePrice = salePrice;
		this.grossamt = grossamt;
		this.current_date = current_date;
		this.totalAmt = totalAmt;
		this.billNo = billNo;
		this.categoryName = categoryName;
		this.pkItemId = pkItemId;
		this.barcodeNo = barcodeNo;
		this.discount = discount;
		this.totalperItem = totalperItem;
		this.ownerName = ownerName;
		this.carNo = carNo;
		this.contactNo = contactNo;
		this.hsnSacNo = hsnSacNo;
		this.vat = vat;
		this.igst = igst;
		this.taxAmount = taxAmount;
	}


	public OtherBill() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Long getPkBillId() {
		return pkBillId;
	}


	public void setPkBillId(Long pkBillId) {
		this.pkBillId = pkBillId;
	}


	public String getItemName() {
		return itemName;
	}


	public void setItemName(String itemName) {
		this.itemName = itemName;
	}


	public Long getQuantity() {
		return quantity;
	}


	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}


	public Double getSalePrice() {
		return salePrice;
	}


	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}


	public Double getGrossamt() {
		return grossamt;
	}


	public void setGrossamt(Double grossamt) {
		this.grossamt = grossamt;
	}


	public Date getCurrent_date() {
		return current_date;
	}


	public void setCurrent_date(Date current_date) {
		this.current_date = current_date;
	}


	public Double getTotalAmt() {
		return totalAmt;
	}


	public void setTotalAmt(Double totalAmt) {
		this.totalAmt = totalAmt;
	}


	public Long getBillNo() {
		return billNo;
	}


	public void setBillNo(Long billNo) {
		this.billNo = billNo;
	}


	public String getCategoryName() {
		return categoryName;
	}


	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}


	public Long getPkItemId() {
		return pkItemId;
	}


	public void setPkItemId(Long pkItemId) {
		this.pkItemId = pkItemId;
	}


	public Long getBarcodeNo() {
		return barcodeNo;
	}


	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}


	public Double getDiscount() {
		return discount;
	}


	public void setDiscount(Double discount) {
		this.discount = discount;
	}


	public Double getTotalperItem() {
		return totalperItem;
	}


	public void setTotalperItem(Double totalperItem) {
		this.totalperItem = totalperItem;
	}


	public String getOwnerName() {
		return ownerName;
	}


	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}


	public String getCarNo() {
		return carNo;
	}


	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}


	public Long getContactNo() {
		return contactNo;
	}


	public void setContactNo(Long contactNo) {
		this.contactNo = contactNo;
	}


	public String getHsnSacNo() {
		return hsnSacNo;
	}


	public void setHsnSacNo(String hsnSacNo) {
		this.hsnSacNo = hsnSacNo;
	}


	public Double getVat() {
		return vat;
	}


	public void setVat(Double vat) {
		this.vat = vat;
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
