
function validateSupplierDetails(){
	
	var supplierName= $('#supplierName').val();
	var city= $('#city').val();
	var mobileno= $('#mobileno').val();
	
	var SupplierNamePattern = /^[a-zA-Z ]{2,50}$/;
	//var SupplierNamePattern = /^[a-zA-Z, ]+$/;
	var SupplierNamePatternRes = SupplierNamePattern.test(supplierName);
	
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(mobileno);
	
	if(supplierName != null && supplierName != "" && supplierName != " ")
	{
	 if(SupplierNamePatternRes)
	 {
		 if(city != null && city != "" && city != " ")
			
		 {
			 if(mobileno != null && mobileno != "" && mobileno != " ")
				
			 {
				 if(monoPatternRes)
				 
				 {
					 supplierDetails();
				    }
				 else
				 
				 {
					 
					 alert("Enter valid 10 digit Moible number");
				 }
				}
			 	else
			 	
			 	{
			 		alert("Please Enter mobile number !");
				}
			}
		 	else
		 	
		 	{
		 		alert("Please Enter City Name !");
			}
	    }
	 else
	 
	 {
		 
		 alert("Enter only Name without Special Symbols and digit ! name must be in between 2 - 50 character");
	 	}
	}
else

{
	alert("Please Enter Supplier Name !");
}
	
	
}


