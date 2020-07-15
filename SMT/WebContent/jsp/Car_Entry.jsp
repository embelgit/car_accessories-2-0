
<% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Car Entry</title>
	

	  <script src="/SMT/staticContent/js/carEntry.js"></script>
	  
	  
	  <script type="text/javascript">
	  
	  function deleteVehicleEntry()
	    {
	    	window.location = "DeleteVehicleEntry.jsp";
	    }
	  
	  
	  </script>
	  
	
</head>
<body>

	<div class="container-fluid">
	<h2 align="center" class="form-heading style_heading" style="margin-top: 50px;">Vehicle Entry</h2>
	
		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
			<form class="form-horizontal" action="" method="post">
				<div class="row margin-top-50">
					<div class="col-md-offset-2 col-sm-2" align="right">
						<label class="control-label">Vehicle Number :<sup>*</sup></label>
					</div>
					
					<div class="col-sm-2">
						<input type="text" class="form-control" id="carNo" name="carNo" placeholder="Vehicle Number" autofocus />
					</div>
					
					<div class="col-sm-2" align="right">
						<label class="control-label">Contact No :<sup>*</sup> </label>
					</div>
					<div class="col-sm-2">
						<input type="contactNo" class="form-control" id="contactNo" name="contactNo" maxlength="10" placeholder="Contact Number" />
					</div>
					
				</div>
				
				
				
				<div class="row margin-top-13" style="margin-top: 35px;">
					<div class="col-md-offset-2 col-sm-2" align="right">
						<label class="control-label">Owner Name :<sup>*</sup> </label>
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="ownerName" name="ownerName" placeholder="Owner Name here" autofocus />
					</div>
					
					<!-- <div class="col-sm-2">
						<label class="control-label">Select Date : </label>
					</div>
					<div class="col-sm-2">
						<input type="date" class="form-control" id="dateid" name="dateid" placeholder="select date" />
					</div> -->
					
					
					<div class="col-sm-2" align="right">
						<label class="control-label">Kilometer Reading :  </label>
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="KmReader" name="KmReader" placeholder="Kilometer Reading" />
					</div>
					
				</div>
			
			<div class="row margin-top-13" style="margin-top: 35px;">
					<div class="col-md-offset-2 col-sm-2" align="right">
						<label class="control-label">Vehicle color : </label>
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="vehiclecolor" name="vehiclecolor" placeholder="vehicle color" autofocus />
					</div>
					
						
					<div class="col-sm-2" align="right">
						<label class="control-label">Vehicle Name :  </label>
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" id="vehiclename" name="vehiclename" placeholder="vehicle name" />
					</div>
					
					
					
					
					
			</div>
			
			   <div align="center" class="margin-top-50" style="margin-top: 25px;">
			   		<button type="button" class="btn btn-lg btn-success unicButton btn-md button_hw button_margin_right" style="text-align: center;" name="createbtn" id="createbtn" onclick="validateCarEntry()">Save</button>
			   		 <button type="reset"  class="btn btn-lg btn-danger unicButton btn-md button_hw button_margin_right" style="text-align: center;">Reset</button>
			   		 <!-- <input type="button" onclick="editProduct()" id="createbtn" value="Edit Product" class="btn btn-lg btn-primary btn-md button_hw button_margin_right"/> -->
			   		 
			   		 <input type="button" value="Delete" id="createbtn" class="btn btn-lg btn-primary btn-md button_hw button_margin_right unicButton" onclick="deleteVehicleEntry()" />
				</div>
			
			
			
			
		
			</form>			
	</div>
	
	<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
     </div> 

</body>
</html>

