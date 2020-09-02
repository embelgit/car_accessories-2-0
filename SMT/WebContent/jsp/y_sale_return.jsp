
<%@page import="com.smt.dao.CustomerOrderDao"%>
<%@page import="com.smt.helper.CustomerOrderHelper"%>
<%@page import="com.smt.hibernate.CustomerBill"%>
<%@page import="com.smt.hibernate.CreditCustomerBill"%>
<%@page import="com.smt.hibernate.OtherBill"%>

<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

     <script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
	 <link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
	 <link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
	 <link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
	 <script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
	 <script src="/SMT/staticContent/js/jquery-ui.js"></script>
	 <script src="/SMT/staticContent/js/jqueryUi.js"></script>
	 <script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>

     <script src="/SMT/staticContent/js/sale_return.js"></script>
	
    
     <body class="master_form_img">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Sale Return</h2>
			</div>
		</div>


		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
					<div id="date">
						<label id="demo"></label>
						<script>
							   var date = new Date();
							   document.getElementById("demo").innerHTML = date.toDateString();
							</script>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>


<ul class="nav nav-tabs">
	    <li class="active"><a data-toggle="tab" href="#home"><h4 style="color:blue">Customer Bill</h4></a></li>
	    <li><a data-toggle="tab" href="#credit"><h4 style="color:blue">Credit Customer bill</h4></a></li>
	    <li><a data-toggle="tab" href="#miss"><h4 style="color:blue">Miscellaneous Bill</h4></a></li>

	   
 	 </ul>

	<div class="tab-content" style="float: left">
   
    <!-------- Single Date ---------->
   
    	<div id="home" class="tab-pane fade in active">
    	<div class="row"></div>
    	
		<form action="supplier" name="supd" method="post" class="form-horizontal">

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-3" align="right">
					   <label class="control-label">Customer Bill No:</label>
					</div>
					
					<%
					        CustomerOrderHelper poHelper = new CustomerOrderHelper();
							List supplierList = poHelper.getAllBillNumbers();
					%>
					
					
					<div class="col-sm-3">
						
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
							<input list="billNo_drop" id="billNo" class="form-control" onchange="getSaleItems()">
							<datalist id="billNo_drop">
								<%
									for (int i = 0; i < supplierList.size(); i++) {
										CustomerBill supplier = (CustomerBill) supplierList.get(i);
								%>
								<option data-value="<%=supplier.getBillNo()%>"
									value="<%=supplier.getBillNo()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>
				</div>
        	</div>
				
<div class="container-fluid" style="margin-left: 90px;">
	<div class="row">
		<div class="col-sm-12">
			<div class="table-responsive">
				<table id="jqGrid" ></table>
			    <div id="jqGridPager"></div>
			</div>
		</div>
	</div>
</div>
	
	<!-- <div class="row row_margin">
					<div class="form-group">
					    <div class="col-sm-2 col-sm-offset-4" align="center">
					    	  <label class="control-label">Expense:</label>
						</div>
						<div class="col-sm-2">
						
						
						 			<div class="input-group">
											<span class="input-group-addon">
												 <i class="glyphicon glyphicon-hand-right"></i>
											</span>
										 <input type="text" id='expence' name="expence"
								class="text-border form-control" placeholder="Expenses"
								onkeyup="itemby.sumFmatter000();"
								style="background-color: rgba(251, 243, 0, 0.27)" id="jander" />	
							  		</div>
						</div>
							
						<div class="col-sm-1" align="center">
					    	  <label class="control-label" style="font-size:30px">Total:</label>
						</div>
						<div class="col-sm-2">
							<div class="input-group">
									<input type="text" class="form-control"  name="resolution" id="resolution" onkeyup=""  placeholder="Gross Total" style="font-size: 30px; float:right;  width: 200px;
                    				 height: 50px; background-color:rgba(251, 243, 0, 0.27);" />
							</div>
						</div>
						
						
					</div>
				</div> -->

	<div class="row buttons_margin_top">
		<div align="center">
			<input type="button" value="Save"  id="btn" onclick="saleReturn()" class="btn btn-lg btn-success btn-md button_hw button_margin_right"/> 
			<!-- <input type="reset" value="Reset"   class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/> -->
		</div>
	</div>
	
	 
	</form>	
				
		</div>
		
		
		<!-- ------------------------------------------- -->




    	<div id="credit" class="tab-pane">
    	<div class="row"></div>
    	
		<form action="credit" name="supd" method="post" class="form-horizontal">

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-3" align="right">
					   <label class="control-label">Credit Bill No:</label>
					</div>
					
					<%
					        CustomerOrderDao poHelperrr = new CustomerOrderDao();
							List supplierListtt = poHelperrr.getAllBillNumberscredit();
					%>
					
					
					<div class="col-sm-3">
						
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
							<input list="billNo_dropp" id="billNoo" class="form-control" onchange="getSaleItemscredit();">
							<datalist id="billNo_dropp">
								<%
									for (int i = 0; i < supplierListtt.size(); i++) {
										CustomerBill supplier = (CustomerBill) supplierListtt.get(i);
								%>
								<option data-value="<%=supplier.getBillNo()%>"
									value="<%=supplier.getBillNo()%>">
									<%
										}
									%>
								<!--        <%-- <%=supplier.getCustomername()%> --%> -->
							</datalist>
						</div>
					</div>
				</div>
        	</div>
				
<div class="container-fluid" style="margin-left: 90px;">
	<div class="row">
		<div class="col-sm-12">
			<div class="table-responsive">
				<table id="jqGrid1" ></table>
			    <div id="jqGridPager1"></div>
			</div>
		</div>
	</div>
</div>
	
	

	<div class="row buttons_margin_top">
		<div align="center">
			<input type="button" value="Save"  id="btn" onclick="saleReturncredit()" class="btn btn-lg btn-success btn-md button_hw button_margin_right"/> 
			<!-- <input type="reset" value="Reset"   class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/> -->
		</div>
	</div>
	
	 
	</form>	
				
		</div>
		
		<!---------------------------------------------  -->
				
				
				    	<div id="miss" class="tab-pane">
    	<div class="row"></div>
    	
		<form action="supplier" name="supd" method="post" class="form-horizontal">

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-3" align="right">
					   <label class="control-label">Miscellaneous Bill No:</label>
					</div>
					
					<%
					        CustomerOrderDao poHelperr = new CustomerOrderDao();
							List supplierListt = poHelperr.getAllBillNumbersmiss();
					%>
					
					
					<div class="col-sm-3">
						
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
							<input list="billNo_droppp" id="billNooo" class="form-control" onchange="getSaleItemsmiss();">
							<datalist id="billNo_droppp">
								<%
									for (int i = 0; i < supplierListt.size(); i++) {
										OtherBill supplier = (OtherBill) supplierListt.get(i);
								%>
								<option data-value="<%=supplier.getBillNo()%>"
									value="<%=supplier.getBillNo()%>">
									<%
										}
									%>
								 <%-- <%=supplier.getOwnerName()%> --%>
							</datalist>
						</div>
					</div>
				</div>
        	</div>
				
<div class="container-fluid" style="margin-left: 90px;">
	<div class="row">
		<div class="col-sm-12">
			<div class="table-responsive">
				<table id="jqGrid2" ></table>
			    <div id="jqGridPager2"></div>
			</div>
		</div>
	</div>
</div>
	
	

	<div class="row buttons_margin_top">
		<div align="center">
			<input type="button" value="Save"  id="btn" onclick="saleReturnmiss()" class="btn btn-lg btn-success btn-md button_hw button_margin_right"/> 
			<!-- <input type="reset" value="Reset"   class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/> -->
		</div>
	</div>
	
	 
	</form>	
				
		</div>
		
		
		</div>
	<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div> 
  </div>
   </body>
  </html>
  
  

	