function supplierDetails(){
	
	
/*	if ( document.supd.supplierName.value == "" )
    { 
	       alert("Please Enter Suppliar Name.");
      return false;
     }


     var letterNumber = /^[a-zA-Z ]+$/;  
	  if(document.supd.supplierName.value.match(letterNumber))   
	  { 

    if ( document.supd.partyType.value == "selected" )
    {  
  	      alert("Please Select Party Type.");
          return false;
    }

    if ( document.supd.address.value == "" )
    {
         
  	       alert("Please Enter Address.");
          return false;
    }

    if ( document.supd.brand.value == "" )
    {
           
  	      alert("Please Enter Brand Name.");
          return false;
    }
    
    var letterNumber = /^[a-zA-Z ]+$/;  
   	  if(document.supd.brand.value.match(letterNumber))   
      {

        if ( document.supd.city.value == "selected" )
        {
             
      	      alert("Please Select City Name.");
              return false;
        }

        if ( document.supd.state.value == "selected" )
        {
             
      	      alert("Please Select State Name.");
              return false;
        }

        if ( document.supd.pin.value == "" )
        {
             
      	      alert("Please Enter Pin Code.");
              return false;
        }

        var letterNumber = /^[0-9]+$/;  
        if(document.supd.pin.value.match(letterNumber))   
        {  
    
    	      if(document.supd.contactPerson.value == "" )
	          {
		             
    	    	     alert("Please Enter Contact Person Name .");
		             return false;
	          }
    	      
    	      var letterNumber = /^[a-zA-Z ]+$/;  
   	          if(document.supd.contactPerson.value.match(letterNumber))   
   	          {  
   	              
   	        	  if(document.supd.email.value == "" )
 		          {
 			            
 	    	    	     alert("Please Enter Email .");
 			             return false;
 		          }
   	        	  
   	        	  var letterNumber = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
	              if(document.supd.email.value.match(letterNumber))
   	        	  
   	        	  {
   	        	  
   	        	  
   	              
   	              
   	              if(document.supd.tinNo.value == "" )
	              {
		                
    	    	     alert("Please Enter Tin No .");
		             return false;
	              }
   	              var letterNumber = /^[0-9]+$/;  
 	              if(document.supd.tinNo.value.match(letterNumber))   
 	              {  
 	                  

 	   	              if(document.supd.cstNo.value == "" )
 		              {
 			            
 	    	    	     alert("Please Enter CST No .");
 			             return false;
 		              } 
 	   	              var letterNumber = /^[0-9]+$/;  
 	                  if(document.supd.cstNo.value.match(letterNumber))   
 	                  {
 	                	 
 	                	  if(document.supd.creditLimit.value == "" )
	 		              {
	 			            
	 	    	    	     alert("Please Enter Credit Limit No .");
	 			             return false;
	 		              } 
 	                	  var letterNumber = /^[0-9]+$/;  
	 	                  if(document.supd.creditLimit.value.match(letterNumber))   
	 	                  {
	 	                	 
	 	                	 if(document.supd.offer.value == "" )
		 		             {
		 			                
		 	    	    	     alert("Please Enter Offer .");
		 			             return false;
		 		             } 
	 	                	 var letterNumber = /^[0-9]+([.][0-9]+)?$/;  
		 	                 if(document.supd.offer.value.match(letterNumber))   
		 	                 {
		 	                	 
		 	                	if(document.supd.productType.value == "selected" )
			 		            {
			 			                
			 	    	    	     alert("Please Enter product type .");
			 			             return false;
			 		            } 
		 	                	 
		 	                	if(document.supd.itPanNo.value == "" )
			 		            {
			 			              
			 	    	    	     alert("Please Enter Pan No .");
			 			             return false;
			 		            } 
		 	                	var letterNumber = /^[0-9A-Z]+$/;  
		 	         	   	    if(document.supd.itPanNo.value.match(letterNumber))   
		 	         	   	    {
		 	         	   	    	
		 	         	   	             suppd();
		 	         	   	    	
		 	         	   	    }
		 	         	   	    else  
					            {   
					                    
				 	   	        	   alert("Enter Capital Alphabates and Numbers only.");
					                   return false;   
					            }
		 	                	 
		 	                	 
		 	                 }
	 	                	  
		 	                else  
				            {   
				                     
			 	   	        	   alert("Enter Numbers and decimals only.");
				                   return false;   
				            }	 
	 	                	  
	 	                	  
	 	                  }
 	                	  
	 	                  else  
			              {   
			                     
		 	   	        	   alert("Enter Numbers only.");
			                   return false;   
			              }
 	                	  
 	                	  
 	                  }
 	                  else  
		              {   
		                     
	 	   	        	   alert("Enter Numbers only.");
		                   return false;   
		              }
 	                  
 	            	  
 	              }  
   	              
 	              else  
	              {   
	                     
 	   	        	   alert("Enter Numbers only.");
	                   return false;   
	              } 
                 }
                 else {
               	  
               	  alert("Not a valid e-mail address");
      	              return false;
               	    
                 }
   	              
   	           }  
   	        	  
   	          else  
              {   
                      
   	        	   alert("Enter Alphabets only.");
                   return false;   
              }
   	          
   	     
   	       }
           else  
           {   
                 
        	   alert("Enter Numbers only.");
               return false;   
           } 
          
	       }
   	   else  
       {   
             
   		  alert("Enter Alphabets only.");
          return false;   
       }
	  }
	  else  
{   
      
		  alert("Enter Alphabets only.");
    return false;   
}


}
	
	
	
	
	
	        function suppd(){                  */
	
	        
	       // document.supd.btn.disabled = true;      
			
			var supplierName= $('#supplierName').val();
			var address = $('#address').val();
			var city=$('#city').val();
			var contactPerson = $('#contactPerson').val();
			var pin=$('#pin').val();
			var email=$('#email').val();
			var mobileno=$('#mobileno').val();
			var panNo=$('#panNo').val();
			
			
			var params= {};
			
			params ["supplierName"] = supplierName;
			params ["city"] = city;
			params ["address"] = address;
			params ["contactPerson"] = contactPerson;
			params ["pin"] = pin;
			params ["email"] = email;
			params ["mobileno"] = mobileno;
			params ["panNo"] = panNo;
			
			
			params["methodName"] = "doSupplierDetails";
			
	    	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	    	    	{
	    				alert(data);
	    				if(document.supd) 
	    				{
	    				  document.supd.reset();
	    			    }
	    				document.supd.btn.disabled = false;
	    			}
	    	    	).error(function(jqXHR, textStatus, errorThrown){
	    	    		if(textStatus==="timeout") {
	    	    			$(loaderObj).hide();
	    	    			$(loaderObj).find('#errorDiv').show();
	    	    		}
	    	    	});
	    	
	    }
	    
function disablecst(){
	
	if(document.supd.tinNo.value !== "")
	{
		document.supd.cstNo.disabled = true;
		return false;
	}
	else
	{
		document.supd.cstNo.disabled = false;
		return false;
	}	
 
}	

function disabletin(){
	
	if(document.supd.cstNo.value !== "")
	{
		document.supd.tinNo.disabled = true;
		return false;
	}	
	else
	{
		document.supd.tinNo.disabled = false;
		return false;
	}	
 
}	



