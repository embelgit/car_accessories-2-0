<%-- <%@page import="com.rms.hibernate.ItemEntry"%>
<%@page import="com.rms.dao.ItemEntryDao"%> --%>

 <% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>

<%@page import="com.smt.hibernate.ProductRegister"%>
<%@page import="com.smt.helper.CarEntryHelper"%>
<%@page import="com.smt.hibernate.CarEntry"%>
<%@page import="com.smt.helper.CustomerOrderHelper"%>
<%@page import="com.smt.bean.BillBean"%>
<%@page import="com.smt.dao.CustomerOrderDao"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.smt.bean.BarrelEntryBean"%>

<%@page import="com.smt.helper.BarrelEntryHelper"%>
 
 <%@page import="com.smt.hibernate.ServiceDetail"%>
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
	     
         <script src="/SMT/staticContent/y_js/customerOrder.js"></script>

        <script src="/SMT/staticContent/js/BarrelEntry.js"></script>
<style>
.btn-mm {
    transition: all 0.2s ease;
   /*  background-color: white ; */
    border: 1px solid !important;
   /*  box-shadow: 0 3px  !important;*/
    border-radius: 23px; 
    font-size:19px;
     width: 99px;
      height:27px;
   
     
}
input[type="radio"] {
     position: absolute;
  visibility: hidden;
}
input[type="radio"] + div {
    position: relative;
}
input[type="radio"]:checked + div {
  background-color:#BA0707;
}
input[type="radio"]:checked + div>span {
  color: white;
}
input[type="radio"] + div>span {
position: relatives;
top: 2%;}

@media screen and (max-width: 600px){
.btn-mm {
    transition: all 0.2s ease;
   /*  background-color: white ; */
    border: 1px solid !important;
   /*  box-shadow: 0 3px  !important; */
    border-radius: 23px;
    font-size:14px;
     width: 99px;
      height:27px;
   
     
}
input[type="radio"] {
     position: absolute;
  visibility: hidden;
}
input[type="radio"] + div {
    position: relative;
}
input[type="radio"]:checked + div {
  background-color:#f3073ad;
}
input[type="radio"]:checked + div>span {
  color: white;
}
input[type="radio"] + div>span {
position: relative;
top: 2%;
}
}

</style>




<script type="text/javascript">
	
<% 
//String pattern = "yyyy-MM-dd";
String pattern = "dd-MM-yyyy";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			String todayDate = simpleDateFormat.format(new Date());

			System.out.println(todayDate);%>
	
</script>

<script>
function loadd(){
	location.reload();
}
</script>

<<!-- script type="text/javascript">
function pageLoad(){	
	$("#CashCustDetail").show();
	$("#CreditCustDetail").hide(); 	
}
function openCashCustomerBilling() {
	$("#CashCustDetail").show();
	$("#CreditCustDetail").hide();
	location.reload();
	
}
function openCreditCustomerBilling() {
	$("#CreditCustDetail").show();
	$("#CashCustDetail").hide();
	
}
</script> -->
<script type="text/javascript">


function grasstotalOil(){
	
	var total = document.getElementById("totalAmountOil").value;           
	var discount = document.getElementById("discountOil").value;
	var gross = +total - +discount;
	
	document.getElementById("grossTotalOil").value = gross;
}

function grasstotalservice(){
	
	var total = document.getElementById("ServicetotalAmount").value;           
	var discount = document.getElementById("discountservice").value;
	var gross = +total - +discount;
	
	document.getElementById("grossTotal").value = gross;
}

