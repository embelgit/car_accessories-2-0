

<% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.dao.CustomerDetailsDao" %>
<%@page import="com.smt.hibernate.CustomerDetailsBean" %>
<%@page import="com.smt.helper.CarEntryHelper"%>
<%@page import="com.smt.hibernate.CarEntry"%>
<%@page import="com.smt.helper.OtherBillHelper"%>
<%@page import="com.smt.bean.BillBean"%>
<%@page import="com.smt.dao.CreditCustBillDao"%>
<%@page import="java.util.List"%>
 <%@page import="com.smt.hibernate.ProductRegister"%>
 <%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>

 <%@page import="com.smt.hibernate.ServiceDetail"%>
 <%@page import="com.smt.bean.BarrelEntryBean"%>

<%@page import="com.smt.helper.BarrelEntryHelper"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Order Bill</title>
        <script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
        <link rel="stylesheet" href="/SMT/staticContent/css/shree.css">
	     <link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
	     <link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
	     <link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
	     <script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
	     <script src="/SMT/staticContent/js/jquery-ui.js"></script>
	     <script src="/SMT/staticContent/js/jqueryUi.js"></script>
	     <script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>

         <script src="/SMT/staticContent/js/EstimateQuotationBill.js"></script>

<style type="text/css">

</style>
<script type="text/javascript">
	
<% 
//String pattern = "yyyy-MM-dd";
String pattern = "dd-MM-yyyy";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			String todayDate = simpleDateFormat.format(new Date());

			System.out.println(todayDate);%>
	
</script>


<script type="text/javascript">


/* function grasstotal(){
	
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount").value;
	var gross = +total - +discount;
	
	document.getElementById("grossTotal").value = gross;
} */


function grasstotalSpare(){
	
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount").value;
	var gross = +total - +discount;
	
	document.getElementById("spareGrossTotal").value = gross;
}


function grasstotalservice(){
	
	var total = document.getElementById("ServicetotalAmount").value;           
	var discount = document.getElementById("discountservicee").value;
	var gross = +total - +discount;
	
	document.getElementById("grossTotal").value = gross;
}
function grasstotalOil(){
	
	var total = document.getElementById("totalAmountOil").value;           
	var discount = document.getElementById("discountOil").value;
	var gross = +total - +discount;
	
	document.getElementById("grossTotalOil").value = gross;
}
</script>

<script type="text/javascript">
function calgrosstot(){
    	
	
		var spareGrossTotal = document.getElementById("spareGrossTotal").value;
    	var grossTotal = document.getElementById("grossTotal").value;
        var grossTotalOil = document.getElementById("grossTotalOil").value;
        var wholegross = +grossTotal + +grossTotalOil + +spareGrossTotal;
    		document.getElementById("wholeTotal").value = wholegross;
    		
    }
    
</script> 


     <%
        Long BillNo = 1l;
	 %>
	 <%
	    CreditCustBillDao data = new CreditCustBillDao();
		List stkList  = data.getLastBillNoqq();
		
		for(int i=0;i<stkList.size();i++){
			
			BillBean st = (BillBean)stkList.get(i);
			BillNo = st.getBillNo();
			
			BillNo++;
			
		}      
	        
         %> 

