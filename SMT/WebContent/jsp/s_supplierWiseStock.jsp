<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<%-- <%@page import="com.smt.dao.PODetailDao"%>
<%@page import="com.smt.dao.ReportDao"%> --%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
		
	     <script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
         <script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
         <script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
         <script src="/SMT/staticContent/shree/buttons.flash.min.js" type="text/javascript"></script>
         <script src="/SMT/staticContent/shree/jszip.min.js" type="text/javascript"></script>
         <script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
         <script src="/SMT/staticContent/shree/vfs_fonts.js" type="text/javascript"></script>
         <script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
         <script src="/SMT/staticContent/shree/buttons.print.min.js" type="text/javascript"></script>
         <link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
         <link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
	
		<script src="/SMT/staticContent/y_js/newReport.js"></script>
	
		
		 <body class="account_form_img">
	    <div class="container-fluid">
	
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">SupplierWise Stock Between Two Date</h2>
			</div>
		</div>
		
		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
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
			<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		
		
		<ul class="nav nav-tabs">
	    <li class="active"><a data-toggle="tab" href="#home"><h4 style="color:blue">Regular</h4></a></li>
	    <li><a data-toggle="tab" href="#home2"><h4 style="color:blue">Oil</h4></a></li>
	   
 	 </ul>
		
	<div class="tab-content" style="float: left">
   
    <!-------- Single Date ---------->
   
    	<div id="home" class="tab-pane fade in active">		
		
		<form action="goodsReturn" method="post" class="form-horizontal">
		<div class="row">
		
				<div class="form-group" align="right">

					<div class="col-sm-2 col-sm-offset-1">
						<label class="control-label">Supplier Name:</label>
					</div>

					<%
						SupplierDetailHelper suppHelper = new SupplierDetailHelper();
						List suppList = suppHelper.getAllSuppliers();
					%>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-user"></i>
							</span> <input list="fkSupplierId_drop" id="key" class="form-control">
							<datalist id="fkSupplierId_drop">
								<%
									for (int i = 0; i < suppList.size(); i++) {
										SupplierDetail supplier = (SupplierDetail) suppList.get(i);
								%>
								<option data-value="<%=supplier.getSupplierId()%>"
									value="<%=supplier.getSupplierName()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>

					<!-- <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 four">
					<input type="text" id="key" class="form-control"
						placeholder="Enter Supplier Name">
				</div> -->
					
					
					<div class="col-sm-2" align="right">
						<label class="control-label" style="font-family: Times New Roman;">Start Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon   glyphicon-calendar"></i>
							</span> <input type="Date" id="fDate" class="form-control">
						</div>
					</div>
				</div>
			</div>
			
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label" style="font-family: Times New Roman;">End Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-calendar"></i>
							</span> <input type="Date" id="eDate" class="form-control">
						</div>
					</div>
					</div>
					<div class="row">
					<div class="col-sm-12" align="center">
						<input type="button" class="btn btn-lg btn-success btn-md button_hw button_margin_right" name="btn" value="Search" onclick="valSupplierWiseStockBetweenTwoDate();" />
					</div>
					
					</div>
			</div>
					
					
	<br>

	
	
	<div class="row">
			  <div class="table-responsive">
	<table class= "table table-bordered table-striped table-condensed cf"  id="example" class="display" style=" border: 2px solid black; border-collapse: collapse;">
		<thead>
			<tr>
				<th>Barcode No</th>
				<th>Category Name</th>
				<th>Item Name</th>
				<th>Quantity</th>
				<th>Buy Price</th>
				<th>Tax Percentage</th>
				<th>Buy PriceExTax</th>
			</tr>
		</thead>
		<tfoot>
		<tr>	
		 <th colspan="3" style="text-align: right">Total:</th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
		</tr>
		
	</table>
	</div>
	
	</div>


</form>
</div>


    	<div id="home2" class="tab-pane">		
		
		<form action="goodsReturnn" method="post" class="form-horizontal">
		<div class="row">
		
				<div class="form-group" align="right">

					<div class="col-sm-2 col-sm-offset-1">
						<label class="control-label">Supplier Name:</label>
					</div>

					<%
						SupplierDetailHelper suppHelperr = new SupplierDetailHelper();
						List suppListt = suppHelperr.getAllSuppliers();
					%>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-user"></i>
							</span> <input list="fkSupplierId_dropp" id="keyy" class="form-control">
							<datalist id="fkSupplierId_dropp">
								<%
									for (int i = 0; i < suppListt.size(); i++) {
										SupplierDetail supplier = (SupplierDetail) suppListt.get(i);
								%>
								<option data-value="<%=supplier.getSupplierId()%>"
									value="<%=supplier.getSupplierName()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>

					<!-- <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 four">
					<input type="text" id="key" class="form-control"
						placeholder="Enter Supplier Name">
				</div> -->
					
					
					<div class="col-sm-2" align="right">
						<label class="control-label" style="font-family: Times New Roman;">Start Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon   glyphicon-calendar"></i>
							</span> <input type="Date" id="fDatee" class="form-control">
						</div>
					</div>
				</div>
			</div>
			
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label" style="font-family: Times New Roman;">End Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-calendar"></i>
							</span> <input type="Date" id="eDatee" class="form-control">
						</div>
					</div>
					</div>
					<div class="row">
					<div class="col-sm-12" align="center">
						<input type="button" class="btn btn-lg btn-success btn-md button_hw button_margin_right" name="btn" value="Search" onclick="valSupplierWiseStockBetweenTwoDate1();" />
					</div>
					
					</div>
			</div>
					
					
	<br>

	
	
	<div class="row">
			  <div class="table-responsive">
	<table class= "table table-bordered table-striped table-condensed cf"  id="example1" class="display" style=" border: 2px solid black; border-collapse: collapse;">
		<thead>
			<tr>

				<th>Item Name</th>
				<th>Category Name</th>
				<th>No of Barrel</th>
				<th>Total Litre</th>
				<th>Buy Price</th>
				<th>Tax Percentage</th>
				<th>Buy PriceExTax</th>
			</tr>
		</thead>
		<tfoot>
		<tr>	
		 <th colspan="3" style="text-align: right">Total:</th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
		</tr>
		
	</table>
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
     
			
					