function grasstotalSpare(){
	
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount").value;
	var gross = +total - +discount;
	
	document.getElementById("spareGrossTotal").value = gross;
}
</script>

 <script>
	
	
	     $(document).ready(function(){
		
		<%
		  CarEntryHelper catHelper = new CarEntryHelper();
   		  List catList = catHelper.getAllCarNo();
	    %>
	  
	      
	  
	  <%
		    for(int i=0;i<catList.size();i++){
		    	CarEntry category = (CarEntry)catList.get(i);
	  %>
           var abc = "<%=category.getCarNo()%>";
           var id = "<%=category.getCarNo()%>";
           var name = "<%=category.getCarNo()%>";
           
           
       
    	    var btn = document.createElement("BUTTON");
    	    btn.setAttribute("id", id);
    	    btn.setAttribute("name", name);
    	    btn.setAttribute("value", name);
    	    btn.style.color = "black";
    	    btn.style.background = "red";
    	    btn.style.width = "110px";
    	    btn.style.height = "65px";
    	    btn.style.fontSize= "16px";
    	    btn.style.margin="3px 3px 0 0";
    	    var t = document.createTextNode(abc);
    	    
    	    btn.appendChild(t);
    	    
    	    var foo = document.getElementById("fooBar");
      	  //Append the element in page (in span).  
      	    foo.appendChild(btn);
    	  //  document.body.appendChild(btn);
    	  
    	      btn.onclick = function() { 
    	    	  
    	    	  var xyz = this.id;
    	    	  <%
    			        for(int j=0;j<catList.size();j++){
    			    	CarEntry category1 = (CarEntry)catList.get(j);
    		      %>
    		      var ab = "<%=category1.getCarNo()%>";
    	    	  if(xyz == ab){
    	    	  var onerName = "<%=category1.getOwnerName()%>";
    	    	  var contactNo = "<%=category1.getContactNo()%>"; 
    	    	  var carpkID = "<%=category.getPkCarEntryId()%>";
 					var color = "<%=category.getVehiclecolor()%>";
 					var kmm = "<%=category.getKmReader()%>";
       	    	  var vehname = "<%=category.getVehiclename()%>";
    	    	  document.getElementById("ownerName").value = onerName;
    	    	  document.getElementById("contactNo").value = contactNo;
    	    	  document.getElementById("carNo").value = ab;
    	    	  document.getElementById("carID").value = carpkID;
    	    	  document.getElementById("vehiclecolor").value = color;
    	    	  document.getElementById("KmReader").value = kmm;
    	    	  document.getElementById("vehicleName").value = vehname;
    	    	  
    	    	  document.getElementById(ab).style.backgroundColor = "green";
    	    
    	    	  

    	    	  $("#list5").jqGrid("clearGridData", true).trigger("reloadGrid");  
    	    	  $("#listOil").jqGrid("clearGridData", true).trigger("reloadGrid");  
    	    	  getitemDataByCarNo();
    	    
    	    	  }
    	    	  else{
    	    		  document.getElementById(ab).style.backgroundColor = "red";
    	    		 
    	    	  }
    	    	 <%
    		       }
    	       %>
    	       return false;
            };
            
           
	
	   <%
		  }
	   %>
		return false;
	}); 
	 
	</script> 

<script type="text/javascript">


function grasstotal(){
	
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount").value;
	var gross = +total - +discount;
	
	document.getElementById("grossTotal").value = gross;
}

function grasstotal11(){
	
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount").value;
	var laber = document.getElementById("laberCharges").value;
	if(discount != ""){
		
	var gross1 = +total - +discount;
	var gross = +gross1 + +laber;
	document.getElementById("grossTotal").value = gross;
	
	}else{
		var gross = +total + +laber;
		document.getElementById("grossTotal").value = gross;
	}
}

</script>
<!-- ////////whole gross total////// -->
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
	    CustomerOrderDao data = new CustomerOrderDao();
		List stkList  = data.getLastBillNo();
		
		for(int i=0;i<stkList.size();i++){
			
			BillBean st = (BillBean)stkList.get(i);
			BillNo = st.getBillNo();
			
			BillNo++;
			
		}        
	        
         %>  

</head>

 <!-- <form class="form-horizontal" action="" method="post" name  ="custord"> --> 
 <body>
 	<div class="container-fluid">
		<h2 align="center" class="form-heading style_heading" style="margin-top: 50px;">Customer Bill</h2>
		
		
			  		<%-- <h3 align="right" style="color: red; margin-right: 20px;">Bill No :: <%out.println(BillNo); %></h3> --%> 
			  		<h4 align="right" style="color: red; margin-right: 50px;">A/ <%out.println(todayDate); %>/00<%out.println(BillNo); %></h4>
                 
		
		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<!---------------------------------++++++++++------Cash and Credit Radio---------++++++++++-----------------------------> 
				
	<!-- <div class=" " id="my_styles" >
	<div class="textalign center" align="center">
			
   			 <label>
       		    <input type="radio" checked name="customertype" id="customertype" checked="checked"
					   onclick="openCashCustomerBilling()" > 
                <div class="btn1 btn-mm text-center"><span>Regular</span></div> </label>
                
                 <label><input type="radio" name="customertype" id="customertype"
					   onclick="openCreditCustomerBilling()"> 
                <div class="btn1 btn-mm text-center"><span>oil</span></div></label>
            
        		
       </div>		
	 </div> -->
	              	
