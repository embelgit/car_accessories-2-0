
<%@page import="com.smt.helper.BarrelEntryHelper"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.bean.ProductNameBean"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.dao.CategoryDao"%>


<%@page import="com.smt.bean.BarrelEntryBean"%>
<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.helper.BarrelEntryHelper"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>

<%@page import="com.smt.hibernate.GoodsReceiveBarrelHibernate"%>
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<style>
.btn-mm {
    transition: all 0.2s ease;
    background-color: white ;
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
    background-color: white ;
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
	
<%String pattern = "yyyy-MM-dd";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			String todayDate = simpleDateFormat.format(new Date());

			System.out.println(todayDate);%>
	
</script>
	
	<script type="text/javascript">
	
	 function grasstotal1(){
			
			var total = document.getElementById("resolution1").value;           
			var extraDiscount = document.getElementById("extraDiscount").value;
			var disAmount =  (extraDiscount/100)*total;
			var gross = +total - +disAmount;
			document.getElementById("resolution").value = Math.round(gross);
    }
	 function grasstotal1Oil(){
			
			var total = document.getElementById("resolutionOil1").value;           
			var extraDiscount = document.getElementById("extraDiscount1").value;
			var disAmount =  (extraDiscount/100)*total;
			var gross = +total - +disAmount;
			document.getElementById("resolutionOil").value = Math.round(gross);
 }

    function grasstotal(){
    var extraDiscount = document.getElementById("extraDiscount").value;
    var total = document.getElementById("resolution1").value;
    if(extraDiscount != ""){
    	var disAmount =  (extraDiscount/100)*total;
		var gross = +total - +disAmount;
		var total = Math.round(gross);
		var expence = document.getElementById("expence").value;
		var gross = +total + +expence;
		
		document.getElementById("resolution").value = gross;
    	
    }else{       
    	var expence = document.getElementById("expence").value;
    	var gross = +total + +expence;
    	
    	document.getElementById("resolution").value = gross;
    }
	
    }
    
    //oil expenses
    
     function grasstotalOil(){
    var extraDiscount = document.getElementById("extraDiscount1").value;
    var total = document.getElementById("resolutionOil1").value;
    if(extraDiscount != ""){
    	var disAmount =  (extraDiscount/100)*total;
		var gross = +total - +disAmount;
		var total = Math.round(gross);
		var expence = document.getElementById("expence1").value;
		var gross = +total + +expence;
		
		document.getElementById("resolutionOil").value = gross;
    	
    }else{       
    	var expence = document.getElementById("expence1").value;
    	var gross = +total + +expence;
    	
    	document.getElementById("resolutionOil").value = gross;
    }
	
    }
    
    function grasstotalTax(){
    	
    	var extraDiscount = document.getElementById("extraDiscount").value;
        var total = document.getElementById("resolution1").value;
        if(extraDiscount != ""){
        	var disAmount =  (extraDiscount/100)*total;
    		var gross = +total - +disAmount;
    		var total = Math.round(gross);
    		var expence = document.getElementById("expence").value;
    		var expencetx = document.getElementById("txPerexpence").value;
    		var extaxamt = (expencetx/100)*expence;
    		var finalextax = +expence + +extaxamt;
    		var gross = +total + +finalextax;
    		
    		document.getElementById("finalExpenses").value = finalextax;
    		document.getElementById("resolution").value = gross;
        	
        }else{       
        	var expence = document.getElementById("expence").value;
        	var expencetx = document.getElementById("txPerexpence").value;
    		var extaxamt = (expencetx/100)*expence;
    		var finalextax = +expence + +extaxamt;
    		var gross = +total + +finalextax;
    		
    		document.getElementById("finalExpenses").value = finalextax;
    		document.getElementById("resolution").value = gross;
        }
    }

</script>
<script type="text/javascript">
function grasstotalTaxOil(){
    	
    	var extraDiscount = document.getElementById("extraDiscount1").value;
        var total = document.getElementById("resolutionOil1").value;
        if(extraDiscount != ""){
        	var disAmount =  (extraDiscount/100)*total;
    		var gross = +total - +disAmount;
    		var total = Math.round(gross);
    		var expence = document.getElementById("expence1").value;
    		var expencetx = document.getElementById("txPerexpence1").value;
    		var extaxamt = (expencetx/100)*expence;
    		var finalextax = +expence + +extaxamt;
    		var gross = +total + +finalextax;
    		
    		document.getElementById("finalExpenses1").value = finalextax;
    		document.getElementById("resolutionOil").value = gross;
        	
        }else{       
        	var expence = document.getElementById("expence1").value;
        	var expencetx = document.getElementById("txPerexpence1").value;
    		var extaxamt = (expencetx/100)*expence;
    		var finalextax = +expence + +extaxamt;
    		var gross = +total + +finalextax;
    		
    		document.getElementById("finalExpenses1").value = finalextax;
    		document.getElementById("resolutionOil").value = gross;
        }
    }
    
</script>

<script type="text/javascript">
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
</script>
<script type="text/javascript">
	    function dupbill(){
			
	        <%
				CategoryDao catHelper = new CategoryDao();
		   		List catList = catHelper.getAllbillnoreg();
			%>
			var catName = $('#billNo').val();
    //		var UpCatName = catName.toUpperCase();
    		var duplicate;
    		//alert(catList.size());
			<%
				for(int i=0;i<catList.size();i++){
					GoodReceive category = (GoodReceive)catList.get(i);
    		%>
    		
    		    var valuee ="<%=category.getBillNo()%>";
//    		    var UpValue = value.toUpperCase();
				if(catName == valuee)
					{
					alert("Bill No Already Exist..!!!");
					location.reload();
					return false;
		//					duplicate = "found";
							/* document.cat.btn.disabled = true;	
							alert("Category Name Already Exist..!!!");
			 				document.cat.reset();
		 					document.cat.btn.disabled = false;
							return false; */
					}
				
		    <%
				}
    		%>
    		
    		
    		
/*     		if(duplicate == "found"){
    			document.cat.btn.disabled = true;	
				alert("Category Name Already Exist..!!!");
 			//	document.cat.reset();
			//	document.cat.btn.disabled = false;
    			location.reload();
				return false;
    		} */
   
		}
</script>

<script type="text/javascript">
	    function dupbill1(){
			
	        <%
				CategoryDao catHelperr = new CategoryDao();
		   		List catListt = catHelperr.getAllbillnoreg1();
			%>
			var catName = $('#billNo1').val();

 //   		var duplicate;

			<%
				for(int i=0;i<catListt.size();i++){
					GoodsReceiveBarrelHibernate category = (GoodsReceiveBarrelHibernate)catListt.get(i);
    		%>
    		
    		    var valuee ="<%=category.getBillNo()%>";

				if(catName == valuee)
					{
					alert("Bill No Already Exist..!!!");
					location.reload();
					return false;

					}
				
		    <%
				}
    		%>
    		
   
		}
</script>
         <script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
	     <link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
	     <link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
	     <link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
	     <script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
	     <script src="/SMT/staticContent/js/jquery-ui.js"></script>
	     <script src="/SMT/staticContent/js/jqueryUi.js"></script>
	     <script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
        
	     <script src="/SMT/staticContent/y_js/newgoodsreceived.js"></script>
	    <script src="/SMT/staticContent/js/BarrelEntry.js"></script>  
	 
	
	<body class="purchase_form_img" onload="pageLoad();">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Purchase Goods Received</h2>
			</div>
		</div>

		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
					<div id="date">
						<label id="demo"></label>
						<script>
							var date = new Date();
							document.getElementById("demo").innerHTML = date
									.toDateString();
						</script>
					</div>
				</div>
			</div>
		</div>
		
		
			<%-- <div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"></div>
					

					<%
						Long Txid = 1l;
					%>
				 	<%
						GoodReciveDao dao = new GoodReciveDao();
						List listtxid = dao.getSupplierPaymentTxid();

						for (int i = 0; i < listtxid.size(); i++) {

							GoodReceive bean = (GoodReceive) listtxid.get(i);
							Txid = bean.getTxId();
							Txid++;

						}
					%> 

					<div>

						<div align="right">
							<h3 style="color: red;">
								PO Number ::
								<%
								out.println(Txid);
							%>
							</h3>
						</div>

					</div>

				</div>
 --%>		

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<!---------------------------------++++++++++------Cash and Credit Radio---------++++++++++-----------------------------> 
				
	<div class=" " id="my_styles" >
	<div class="textalign center" align="center">
			
   			 <label>
       		    <input type="radio" checked name="customertype" id="customertype" checked="checked"
					   onclick="openCashCustomerBilling()" > 
                <div class="btn1 btn-mm text-center"><span>Regular</span></div> </label>
                
                 <label><input type="radio" name="customertype" id="customertype"
					   onclick="openCreditCustomerBilling()"> 
                <div class="btn1 btn-mm text-center"><span>oil</span></div></label>
            
        		
       </div>		
	 </div>
	              	
<!-- --------------------------------------------------end----------------------------------- -->
<div id="CashCustDetail">
		<form action="goods" method="post" name="good" class="form-horizontal" style="margin-top:1%" >
		
		<div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"></div>
					

					<%
						Long Txid = 1l;
					%>
				 	<%
						GoodReciveDao dao = new GoodReciveDao();
						List listtxid = dao.getSupplierPaymentTxid();

						for (int i = 0; i < listtxid.size(); i++) {

							GoodReceive bean = (GoodReceive) listtxid.get(i);
							Txid = bean.getTxId();
							Txid++;

						}
					%> 

					<div>

						<div align="right">
							<h3 style="color: red;">
								PO Number ::
								<%
								out.println(Txid);
							%>
							</h3>
						</div>

					</div>

				</div>
		

<div class="row" style="display: none;">
				<div class="form-group">
					<div class="col-sm-2 " align="right">
						<label class="control-label">GST No:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
							<input type="text" id="gst"  name="gst" class="form-control" />
						</div>
					</div></div></div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 " align="right">
						<label class="control-label">Bill No:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
							<input type="text" id="billNo" id="jander" name="billNo"
								autofocus="autofocus" class="form-control" placeholder="Bill No"  onchange="dupbill()"/>
						</div>
					</div>

					<div class="col-sm-2" align="right">
						<label class="control-label">Supplier Name:<sup style="color: red;">*</sup> </label>
					</div>
					<div class="col-sm-3">
						<%
							SupplierDetailHelper poHelper = new SupplierDetailHelper();
							List supplierList = poHelper.getAllSuppliers();
						%>

						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> 
							
							<input list="supplierId_drop" id="supplierId" class="form-control" onchange="getgst()" >
						<datalist id="supplierId_drop">
						<%
							for(int i =0 ;i<supplierList.size();i++)
								{
								SupplierDetail supplier = (SupplierDetail)supplierList.get(i);
						%>
							<option data-value="<%=supplier.getSupplierId()%>" value="<%=supplier.getSupplierName()%>"> 
						<%   	
								}	
						%>
						</datalist>
							
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 " align="right">
						<label class="control-label">Contact Person:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
					
					<%
							SupplierDetailHelper poHelper1 = new SupplierDetailHelper();
							List supplierList1 = poHelper1.getAllSuppliers();
						%>
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> 
							
							<!-- <input type="text" id='contactPerson' name="contactPerson"
								 class="form-control" placeholder="Contact Person" /> -->
								 	<input list="contactId_drop" id="contactPerson" class="form-control"  placeholder="Contact Person">
								 
								 
								 <datalist id="contactId_drop">
						<%
							for(int i =0 ;i<supplierList1.size();i++)
								{
								SupplierDetail supplier1 = (SupplierDetail)supplierList1.get(i);
						%>
							<option data-value="<%=supplier1.getSupplierId()%>" value="<%=supplier1.getContactPerson()%>"> 
						<%   	
								}	
						%>
						</datalist>
						</div>
					</div>



					<div class="col-sm-2" align="right">
						<label class="control-label">Purchase Date:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-calendar"></i>
							</span> 
							<!-- <input type="date" id='pDate' name="pDate" class="form-control"
								id="jander" placeholder="Purchase Date" /> -->
								<input type="date" id="pDate" name="pDate" class="form-control input-md"
						required value="<%=todayDate%>">
								
						</div>
					</div>

                   <!--  <div class="col-sm-2" align="center">
						<label class="control-label">Vat:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> <input type="text" id='vat' name="vat"
								 class="form-control" placeholder="Vat" />
						</div>
					</div>
					 -->
				</div>
			</div>

			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 " align="right">
						<label class="control-label">Item List:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-5">
					
					    <%
					    ProductDetailHelper item = new ProductDetailHelper();
						List itemList = item.getAllItemName();
						%>
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
								</span>
								<input list="itemId_drop" id="itemName" class="form-control" onchange="getProductList()" >
						        <datalist id="itemId_drop">
						       <%
							      for(int j =0 ;j<itemList.size();j++)
								{
							    	  ProductNameBean itm = (ProductNameBean)itemList.get(j);
						       %>
							      
			             <option data-value="<%=itm.getCaregoryName()%>" value="<%=itm.getCaregoryName()%> =>Itemname=> <%=itm.getItemName()%>  =>ModelName=> <%=itm.getModelName()%>" myvalue="<%=itm.getItemName()%>" myvalue1="<%=itm.getHsnsacno()%>"> 
							    
							    
							    
						      <%   	
						      
								}	
						       %>
						</datalist>
							
						</div>
					</div>

					
				</div>
			</div>

			<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="table-responsive">
							<table id="jqGrid"></table>
			                <div id="jqGridPager"></div>
						</div>
					</div>
				</div>
				
			<div class="row ">
				<div class="form-group">
				     <div class="col-sm-2 " align="right">
						<label class="control-label">Discount:</label>
					</div>

					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id='extraDiscount' name="extraDiscount"
								class="text-border form-control" placeholder="In %"
								autofocus onkeyup="grasstotal1(); return false;"
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />
						</div>
					</div>
				
				
					<div class="col-sm-1" align="right">
						<label class="control-label">Expenses:</label>
					</div>

					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id='expence' name="expence"
								class="text-border form-control" placeholder="Expenses"
								autofocus onchange="grasstotal(); return false;"
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />
						</div>
					</div>

					<div class="col-sm-1" align="right">
						<label class="control-label">Tax % On Expenses:</label>
					</div>

					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id='txPerexpence' name="txPerexpence"
								class="text-border form-control" placeholder="Tax % On Expenses"
								autofocus onchange="grasstotalTax(); return false;"
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />
						</div>
					</div>

				</div>
			</div>
			
			
			<div class="row row_margin">
				<div class="form-group">
				     <div class="col-sm-2 " align="right">
						<label class="control-label">Final Expenses:</label>
					</div>

					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id='finalExpenses' name="finalExpenses" readonly="readonly"
								class="text-border form-control" 
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />
						</div>
					</div>
				
				
					

					<div class="col-sm-2" align="right">
						<label class="control-label" style="font-size: 30px">Total:</label>
					</div>
					<div class="col-sm-3" >
						<div class="input-group">
							<input type="text" name="resolution" id="resolution" readonly="readonly"
								class="form-group"
								style="font-size: 30px; float: right; width: 200px; height: 50px; background-color: rgba(251, 243, 0, 0.27);" />
								 <input type="hidden" id='resolution1' name="resolution1" class="form-control"  />
						</div>
					</div>

				</div>
			</div>

			<div class="row buttons_margin_top">
			<div align="center">
    			<input type="button" class="btn btn-lg btn-success btn-md button_hw button_margin_right" name="btnSubmit" id="btnSubmit" onclick="validateRegGoodReceive()" value="Save" /> 
				<input type="reset" value="Cancel" onclick="reset()" class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/>
				<!-- <input type="button" onclick="window.location.href='http://localhost:8080/SMT/jsp/supplierAccountDetails.jsp'" 
				value="Fill Supplier Payement" class="btn btn-lg btn-primary btn-md" />  -->
			
			</div>
		</div>	
				
</form>
	   
	   </div>
	  <!-------------------  barrel oil purchase  ------------------------------------->
	  <div id="CreditCustDetail">
	  <form action="goods1" method="post" name="good1" class="form-horizontal" style="margin-top:1%" >
	  
	  
	  <div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"></div>
					

					<%
						Long Txid1 = 1l;
					%>
				 	<%
						GoodReciveDao dao1 = new GoodReciveDao();
						List listtxid1 = dao1.getSupplierPaymentTxidOil();

						for (int j = 0; j < listtxid1.size(); j++) {

							GoodsReceiveBarrelHibernate bean = (GoodsReceiveBarrelHibernate) listtxid1.get(j);
							Txid1 = bean.getTxId();
							Txid1++;

						}
					%> 



					<div>

						<div align="right">
							<h3 style="color: red;">
								PO Number oil ::
								<%
								out.println(Txid1);
							%>
							</h3>
						</div>

					</div>

				</div>

<div class="row" style="display: none;">
				<div class="form-group">
					<div class="col-sm-2" align="right">
						<label class="control-label">GST No:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="gst1"  name="gst1" class="form-control" />
						</div>
					</div></div></div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2" align="right">
						<label class="control-label">Bill No:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="billNo1" id="jander" name="billNo"
								autofocus="autofocus" class="form-control" placeholder="Bill No" onchange="dupbill1();"/>
						</div>
					</div>

					<div class="col-sm-2" align="right">
						<label class="control-label">Supplier Name:<sup style="color: red;">*</sup> </label>
					</div>
					<div class="col-sm-3">
						<%
							SupplierDetailHelper poHelp = new SupplierDetailHelper();
							List supplierL = poHelp.getAllSuppliers();
						%>

						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> 
							
							<input list="supplierId_drop" id="supplierId1" class="form-control"  onchange="getgst1()">
						<datalist id="supplierId_drop">
						<%
							for(int i =0 ;i<supplierL.size();i++)
								{
								SupplierDetail supplier = (SupplierDetail)supplierL.get(i);
						%>
							<option data-value="<%=supplier.getSupplierId()%>" value="<%=supplier.getSupplierName()%>"> 
						<%   	
								}	
						%>
						</datalist>
							
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 " align="right">
						<label class="control-label">Contact Person:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
					
					<%
							SupplierDetailHelper poHelper2 = new SupplierDetailHelper();
							List supplierList2 = poHelper2.getAllSuppliers();
						%>
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> 
							
							<!-- <input type="text" id='contactPerson' name="contactPerson"
								 class="form-control" placeholder="Contact Person" /> -->
								 	<input list="contactId_drop" id="contactPerson1" class="form-control"  placeholder="Contact Person">
								 
								 
								 <datalist id="contactId_drop">
						<%
							for(int i =0 ;i<supplierList2.size();i++)
								{
								SupplierDetail supplier1 = (SupplierDetail)supplierList2.get(i);
						%>
							<option data-value="<%=supplier1.getSupplierId()%>" value="<%=supplier1.getContactPerson()%>"> 
						<%   	
								}	
						%>
						</datalist>
						</div>
					</div>



					<div class="col-sm-2" align="right">
						<label class="control-label">Purchase Date:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-calendar"></i>
							</span> <input type="date" id='pDate1' name="pDate" class="form-control"
								id="jander" placeholder="Purchase Date" required value="<%=todayDate%>" />
						</div>
					</div>

                   <!--  <div class="col-sm-2" align="center">
						<label class="control-label">Vat:</label> 
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> <input type="text" id='vat' name="vat"
								 class="form-control" placeholder="Vat" />
						</div>
					</div>
					 -->
				</div>
			</div>

			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 " align="right">
						<label class="control-label">Item List:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-5">
					
					    <%
					    BarrelEntryHelper item1 = new BarrelEntryHelper();
					    List itemList1 = item1.getAllItemName1();
						%>
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
								</span>
								<input list="itemId_drop1" id="itemName1" class="form-control" onchange="getProductList1()" >
						        <datalist id="itemId_drop1">
						       <%
							      for(int j =0 ;j<itemList1.size();j++)
								{
							    	  BarrelEntryBean itm = (BarrelEntryBean)itemList1.get(j);
						       %>
							      
			            <option data-value="<%=itm.getPkProductId()%>" value="<%=itm.getCategoryName()%> =>Itemname=> <%=itm.getItemName()%>  =>ModelName=> <%=itm.getModelName()%>" myvalue="<%=itm.getItemName()%>" myvalue1="<%=itm.getHsnsacno()%>">  
							    
							    
							    
						      <%   	
						      
								}	
						       %>
						</datalist>
							
						</div>
					</div>

					
				</div>
			</div>

			<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="table-responsive">
							<table id="jqGrid1"></table>
			                <div id="jqGridPager"></div>
						</div>
					</div>
				</div>
				
			<div class="row row_margin">
				<div class="form-group">
				     <div class="col-sm-2" align="right">
						<label class="control-label">Discount:</label>
					</div>

					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id='extraDiscount1' name="extraDiscount"
								class="text-border form-control" placeholder="In %"
								autofocus onkeyup="grasstotal1Oil(); return false;"
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />
						</div>
					</div>
				
				
					 <div class="col-sm-1" align="right">
						<label class="control-label">Expenses:</label>
					</div> 

					 <div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id='expence1' name="expence"
								class="text-border form-control" placeholder="Expenses"
								autofocus onchange="grasstotalOil(); return false;"
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />
						</div>
					</div> 

					<div class="col-sm-1" align="right">
						<label class="control-label">Tax % On Expenses:</label>
					</div>

					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id='txPerexpence1' name="txPerexpence"
								class="text-border form-control" placeholder="Tax % On Expenses"
								autofocus onchange="grasstotalTaxOil(); return false;"
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />
						</div>
					</div>

				</div>
			</div>
			
			
			<div class="row row_margin">
				<div class="form-group">
				     <div class="col-sm-2 " align="right">
						<label class="control-label">Final Expenses:</label>
					</div>

					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id='finalExpenses1' name="finalExpenses" readonly="readonly"
								class="text-border form-control" 
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />
						</div>
					</div>
				
				
					

					<div class="col-sm-2" align="right">
						<label class="control-label" style="font-size: 30px">Total:</label>
					</div>
					<div class="col-sm-6" >
						<div class="input-group">
							<input type="text" name="resolutionOil" id="resolutionOil" readonly="readonly"
								class="form-group"
								style="font-size: 30px; float: right; width: 200px; height: 50px; background-color: rgba(251, 243, 0, 0.27);" />
								 <input type="hidden" id='resolutionOil1' name="resolutionOil1" class="form-control"  />
						</div>
					</div>

				</div>
			</div>

			 <div class="row buttons_margin_top">
			<div align="center">
    			<input type="button" class="btn btn-lg btn-success btn-md button_hw button_margin_right" name="btnSubmit1" id="btnSubmit1" onclick="validateRegGoodReceiveOil()" value="Save" /> 
				<input type="reset" value="Cancel" onclick="reset()" class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/>
				<!-- <input type="button" onclick="window.location.href='http://localhost:8080/SMT/jsp/supplierAccountDetails.jsp'" 
				value="Fill Supplier Payement" class="btn btn-lg btn-primary btn-md" /> --> 
			
			</div>
		</div>	 
				
</form>
</div>
	  
	  <!-- -----------------end of oil barrel------------------ -->
	   
	   
	   
	   
	   
	   
	   
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div> 
    
    </div>
   </body>
  </html>
  
	