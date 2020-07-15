<%@page import="java.util.List"%>

<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>


			<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
			<script src="/SMT/staticContent/y_js/supplier.js"></script>
<script type="text/javascript">
          		 function editSupplier()
          		 {
          		 window.location = "s_SupplierEdit.jsp";
          		 }
          		 function listSupplier()
          		 {
          		window.location="s_supplier_list.jsp";
          		 }
  </script>
<body class="master_form_img">
	<div class="container-fluid">  
	
	<div class="row header_margin_top">
			    <div align="center">
			  		<h2 class="form-name style_heading">Supplier Details</h2>
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
				  		<hr style="border-top-color:#c1b1b1;">
		     </div>	
    </div>
    
      <form action="supplier" name="supd" method="post" class="form-horizontal">
      
      
     
			<div class="row">
				<div class="form-group" >
					
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">Supplier Name:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon glyphicon-user"></i>
							</span> <input type="text" class="form-control" name="supplierName"
								id="supplierName" placeholder="Supplier Name" />
						</div>
					</div>
					
					<div class="col-sm-2 " align="right">
						<label class="control-label">Address:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="address"
								name="address" placeholder="Address" />
						</div>
					</div>

				</div>
			</div>
			
			
			

			<div class="row">
				<div class="form-group">
					

					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">City:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="city" name="city"
								placeholder="City" />
						</div>
					</div>
					
					<div class="col-sm-2" align="right">
						<label class="control-label">Pin Code:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="pin" id="pin" maxlength="6" name="pin" class="form-control" placeholder="Pin Code" />
						</div>
					</div>

				</div>
			</div>
			
			
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">Contact Person:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> 
							<input type="text" id="contactPerson" name="contactPerson" class="form-control" placeholder="Contact Person" />
						</div>
					</div>

                    <div class="col-sm-2" align="right">
						<label class="control-label">E-mail:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
							<input type="text" id="email" name="email" class="form-control" placeholder="E-mail" />
						</div>
					</div>
					

				</div>
			</div>
			
			
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="right">
						<label class="control-label">Mobile No:<sup style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> 
							<input type="mobileno" id="mobileno" maxlength="10" name="mobileno" class="form-control" placeholder="Mobile No" />
						</div>
					</div>
					
					<div class="col-sm-2" align="right">
						<label class="control-label">GSTTIN/UIN No:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> 
							<input type="text" id="panNo" name="panNo" class="form-control" placeholder="GSTTIN/UIN No" />
						</div>
					</div>

				</div>
			</div>
			
			<div class="row buttons_margin_top">
			<div align="center">
    			<input type="button" value="save"  id="btn" onclick="validateSupplierDetails()" class="btn btn-lg btn-success btn-md button_hw button_margin_right"/> 
				<input type="reset" value="Cancel" class="btn btn-lg btn-danger btn-md button_hw button_margin_right"/>
				<input type="button" value="Edit" onclick="editSupplier()" class="btn btn-lg btn-primary btn-md button_hw button_margin_right" />
				<input type="button" value="List" onclick="listSupplier()" class="btn btn-lg btn-primary btn-md button_hw button_margin_right" />  
			</div>
		</div>	
				
	   </form>
	  
	 
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div> 
    
    </div>
   </body>
  </html>
				