<!-- --------------------------------------------------end----------------------------------- -->
		<div id="CashCustDetail">
		<!-- <form action="goods" method="post" name="good" class="form-horizontal" style="margin-top:1%"> -->
		<form class="form-horizontal" action="" method="post" name  ="custord">
			      
			      <div class="row">
				
					 <div class="row form-group">
				
				<label class="col-md-2 control-label" align="right"> Payment Mode<sup>*</sup></label>  
	           		<div class="col-md-3">
							<div class="input-group">
								<span class="input-group-addon">
										<i class="glyphicon glyphicon-usd"></i>
								</span>
	           					<select class="form-control" id="paymentMode">

										<option value="Cash">Cash</option>
										<option value="Credit">Credit</option>

								</select>	
	           				</div>
						</div>
						
						<div id="ccname">
						 <label class="col-md-2 control-label" align="right" for="customerName">Credit Customer Name:<sup>*</sup></label>  
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
						
							<%
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList =cdd.getAllcreditCustomer();
							
							%>
						<input list="cust_drop" id="CustomerId"  class="form-control">
				         <datalist id="cust_drop">
							
							<%
					           for(int i=0;i<cList.size();i++){
					        	   CustomerDetailsBean cust =(CustomerDetailsBean)cList.get(i);
							%>
		
						<option data-value="<%=cust.getCustId()%>" value="<%=cust.getFirstName() %> <%=cust.getMiddleName() %> <%=cust.getLastName() %>" myvalue="<%=cust.getAadhar()%>">
							<%
				      			}
				    		%>
						</datalist> 
				    </div>
                </div>
						</div>
				</div>
				
				<script>
						$(document).ready(function(){
	  		 $("#paymentMode").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="Cash"){
	           	
	           	$("#ccc").hide(); 
				$("#ccname").hide();	           	

	   
	           	}
	          	 else if($(this).attr("value")=="Credit"){
	           	
	          		$("#ccc").show(); 	
	          		$("#ccname").show();

	           }
	          	
	          	
	          
	       });
	   }).change();
		});	
		</script>
		
				</div> 
				<!--  -->
				<div class="row" style="display: none;">
						<div class="col-md-2" align="right">

							<label class="control-label" >Bill No:</label>
						</div>
						
						<div class="col-md-2">
						    <input type="text" id="bill" class="form-control text-border" value="<%out.println(BillNo);%>" readonly="readonly"/>
					     </div>	
				</div>
				     
			      <div class="row">
						<div class="col-md-2" align="right">

							<label class="control-label" >Barcode No:</label>
						</div>
						
						<div class="col-md-2">
						    <input type="text" id="key" class="form-control text-border" onchange="return getitemData(); return false;" autofocus="key" placeholder="Enter Item Barcode" />
					     </div>	
					
					    <div class="col-md-2" align="right">
							<label class="control-label" >Contact No:</label>
						</div>
						<div class="col-md-2">
							<input type="number" class="form-control" id="contactNo" placeholder="Contact Number" required onchange="return getItemDetailByTable1(); return Activechange(); return false;" readonly="readonly" />
						</div>	
					
					
					
						<div class="col-md-2" align="right">
							<label class="control-label" >Owner Name:</label>
						</div>
						
						<div class="col-md-2">
							<input type="text" class="form-control" id="ownerName" name="ownerName" placeholder="Owner Name" readonly="readonly"  />
						</div>	
				   </div>
				
					 <div class="row" style="margin-top: 15px;">
					<div class=" col-sm-2" align="right">
						<label class="control-label">Vehicle color : </label>
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="vehiclecolor" name="vehiclecolor" placeholder="vehicle color" autofocus />
					</div>
					<div class="col-sm-2" align="right">
						<label class="control-label">Kilometer Reading :  </label>
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="KmReader" name="KmReader" placeholder="Kilometer Reading" />
					</div>
					<div class="col-sm-2" align="right">
						<label class="control-label">GST No :  </label>
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="gstNo" name="" placeholder="GST No." />
					</div>
					</div>
					
					
				   <div class="row" style="margin-top: 15px;">
				
					    <div class="col-md-2" align="right">
							<label class="control-label" >Vehicle Number:</label>
						</div>
						
						<div class="col-md-2">
							<input type="text" class="form-control" id="carNo" name="carNo" placeholder="Vehicle No" readonly="readonly"  />
						</div>	
						
						
						
						<div class="col-md-2" align="right">
							<label class="control-label" >Vehicle Name:</label>
						</div>
						
						<div class="col-md-2">
							<input type="text" class="form-control" id="vehicleName" name="vehicleName" readonly="readonly"  />
						</div>
						
				   </div>
				   <div class="row" style="margin-top: 15px;">
				   <label class="col-md-2 control-label" for="customerName">Product Name:<sup>*</sup></label>  
          					  <div class="col-md-2">
								<div class="input-group">
									 <span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span> 
					 	
					 	<%
								ProductDetailDao cdd1 = new ProductDetailDao();
							 List cList1 =cdd1.getProductNames();
							
							%>
						<input list="prod_drop" id="productId"  class="form-control"  onchange="getproductgrid();">
				         <datalist id="prod_drop">
							
							<%
					           for(int i=0;i<cList1.size();i++){
					        	   ProductRegister cust1 =(ProductRegister)cList1.get(i);
							%>
		
						 <option data-value="<%=cust1.getPkProductId()%>" value="<%=cust1.getItemName()%>  =>  <%=cust1.getModelName()%> => <%=cust1.getCategoryName()%>"> 
						
					
							<%
				      			}
				    		%>
						</datalist>    
				    </div>
                </div>
                	<div class="col-md-2" align="right">
								<label class="control-label" >Product Description: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="description"  placeholder="Note"/>
							</div>
				   </div>
				<!--  -->
						
				<div class="row" style="margin-top: 10px; margin-left:3%;">
				
					<div class="col-md-8">
						<div class="row">
							<div class="table-responsive">
								<table id="list4"></table>
								<div id="jqGridPager"></div>
							</div>
						</div>
							</div>
						<!-- Table number -->
					<div class="col-md-4">
						<span id="fooBar"></span>
					</div>
				</div>
						
						<div class="row form-group" style="margin-top:10px;">
						
						  <!--  <div class="col-md-3" id="calculator" style="margin-left: 146px;">
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
									<span class="operator">÷</span>
									<span>0</span>
									<span>.</span>
									<span class="eval">=</span>
									<span class="operator">x</span>
								</div>
							</div>  -->

						<!-- PrefixFree -->
						<script src="/SMT/staticContent/js/PrefixFree 1.0.7.js" type="text/javascript" type="text/javascript"></script>
						
	                    <script src="/SMT/staticContent/js/calculator.js"></script>
	                    
	                   
	                      <div class="row" style="margin-top:10px;">
							<div class="col-md-2" align="right">
								<label class="control-label"  >Total Amount: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="totalAmount"  placeholder="Total Amout"  readonly="readonly"/>
							</div> 
						 
						  
							<div class="col-md-2" align="right">
								<label class="control-label"> Discount: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="discount"  placeholder="Discount In Rs" autofocus onkeyup="grasstotalSpare(); calgrosstot();return false;"/>
							</div> 
							
							<div class="col-md-2" align="right">
								<label class="control-label" > Spare Gross Total: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="spareGrossTotal"  placeholder="GrossTotal" style="font-size: 22px;" />
							</div> 
					
						
						 
						</div>
						
						
						
						<div class="row" style="margin-top:10px;">
							
						
						
						
						<label class="col-md-2 control-label" align="right" for="customerName">Service Name:<sup>*</sup></label>  
          					  <div class="col-md-2" >
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
                
                <div class="col-md-2" align="right">
								<label class="control-label" >Service Description: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="serdescription"  placeholder="Note"/>
							</div> 
							
				</div>
				
						<!-- <div class="row" style="margin-top:10px;">
							<div class="col-md-3" align="right">
								<label class="control-label" style="font-size: 22px;" > Gross Total: </label>
							</div>
							<div class="col-md-3">
							<input type="text" class="form-control" id="grossTotal" style="font-size:25px;height:55px; margin-top:2%" placeholder="Gross Total" readonly="readonly"/>
							</div> 
						</div> -->
						
			           	<div class="row" style="margin-top: 10px; margin-left:3%;">
				
					<div class="col-md-12">
						<!-- <div class="row" style="margin-top: 15px;"> -->
							<div class="table-responsive">
								<table id="list5"></table>
								<div id="jqGridPager5"></div>
							</div>
						</div>
					</div>
					
				
				
			
	                      <div class="row" style="margin-top:10px;">
							<div class="col-md-2" align="right">
								<label class="control-label" >Service Total Amount: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="ServicetotalAmount"  placeholder="Total Amout" style="font-size: 22px;" readonly="readonly"/>
							</div> 
						   
				
						  <div class="col-md-2" align="right">
								<label class="control-label"  > Discount: </label>
							</div>
							<div class="col-md-2">
							 <div class="input-group">
							   <!-- <span class="input-group-addon">
							     Rs
						       </span> -->
								<input type="text" class="form-control" id="discountservice"  placeholder="Discount In Rs" autofocus onkeyup="grasstotalservice();calgrosstot(); return false;" />
							 </div> 
							</div> 
						  
						  
							<div class="col-md-2" align="right">
								<label class="control-label"  > Gross Total: </label>
							</div>
							<div class="col-md-2">
							<input type="text" class="form-control" id="grossTotal" placeholder="Gross Total"  readonly="readonly" />
							</div> 
						</div>
					
		<!-- 	////////////oil billing//////////////////////	 -->	
				
				 <div class="row" style="margin-top:20px;">
				
				<div class="col-md-2" align="right">
				
						<!-- <div class="col-sm-2 col-sm-offset-1" align="center">
							<label class="control-label" >Barcode no:</label>
						</div>
						
						<div class="col-md-3">
						  <div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
						    <input type="text" id="key1" class="form-control text-border" onchange="return getitemData1();" autofocus="key" placeholder="Enter Item Barcode" />
					     </div>	
					     </div> -->
					  
					 
					  <label class=" control-label" for="customerName"> Oil Product Name:<sup>*</sup></label>  
					  </div>
          					  <div class="col-md-2">
								
									 
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
							      
			            
							     <option data-value="<%=itm.getPkProductId()%>" value="<%=itm.getItemName()%>  => <%=itm.getModelName()%> => <%=itm.getCategoryName()%>">
							
						      <%   	
						      
								}	
						       %>
						</datalist>     
				    </div>
               </div>
                               <div class="col-md-2" align="right">
								<label class="control-label" >Oil Description: </label>
							</div>
							<div class="col-md-2">
							
								<input type="text" class="form-control" id="oildescription"  placeholder="Note"/>
							</div> 
					 
					 </div>
					 
				
				<div class="row" style="margin-top: 10px; margin-left:3%;">
				    <div class="form-group">
					<div class="col-md-12">
						<!-- <div class="row"> -->
							<div class="table-responsive">
								<table id="listOil"></table>
								<div id="jqGridPager7"></div>
							</div>
						</div>
					</div>
					</div>
		
				
				
					
						
 
						<!-- PrefixFree -->
						<script src="/SMT/staticContent/js/PrefixFree 1.0.7.js" type="text/javascript" type="text/javascript"></script>
						
	                    <script src="/SMT/staticContent/js/calculator.js"></script>
						 
						  	<div class="row form-group">
							<div class="col-md-2" align="right">
								<label class="control-label"  >Total Amount: </label>
							</div>
							<div class="col-md-2">
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
							<div class="col-md-2">
							 <div class="input-group">
							   <span class="input-group-addon">
							     Rs
						       </span>
								<input type="text" class="form-control" id="discountOil"  placeholder="Discount In Rs" autofocus onkeyup="grasstotalOil();calgrosstot(); return false;" />
							 </div> 
							</div> 
					
						
							
							
							<div class="col-md-2" align="right">
								<label class="control-label"  > Oil Gross Total: </label>
							</div>
							<div class="col-md-2">
							 <div class="input-group">
							    <span class="input-group-addon">
							      Rs
						        </span>
								<input type="text" class="form-control" id="grossTotalOil" placeholder="Gross Total" readonly="readonly" >
							 </div> 
							</div> 
						</div>
							
						
				</div>	
				
					
				
				<div class="row ">
				<div class="form-group">
				<div class="col-md-2" align="right">
						<label class="control-label" style="font-size: 20px">Gross Total:</label>
					</div>
					<div class="col-md-2" >
						<div class="input-group">
							<input type="text" name="wholeTotal" id="wholeTotal" readonly="readonly" 
								class="form-group"
								style="font-size: 30px; float: right; width: 200px; height: 50px; background-color: rgba(251, 243, 0, 0.27);" />
								
						</div>
					</div>
		</div>
			</div>
	
						<div class="row form-group" >
							<div class="col-md-3" align="right">
								<label class="control-label" > Note: </label>
							</div>
							<div class="col-md-3">
							
								<input type="text" class="form-control" id="creditdescription"  placeholder="Note"/>
							</div> 
							
							<div id="ccc">
							<div class="col-md-2" align="right" >
								<label class="control-label"  >Net Paid Amount: </label>
							</div>
							<div class="col-md-3">
								<input type="text" class="form-control" id="paidAmt"  placeholder="Paid Amount" />
							</div> 
							</div>
							
						</div> 
		      
						  <input type="hidden" class="form-control" id="carID" name="carID" />
					
				
				
				<div class="row" >
					<div align="center" class="margin-top-10">
						<button type='button' class="btn btn-success btn-lg bottomButtons btn-md button_hw button_margin_right" id="btnSubmit" autofocus onclick="resBill();resBillService();resotherbill();" >Save</button>
						<button type='button' onclick="loadd()" class="btn btn-danger btn-lg bottomButtons btn-md button_hw button_margin_right">Cancel</button>
					</div>
				</div> 
				
				</form>
				</div>
				</div>
		 <!-- --------------------//------end of regular billing------------------ -->	
		
				<!-- <form class="form-horizontal" action="" method="post"  name ="custord1"> -->
				
				<%-- <div class="container">
			      <div class="row">
			        <div class="form-group">
						<!-- <div class="col-sm-2 col-sm-offset-1" align="center">
							<label class="control-label" >Barcode no:</label>
						</div>
						
						<div class="col-md-3">
						  <div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
						    <input type="text" id="key1" class="form-control text-border" onchange="return getitemData1();" autofocus="key" placeholder="Enter Item Barcode" />
					     </div>	
					     </div> -->
					  
					 
					  <label class="col-md-2 control-label" for="customerName">Product Name<sup>*</sup></label>  
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
					 
				</div>	 --%>
					   
		
				<!-- <div class="row" style="margin-top: 10px; ">
				    <div class="form-group">
					<div class="col-md-12">
						<div class="row">
							<div class="table-responsive">
								<table id="listOil"></table>
								<div id="jqGridPager"></div>
							</div>
						</div>
					</div>
					</div> -->
		
				
					<!-- 	<div class="row form-group" style="margin-top:10px;">
						
 
						PrefixFree
						<script src="/SMT/staticContent/js/PrefixFree 1.0.7.js" type="text/javascript" type="text/javascript"></script>
						
	                    <script src="/SMT/staticContent/js/calculator.js"></script>
						  <div class="col-md-5">
						  	<div class="row form-group" style="margin-top:10px;">
							<div class="col-md-6" align="right">
								<label class="control-label"  >Total Amount: </label>
							</div>
							<div class="col-md-6">
							  <div class="input-group">
							     <span class="input-group-addon">
							       Rs
						         </span>
								<input type="text" class="form-control" id="totalAmountOil"  placeholder="Total Amout"   readonly="readonly"/>
							  </div> 
							</div>
						</div>
							<div class="row form-group" style="margin-top:10px;">
							<div class="col-md-6" align="right">
								<label class="control-label"  > Discount: </label>
							</div>
							<div class="col-md-6">
							 <div class="input-group">
							   <span class="input-group-addon">
							     Rs
						       </span>
								<input type="text" class="form-control" id="discountOil"  placeholder="Discount In Rs" autofocus onkeyup="grasstotalOil(); return false;" />
							 </div> 
							</div> 
						</div>
							
							<div class="row form-group" style="margin-top:10px;">
							<div class="col-md-6" align="right">
								<label class="control-label"  > Gross Total: </label>
							</div>
							<div class="col-md-6">
							 <div class="input-group">
							    <span class="input-group-addon">
							      Rs
						        </span>
								<input type="text" class="form-control" id="grossTotalOil" placeholder="Gross Total" readonly="readonly"/>
							 </div> 
							</div> 
						</div>
							
						</div>
				</div>	
			</div>	
				
				
				<div class="row" style="margin-top:20px;">
				  <div class="form-group">
					<div align="center" class="margin-top-10">
						<button type='button' class="btn btn-success btn-lg bottomButtons btn-md button_hw button_margin_right" id="btnSubmit"  onclick=" return resotherbill();" >Save</button>
						<button type='button' class="btn btn-danger btn-lg bottomButtons btn-md button_hw button_margin_right">Cancel</button>
					</div>
				  </div>	
				</div> 
				
				</form>
			
				
				
				 -->
				<!-- ------------------end of oil barrel------------------------ --> 
				
	

        <div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div> 
		
</body>
</html>