function editsupplier()
{
this.getSupp = getSupp;
	
function getSupp()
{
	var mainCat = $("#supplierName").val();

	
	$("#address").append($("<input/>").attr("value","").text());
	$("#city").append($("<input/>").attr("value","").text());
	$("#pin").append($("<input/>").attr("value","").text());
	$("#contactPerson").append($("<input/>").attr("value","").text());
	$("#email").append($("<input/>").attr("value","").text());
	$("#mobileno").append($("<input/>").attr("value","").text());
	$("#panNo").append($("<input/>").attr("value","").text());
	$("#supplierName1").append($("<input/>").attr("value","").text());
	
	var params= {};
	params["methodName"] = "getSupplier";
	params["supplierName"]= mainCat;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
		    
		      document.getElementById("address").value = v.address;
		      document.getElementById("city").value = v.city;
		      document.getElementById("pin").value = v.pin;
		      document.getElementById("contactPerson").value = v.contactPerson;
		      document.getElementById("email").value = v.email;
		      document.getElementById("mobileno").value = v.mobileno;
		      document.getElementById("panNo").value = v.panNo;
		      document.getElementById("supplierName1").value = v.supplierName;
		      
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});

}

}
var es = new editsupplier();

function getAllMAinSupp(){
	
	
	var params= {};
	
	params["methodName"] = "getAllMAinSupp";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#suppName').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		
		$(document).ready(function() {
		 var total =   $('#suppName').DataTable( {
			 
			 dom: 'Bfrtip',
	         buttons: [
	             'copy', 'csv', 'excel', 'pdf', 'print'
	         ],
			 
			 fnRowCallback : function(nRow, aData, iDisplayIndex){
	                $("th:first", nRow).html(iDisplayIndex +1);
	               return nRow;
	            },
			    
	            "sPaginationType": "full_numbers",
		    	destroy: true,
		        searching: true,
		        orderable: true,
		        
		      
		columns: [
		          	{"data": "serialnumber", "width": "5%", "defaultContent": ""},
                    {"data": "supplierName", "width": "5%", "defaultContent": ""},
		            {"data": "address", "width": "5%", "defaultContent": ""},
		            {"data": "city", "width": "5%", "defaultContent": ""},
		            {"data": "mobileno", "width": "5%", "defaultContent": ""},
		            {"data": "contactPerson", "width": "5%", "defaultContent": ""},
		            {"data": "email", "width": "5%", "defaultContent": ""},
		            {"data": "panNo", "width": "5%", "defaultContent": ""},
		            {"data": "pin", "width": "5%", "defaultContent": ""},
		            
		        ],
		      
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#suppName').dataTable().fnAddData(mydata);
	
		}

	);
	
}	

////edit of supplier details///

function updateSupplier(){

	
	document.UpdateProd.btn.disabled = true;
	
	var input = document.getElementById('product'),
    list = document.getElementById('sup_drop'),
    	i,fkRootSupId;
	 		for (i = 0; i < list.options.length; ++i) {
			     if (list.options[i].value === input.value) {
			    	 fkRootSupId = list.options[i].getAttribute('data-value');
			     }
	 		}
	
	var itemName = $('#itemName').val();
	var hsnsacno = $('#hsnsacno').val();
	var modelName = $('#modelName').val();
	var NoBarrel = $('#NoBarrel').val();
	var TotalBarrel = $('#TotalBarrel').val();
	
	
	var params = {};
	
	params["productId"] = fkRootSupId;
	
	params["itemName"] = itemName;
	params["hsnsacno"] = hsnsacno;
	params["modelName"] = modelName;
	params["NoBarrel"] = NoBarrel;
	params["TotalBarrel"] = TotalBarrel;
	
	params["methodName"] = "updateProductDetailsOil";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
			alert(data);
				if(document.UpdateProd)
				{
					document.UpdateProd.reset();
				}	
				document.UpdateProd.btn.disabled =false;
			}
 	    	).error(function(jqXHR, textStatus, errorThrown){
 	    		
 	    		/*alert("Data Added Successfully..");
 	    		location.reload();
 				document.ccd.btn.disabled =false;*/
 	    		
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	});


}




