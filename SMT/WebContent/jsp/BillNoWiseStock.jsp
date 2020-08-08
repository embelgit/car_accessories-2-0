<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.helper.GoodReceiveHelper"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>

<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.GoodsReceiveBarrelHibernate"%>
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
        
		<script src="/SMT/staticContent/js/currentStock.js"></script>
	
       
	
	 <body class="stock_form_img">
	<div class="container-fluid">
	
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Bill no Wise Stock</h2>
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
	<div id="home" class="tab-pane fade in active">		
<form  method="post" class="form-horizontal">

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-3" align="right">
						<label class="control-label" style="font-family: Times New Roman;">Select Bill No:</label>
					</div>
					<%
					    GoodReceiveHelper helper = new GoodReceiveHelper();
						List mainCategoryList = helper.getBillNo();
					%>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> <input list="catId_drop" id="catId" class="form-control">
					<datalist id="catId_drop">
						<%
							for(int i=0;i<mainCategoryList.size();i++){
								GoodReceive category = (GoodReceive)mainCategoryList.get(i);
						%>
							<option data-value="<%=category.getBillNo()%>" value="<%=category.getBillNo() %>">
						<%
							}
						%>
					</datalist>
						</div>
					</div>
				</div>
				
				<div class="row buttons_margin_top">
				<div align="center">
				<input type="button" value="Search" id="btn" onclick="billwisestock();" class="btn btn-lg btn-success btn-md button_hw button_margin_right"/>
						
						</div>
			</div>
			
			</div>
		
		
		
		
			
			<br>
	<br> <br>
	<br>

<div class="row">
			  <div class="table-responsive">
	<table class= "table table-bordered table-striped table-condensed cf" id="example" class="display" style=" border: 2px solid black; border-collapse: collapse;">
		<thead>
			<tr>
			
				<th> Bill No</th>
				<th> Category Name</th>
				<th> Item Name</th>
				<th> Available Quantity</th>
				<th> Buy Price</th>
				<th> Buyprice Ex</th>
				<th> Tax Percentage</th>
				<th> Barcode No</th>
				
				
				
				

			</tr>
		</thead>
		<tfoot>
		<tr>	
		<th colspan="3" style="text-align: right">Total:</th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
		
		</tr>
		</tfoot>
	</table>
	</div></div>

</form>
</div>
<!-- 
/////////////////////////////oil bill number stock/////////////////// -->

<div id="home2" class="tab-pane">
<form  method="post" class="form-horizontal">

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-3" align="right">
						<label class="control-label" style="font-family: Times New Roman;">Select Bill No:</label>
					</div>
					<%
					    GoodReceiveHelper helper1 = new GoodReceiveHelper();
						List mainCategoryList1 = helper1.getBillNo1();
					%>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> <input list="catId_drop1" id="catId1" class="form-control">
					<datalist id="catId_drop1">
						<%
							for(int i=0;i<mainCategoryList.size();i++){
								GoodsReceiveBarrelHibernate category = (GoodsReceiveBarrelHibernate)mainCategoryList1.get(i);
						%>
							<option data-value="<%=category.getBillNo()%>" value="<%=category.getBillNo() %>">
						<%
							}
						%>
					</datalist>
						</div>
					</div>
				</div>
				
				<div class="row buttons_margin_top">
				<div align="center">
				<input type="button" value="Search" id="btn" onclick="billwisestock1();" class="btn btn-lg btn-success btn-md button_hw button_margin_right"/>
						
						</div>
			</div>
			
			</div>
		
		
		
		
			
			<br>
	<br> <br>
	<br>

<div class="row">
			  <div class="table-responsive">
	<table class= "table table-bordered table-striped table-condensed cf" id="example1" class="display" style=" border: 2px solid black; border-collapse: collapse;">
		<thead>
			<tr>
			
				<th> Bill No</th>
				<th> Category Name</th>
				<th> Item Name</th>
				<th>Brand Name</th>
				<th> No of barrels</th>
				<th>Total Litre</th>
				<th> Buy Price</th>
				<th> Buyprice Ex</th>
				<th> Tax Percentage</th>
				
				
				
				
				

			</tr>
		</thead>
		<tfoot>
		<tr>	
		<th colspan="4" style="text-align: right">Total:</th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>

		</tr>
		</tfoot>
	</table>
	</div></div>

</form>
</div>		
</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>

	</div>
   </body>
  </html>