</head>
<body>
<form class="form-horizontal" action="" method="post" name  ="custord">
	<div class="container-fluid">
		<h2 align="center" class="form-heading style_heading" style="margin-top: 50px;">Estimate Quotation Bill</h2>
		<%--   <h3 align="right" style="color: red; margin-right: 50px;">Bill No :: <%out.println(BillNo); %></h3> --%>
		<h4 align="right" style="color: red; margin-right: 50px;">A/ <%out.println(todayDate); %>/E00<%out.println(BillNo); %></h4>
					 <div class="row">
		     <div class="col-sm-offset-1 col-md-10">
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>	
			      <div class="row  form-group">
						<div class="col-md-2" align="right">

							<label class="control-label" >Barcode no:</label>
						</div>
						
						<div class="col-md-3">
						    <input type="text" id="key" class="form-control text-border" onchange="return getProdGrid();" autofocus="key" placeholder="Enter Item Barcode" />
					     </div>	
					     
					     <label class="col-md-2 control-label" align="right" for="customerName">Customer Name:<sup>*</sup></label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
						
							<%
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList =cdd.getAllCustomer();
							
							%>
						<input list="cust_drop" id="CustomerId"  class="form-control">
				         <datalist id="cust_drop">
							
							<%
					           for(int i=0;i<cList.size();i++){
					        	   CustomerDetailsBean cust =(CustomerDetailsBean)cList.get(i);
							%>
		
						<option data-value="<%=cust.getCustId()%>" value="<%=cust.getFirstName() %> <%=cust.getLastName() %>" myvalue="<%=cust.getAadhar()%>">
							<%
				      			}
				    		%>
						</datalist> 
				    </div>
                </div>
		   </div>	
					  
					    <div class="row form-group">	
					 <label class="col-md-2 control-label" align="right" for="customerName">Product Name:<sup>*</sup></label>  
          					  <div class="col-md-2">
								<div class="input-group">
									 <span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span> 
					 	
					 	<%
								ProductDetailDao cdd1 = new ProductDetailDao();
							 List cList1 =cdd1.getProductNames();
							
							%>
						<input list="prod_drop" id="productId"  class="form-control"  onchange="getproductgridEstimate();">
				         <datalist id="prod_drop">
							
							<%
					           for(int i=0;i<cList1.size();i++){
					        	   ProductRegister cust1 =(ProductRegister)cList1.get(i);
							%>
		
						 <option data-value="<%=cust1.getPkProductId()%>" value="<%=cust1.getItemName() %>  =>  <%=cust1.getCategoryName()%>"> 
						
						
							<%
				      			}
				    		%>
						</datalist>    
				    </div>
                </div>
					 <div class="col-md-2" align="right">
							<label class="control-label" >Contact No:</label>
						</div>
						<div class="col-md-2">
							<input type="text" class="form-control" id="contactNo" placeholder="Contact Number">
						</div>	
							
						<div class="col-md-2" align="right">
							<label class="control-label" >Vehicle No:</label>
						</div>
						<div class="col-md-2">
							<input type="text" class="form-control" id="carNo" placeholder="Vehicle Number">
						</div>	
						</div>
						
						
				
						<div class="row form-group" >
							<div class="col-md-2" align="right">
								<label class="control-label" > Description: </label>
							</div>
							<div class="col-md-3">
							
								<input type="text" class="form-control" id="description"  placeholder="Note"/>
							</div> 
						
							<!-- <div class="col-md-2" align="right">
								<label class="control-label"> Discount: </label>
							</div>
							<div class="col-md-3">
							
								<input type="text" class="form-control" id="discount"  placeholder="Discount In Rs" autofocus onkeyup="grasstotalSpare(); calgrosstot();return false;"/>
									
							</div>  -->
						
					
						
						</div> 
						<!-- <div class="row form-group" >
							<div class="col-md-2" align="right">
								<label class="control-label"  >Total Amount: </label>
							</div>
							<div class="col-md-3">
							
								<input type="text" class="form-control" id="totalAmount"  placeholder="Total Amout"  readonly="readonly"/>
							</div> 
							<div class="col-md-2" align="right">
								<label class="control-label" > Spare Gross Total: </label>
							</div>
							<div class="col-md-3">
							
								<input type="text" class="form-control" id="spareGrossTotal"  placeholder="GrossTotal" style="font-size: 22px;" />
							</div> 
							</div> -->
						</div>
					 
		
				<div class="row" style="margin-top: 10px;margin-bottom: 20px; margin-left:3%;">
				
					<div class="col-md-12">
						<div class="row">
							<div class="table-responsive">
								<table id="list4"></table>
								<div id="jqGridPager"></div>
							</div>
						</div>
						
				</div>		
					</div>	
					
						   <!--  <div class="col-md-5" id="calculator" style="margin-left: 20px;">
								Screen and clear key
								<div class="top">
									<span class="clear">C</span>
									<div class="screen"></div>
								</div>
								
								<div class="keys">
									operators and other keys
									<span>7</span>
									<span>8</span>
									<span>9</span>
									<span class="operator">+</span>
									<span>4</span>
									<span>5</span>
									<span>6</span>
									<span class="operator">-</span>
									<span>1</span>
									<span>2</span>
									<span>3</span>
									<span class="operator">�</span>
									<span>0</span>
									<span>.</span>
									<span class="eval">=</span>
									<span class="operator">x</span>
								</div>
							</div> -->

						<!-- PrefixFree -->
						<script src="/SMT/staticContent/js/PrefixFree 1.0.7.js" type="text/javascript" type="text/javascript"></script>
						
	                    <script src="/SMT/staticContent/js/calculator.js"></script>
						
						<div class="row form-group" >
							<div class="col-md-2" align="right">
								<label class="control-label"  >Total Amount: </label>
							</div>
							<div class="col-md-3">
							
								<input type="text" class="form-control" id="totalAmount"  placeholder="Total Amout"  />
							</div> 
							<div class="col-md-2" align="right">
								<label class="control-label" > Discount : </label>
							</div>
							<div class="col-md-3">
							
							<input type="text" class="form-control" id="discount"  placeholder="Discount In Rs" autofocus onkeyup="grasstotalSpare(); calgrosstot();return false;"/>
							</div> 
							</div>
						
						 <div class="row form-group" >
							<div class="col-md-2" align="right">
								<label class="control-label"  >Spare Gross Total: </label>
							</div>
							<div class="col-md-3">
							
								<input type="text" class="form-control" id="spareGrossTotal"  placeholder="GrossTotal" style="font-size: 22px;" />
							</div>  
						
						
						 <!-- <div class="col-md-5">
						<div class="row" style="margin-top:15px;">
							<div class="col-md-6" align="right">
								<label class="control-label" style="font-size: 22px;" > Discount: </label>
							</div>
							<div class="col-md-6">
								<input type="text" class="form-control" id="discount" style="font-size:22px;height:35px;" placeholder="Discount In Rs" autofocus onkeyup="grasstotal(); return false;" style="font-size: 22px;"/>
							</div> 
						</div>
						</div>  -->
						
						
						<label class="col-md-2 control-label" for="customerName">Services Name:<sup>*</sup></label>  
          					  <div class="col-md-3" >
								<div class="input-group">
									 <span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span> 
					 	
					 	 <%
								ProductDetailDao cdd2 = new ProductDetailDao();
							 List cList2 =cdd2.getProductNames1();
							
							%>
						<input list="prod_drop1" id="productIdService"  class="form-control"  onchange="getproductgrid1();">
				         <datalist id="prod_drop1">
							
							<%
					           for(int i=0;i<cList2.size();i++){
					        	   ServiceDetail cust2 =(ServiceDetail)cList2.get(i);
							%>
		
						 <option data-value="<%=cust2.getPkProductId()%>" value="<%=cust2.getItemName()%>"> 
						
					
							<%
				      			}
				    		%>
						</datalist>    
				    </div>
                </div>
				</div>
				
						
						
						<div class="row" style="margin-top: 15px;margin-bottom: 20px; margin-left:3%;">
				
					<div class="col-md-8">
						<div class="row">
							<div class="table-responsive">
								<table id="list5"></table>
								<div id="jqGridPager5"></div>
							</div>
						</div>
					
					</div>
				</div>	
				
						
					
	                      <div class="row form-group" >
							<div class="col-md-2" align="right">
								<label class="control-label"  >ServiceTotal Amount: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="ServicetotalAmount" style="font-size:22px;height:35px;" placeholder="Total Amout" style="font-size: 22px;" readonly="readonly"/>
							</div> 
						  
						  
						  
						  <div class="col-md-2" align="right">
								<label class="control-label"  > Discount: </label>
							</div>
							<div class="col-md-2">
							 <div class="input-group">
							  
								<input type="text" class="form-control" id="discountservicee"  placeholder="Discount In Rs" onkeyup="grasstotalservice();calgrosstot(); return false;"/>
							 </div> 
							</div> 
						  
						  
						  
							<div class="col-md-2" align="right">
								<label class="control-label"  > Gross Total: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="grossTotal"  placeholder="Gross Total" readonly="readonly"/>
							</div> 
							
							
							
							
						</div>
						
						
						
						
					 <div class="row" style="margin-top:20px;">
				
				<div class="col-md-2" align="right">
				
					  <label class=" control-label" for="customerName"> Oil Product Name:<sup>*</sup></label>  
					  </div>
          					  <div class="col-md-3">
								
						 <%
					    BarrelEntryHelper item1 = new BarrelEntryHelper();
					    List itemList1 = item1.getAllItemName1();
						%>
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
								</span>
								<input list="itemId_drop1" id="itemName1" class="form-control" onchange="getProductInGridBillingOil()" >
						        <datalist id="itemId_drop1">
						       <%
							      for(int j =0 ;j<itemList1.size();j++)
								{
							    	  BarrelEntryBean itm = (BarrelEntryBean)itemList1.get(j);
						       %>
							      
			            
							     <option data-value="<%=itm.getPkProductId()%>" value="<%=itm.getItemName()%>  =>  <%=itm.getCategoryName()%>">
							
						      <%   	
						      
								}	
						       %>
						</datalist>     
				    </div>
               </div>
					 
					 </div>
					 
				
				<div class="row" style="margin-top: 10px; margin-left:3%; ">
				    <div class="form-group">
					<div class="col-md-12">
					
							<div class="table-responsive">
								<table id="listOil"></table>
								<div id="jqGridPager7"></div>
							</div>
						</div>
					</div>
					</div>
		
						 
						  	<div class="row form-group">
							<div class="col-md-2" align="right">
								<label class="control-label"  >Total Amount: </label>
							</div>
							<div class="col-md-3">
							  <div class="input-group">
							     <span class="input-group-addon">
							       Rs
						         </span>
								<input type="text" class="form-control" id="totalAmountOil"  placeholder="Total Amout"   readonly="readonly"/>
							  </div> 
							</div>
							
							<div class="col-md-2" align="right">
								<label class="control-label"  > Discount: </label>
							</div>
							<div class="col-md-3">
							 <div class="input-group">
							   <span class="input-group-addon">
							     Rs
						       </span>
								<input type="text" class="form-control" id="discountOil"  placeholder="Discount In Rs" autofocus onkeyup="grasstotalOil();calgrosstot(); return false;" />
							 </div> 
							</div> 
					</div>
						
							
				<div class="row ">
				<div class="form-group">
							<div class="col-md-2" align="right">
								<label class="control-label"  > Oil Gross Total: </label>
							</div>
							<div class="col-md-3">
							 <div class="input-group">
							    <span class="input-group-addon">
							      Rs
						        </span>
								<input type="text" class="form-control" id="grossTotalOil" placeholder="Gross Total" readonly="readonly">
							 </div> 
							</div> 
					
				<div class="col-md-2" align="right">
						<label class="control-label" style="font-size: 20px">Gross Total:</label>
					</div>
					<div class="col-md-3" >
						<div class="input-group">
							<input type="text" name="wholeTotal" id="wholeTotal" readonly="readonly" 
								class="form-group"
								style="font-size: 30px; float: right; width: 200px; height: 50px; background-color: rgba(251, 243, 0, 0.27);" />
								
						</div>
					</div>
		</div>
	</div>				
				
					
				
	
		      
					
				
				<div class="row" style="margin-top:20px;">
					<div align="center" class="margin-top-50">
						<button type='button' class="btn btn-success btn-lg bottomButtons btn-md button_hw button_margin_right"  id="btnSubmit" onclick="regEstimateCustbill1();resBillService();resotherbill();" >Save</button>
						<button type='button' class="btn btn-danger btn-lg bottomButtons btn-md button_hw button_margin_right">Cancel</button>
					</div>
				</div> 
		
	
</form>

        <div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div> 
</body>
</html>