function editsuppli(){
	
	
	
	var supplierName1= $('#supplierName1').val();
	var supplierName= $('#supplierName').val();
	var address = $('#address').val();
	var city=$('#city').val();
	//var partyType=$('#partyType').val();
//	var birthday=$('#birthday').val();
//	var anniversary=$('#anniversary').val();
	//var state = $('#state').val();
	var contactPerson = $('#contactPerson').val();
	//var cstNo=$('#cstNo').val();
	var pin=$('#pin').val();
//	var anniversary=$('#anniversary').val();
	var tinNo=$('#tinNo').val();
	//var creditLimit=$('#creditLimit').val();
	var email=$('#email').val();
	//var bankName=$('#bankName').val();
	//var accountNo=$('#accountNo').val();
	//var branchName=$('#branchName').val();
	//var ifscCode=$('#ifscCode').val();
	//var paymentType=$('#paymentType').val();
//	var offer=$('#offer').val();
	//var brand=$('#brand').val();
	//var productType=$('#productType').val();
//	var itPanNo=$('#itPanNo').val();
	var mobileno=$('#mobileno').val();
	var panNo=$('#panNo').val();
	
	
	var params= {};
	params ["supplierName1"] = supplierName1;
	params ["supplierName"] = supplierName;
	params ["city"] = city;
	//params ["partyType"] = partyType;
//	params ["birthday"] = birthday;
	params ["address"] = address;
//	params  ["anniversary"] = anniversary;
	//params ["state"] = state;
	params ["contactPerson"] = contactPerson;
	//params ["cstNo"] = cstNo;
	params ["pin"] = pin;
	//params ["branchName"] = branchName;
	params ["tinNo"] = tinNo;
	//params ["creditLimit"] = creditLimit;
	params ["email"] = email;
	//params ["bankName"] = bankName;
	//params ["accountNo"] = accountNo;
	//params ["ifscCode"] = ifscCode;
	//params ["paymentType"] = paymentType;
//	params ["offer"] = offer;
	//params ["brand"] = brand;
//	params ["itPanNo"] = itPanNo;
	//params ["productType"] = productType;
	params ["mobileno"] = mobileno;
	params ["panNo"] = panNo;
	
	params["methodName"] = "editSupp";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	    	{
				alert(data);
				location.reload(true);
			}
	    	).error(function(jqXHR, textStatus, errorThrown){
	    		if(textStatus==="timeout") {
	    			$(loaderObj).hide();
	    			$(loaderObj).find('#errorDiv').show();
	    		}
	    	});
	
	
}








function editsup(){
	
	
	if(document.supd1.supplier.value == "selected")
	{
		document.supd1.city.disabled = true;
		document.supd1.partyType.disabled = true;
		document.supd1.birthday.disabled = true;
		document.supd1.address.disabled = true;
		document.supd1.anniversary.disabled = true;
		document.supd1.state.disabled = true;
		document.supd1.contactPerson.disabled = true;
		document.supd1.cstNo.disabled = true;
		document.supd1.pin.disabled = true;
		document.supd1.branchName.disabled = true;
		document.supd1.tinNo.disabled = true;
		document.supd1.creditLimit.disabled = true;
		document.supd1.email.disabled = true;
		document.supd1.bankName.disabled = true;
		document.supd1.accountNo.disabled = true;
		document.supd1.ifscCode.disabled = true;
		document.supd1.paymentType.disabled = true;
		document.supd1.offer.disabled = true;
		document.supd1.brand.disabled = true;
		document.supd1.itPanNo.disabled = true;
		document.supd1.mobileno.disabled = true;
		
		
	}
	else
	{
		
		document.supd1.city.disabled = false;
		document.supd1.partyType.disabled = false;
		document.supd1.birthday.disabled = false;
		document.supd1.address.disabled = false;
		document.supd1.anniversary.disabled = false;
		document.supd1.state.disabled = false;
		document.supd1.contactPerson.disabled = false;
		document.supd1.cstNo.disabled = false;
		document.supd1.pin.disabled = false;
		document.supd1.branchName.disabled = false;
		document.supd1.tinNo.disabled = false;
		document.supd1.creditLimit.disabled = false;
		document.supd1.email.disabled = false;
		document.supd1.bankName.disabled = false;
		document.supd1.accountNo.disabled = false;
		document.supd1.ifscCode.disabled = false;
		document.supd1.paymentType.disabled = false;
		document.supd1.offer.disabled = false;
		document.supd1.brand.disabled = false;
		document.supd1.itPanNo.disabled = false;
		document.supd1.mobileno.disabled = false;
	}	
}
			




			