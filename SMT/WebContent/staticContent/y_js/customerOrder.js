
var pk_temp_id;

function getitemData(){ 
		var valuee = document.getElementById("key").value;
		var carNo = $('#carNo').val();
		
		if(carNo == ""){
			alert("Select Car First !!!");
			
		}
		else{
		var params= {};
		
//		alert(valuee+carNo);
		params["methodName"] ="fetchCust";
		params["key"]=valuee;
		params["carNo"]=carNo;
		
//		document.getElementById('key').value = null;
		var count=0;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
 	    	{
			 var result = data.length;

			 if(result <= "20"){
				 alert("Stock NOT AVAILABLE !!!");
				 return true;
			 }	
			getitemDataByCarNo();
				
 			})
		}
	
}



function getitemDataByCarNo(){ 
	
	var carNo = $('#carNo').val();
	
	var params= {};
	
	params["carNo"]=carNo;
	params["methodName"] ="getItemDetailByCarNo";
	
	
	
	var count=0;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	  {
		var jsonData = $.parseJSON(data);
		
	    $("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
        
	    $.each(jsonData,function(i,v)
		  {
	    
		  $("#list4").jqGrid({
			datatype: "local",
			
			colNames:['pk_temp_id','item_id','BarcodeNO','CategoryName','ItemName','HSN/SAC', 'Quantity', 'UnitPrice','Discount','Discount Amt','GST%','IGST%','Tax Amt','Total'],
			colModel:[ 
			          
			          
                 {
	                name:'pk_temp_id',
	                hidden:true,
	              
                 },    
			     {
			    	 name:'item_id',
			    	 hidden:true,
			     },
			    
			 	{
			    	 name:'barcodeNo',
			    	 width:70,				    	
			    	 
			     },
			     {	name:'categoryName',
			    	 width:120,
					
				},
			           
			    {	name:'itemName',
			    	 width:120,
					
				},
				{	name:'hsnSacNo',
			    	 width:100,
				},
				
				{	name:'quantity',
					width:70,
					editable: true
				},
				
				{	name:'salePrice',
					width:100,
					editable: true
				},
				
				{	name:'discountGrid',
					width:100,
					editable: true
					
				},
				
				{	name:'discountAmt',
					width:100,
					
					
				},
				{	name:'vat',
					editable: true,
					//hidden:true,
				},
				{	name:'igst',
					editable: true,
					//hidden:true,
				},
				{	name:'taxAmount',
					hidden:true,
				},
				
				{ 
					//name:'TotalQuan',
					name:'total',
					width:150,
					formatter: 'number',
				//	formatter: sumFmatter
				},
				
			],
				
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			width: 900,
            //height: 200,
            shrinkToFit: true,
            hoverrows: true,
	        rownumbers: true,
            rowNum: 10,
            'cellEdit':true,
	           afterSaveCell: function () 
	           {
	        	   // $(this).trigger('reloadGrid');
	        	var rowId =$("#list4").jqGrid('getGridParam','selrow');  
                var rowData = jQuery("#list4").getRowData(rowId);
             	var quantity = rowData['quantity'];
             	var salePrice = rowData['salePrice'];
             	var gst = rowData['vat'];
            	var igst = rowData['igst'];
            	var discount = rowData['discountGrid'];
             	var discountAmt = rowData['discountAmt'];
            	var tota = 0;
            	var vatAmt = 0;
            	var totAmt = 0;
            	
            	
            	if(gst != "")
				{
					var IDecs = /^[0-9]+$/;
					if(gst.match(IDecs))
					{
						(gst > Number(0))
						{
						
						}

					}
				else{
					var abc ="0";
					var pqr ="0"
					alert(" Please Enter GST Number OR IGST Number ");
					$("#list4").jqGrid("setCell",rowId, "igst", abc);

					$("#list4").jqGrid("setCell",rowId, "gst", abc);
					$("#list4").jqGrid("setCell",rowId, "taxAmount", pqr);
					return false;
					}
				
				}
            	
            	if(igst != "")
				{
					var IDecs1 = /^[0-9]+$/;
					if(igst.match(IDecs1))
					{
						(igst > Number(0))
						{
						
						}

					}
				else{
					var abc ="0";
					var pqr ="0"
					alert(" Please Enter GST Number OR IGST Number ");
					$("#list4").jqGrid("setCell",rowId, "igst", abc);

					$("#list4").jqGrid("setCell",rowId, "gst", abc);
					$("#list4").jqGrid("setCell",rowId, "taxAmount", pqr);
					return false;
					}
				
				}
            	
            	if(igst >0 && gst > 0 )
				{
				var abc ="0";
				alert(" Please Enter GST Number OR IGST Number");
				$("#list4").jqGrid("setCell",rowId, "igst", abc);

				$("#list4").jqGrid("setCell",rowId, "gst", abc);
				return false;
				}
            	
            	
            	tota = quantity * salePrice;
            	totAmt = quantity * salePrice;
            	
            	var totalIncDisc= (tota*(discount/100));
            	var finalTotal= totAmt-totalIncDisc;
            	$("#list4").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
             
            	
             
            	/*if(gst != "0")
            	{
            		vatAmt =  ((tota*gst)/100);
            		totAmt = +tota + +vatAmt;
            	}
            	if(igst != "0")
            	{
            		vatAmt =  ((tota*igst)/100);
            		totAmt = +tota + +vatAmt;
            	}*/
            	
            	if(igst ==null || igst==0 || igst==""){
            		
                	
                	var calculateVatTotal = (gst / 100)*finalTotal;
                	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                	
                	}
                	else if(igst !=null || igst!=0|| igst!=""){
                		
                		var calculateVatTotal = (igst / 100)*finalTotal;
                    	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                    	
                	}
            	
            	
            	$("#list4").jqGrid("setCell", rowId, "taxAmount", calculateVatTotal);
             	$("#list4").jqGrid("setCell", rowId, "total", totalWithVatAmt);
             	var Total = 0;
            	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#list4').getGridParam('data');
				var AllRows=JSON.stringify(allRowsInGrid1);
                for (var k = 0; k < count; k++) 
                {
            	var Total1 = allRowsInGrid1[k].total;
            	if(Total1 != undefined)
            	{
            		Total = +Total + +Total1;
            	}
                }
                    document.getElementById("totalAmount").value = Math.round(Total);
                    var totAmount = Math.round(Total);
             	    var dis = document.getElementById("discount").value;
             	    if(dis != "0"){
             	    	document.getElementById("grossTotal").value = totAmount;
             	    }
             	    else
             	    {
             	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
             	    }
	        	},
           
			pager: "#jqGridPager",
			
		});
		
		$("#list4").addRowData(i+1,jsonData[i]);
     
		 $('#list4').navGrid('#jqGridPager',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                   
	                    afterSubmit: function() {
	                		$('#list4').trigger( 'reloadGrid' );
						},
						
						 recreateForm: true,
						 checkOnUpdate : true,
						 checkOnSubmit : true,
		                 closeAfterEdit: true,
						
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	afterSubmit: function() {
	                		$('#list4').trigger( 'reloadGrid' );
						},
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	closeAfterdel:true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
	                	afterComplete: function () {
	                		var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	                        var rowData = jQuery("#list4").getRowData(rowId);
	                     	var quantity = rowData['quantity'];
	                     	var salePrice = rowData['salePrice'];
	                     	var gst = rowData['vat'];
	                    	var igst = rowData['igst'];
	                    	var discount = rowData['discountGrid'];
	                     	var discountAmt = rowData['discountAmt'];
	                    	var tota = 0;
	                    	var vatAmt = 0;
	                    	var totAmt = 0;
	                    	
	                    	
	                    	/*if(gst != "")
	        				{
	        					var IDecs = /^[0-9]+$/;
	        					if(gst.match(IDecs))
	        					{
	        						(gst > Number(0))
	        						{
	        						
	        						}

	        					}
	        				else{
	        					var abc ="0";
	        					var pqr ="0"
	        					alert(" Please Enter GST Number OR IGST Number ");
	        					$("#list4").jqGrid("setCell",rowId, "igst", abc);

	        					$("#list4").jqGrid("setCell",rowId, "gst", abc);
	        					$("#list4").jqGrid("setCell",rowId, "taxAmount", pqr);
	        					return false;
	        					}
	        				
	        				}
	                    	
	                    	if(igst != "")
	        				{
	        					var IDecs1 = /^[0-9]+$/;
	        					if(igst.match(IDecs1))
	        					{
	        						(igst > Number(0))
	        						{
	        						
	        						}

	        					}
	        				else{
	        					var abc ="0";
	        					var pqr ="0"
	        					alert(" Please Enter GST Number OR IGST Number ");
	        					$("#list4").jqGrid("setCell",rowId, "igst", abc);

	        					$("#list4").jqGrid("setCell",rowId, "gst", abc);
	        					$("#list4").jqGrid("setCell",rowId, "taxAmount", pqr);
	        					return false;
	        					}
	        				
	        				}
	                    	
	                    	if(igst >0 && gst > 0 )
	        				{
	        				var abc ="0";
	        				alert(" Please Enter GST Number OR IGST Number");
	        				$("#list4").jqGrid("setCell",rowId, "igst", abc);

	        				$("#list4").jqGrid("setCell",rowId, "gst", abc);
	        				return false;
	        				}*/
	                    	
	                    	
	                    	tota = quantity * salePrice;
	                    	totAmt = quantity * salePrice;
	                    	
	                    	var totalIncDisc= (tota*(discount/100));
	                    	var finalTotal= totAmt-totalIncDisc;
	                    	$("#list4").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
	                     
	                    	
	                     
	                    	/*if(gst != "0")
	                    	{
	                    		vatAmt =  ((tota*gst)/100);
	                    		totAmt = +tota + +vatAmt;
	                    	}
	                    	if(igst != "0")
	                    	{
	                    		vatAmt =  ((tota*igst)/100);
	                    		totAmt = +tota + +vatAmt;
	                    	}*/
	                    	
	                    	if(igst ==null || igst==0 || igst==""){
	                    		
	                        	
	                        	var calculateVatTotal = (gst / 100)*finalTotal;
	                        	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
	                        	
	                        	}
	                        	else if(igst !=null || igst!=0|| igst!=""){
	                        		
	                        		var calculateVatTotal = (igst / 100)*finalTotal;
	                            	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
	                            	
	                        	}
	                    	
	                    	
	                    	$("#list4").jqGrid("setCell", rowId, "taxAmount", calculateVatTotal);
	                     	$("#list4").jqGrid("setCell", rowId, "total", totalWithVatAmt);
	                     	var Total = 0;
	                    	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	        				var allRowsInGrid1 = $('#list4').getGridParam('data');
	        				var AllRows=JSON.stringify(allRowsInGrid1);
	                        for (var k = 0; k < count; k++) 
	                        {
	                    	var Total1 = allRowsInGrid1[k].total;
	                    	if(Total1 != undefined)
	                    	{
	                    		Total = +Total + +Total1;
	                    	}
	                        }
	                            document.getElementById("totalAmount").value = Math.round(Total);
	                            var totAmount = Math.round(Total);
	                     	    var dis = document.getElementById("discount").value;
	                     	    if(dis != "0"){
	                     	    	document.getElementById("grossTotal").value = totAmount;
	                     	    }
	                     	    else
	                     	    {
	                     	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
	                     	    }
	        	        	},
	                   
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
			
			})
	    

}
	
function shree(pk_temp_id){
	
	var params= {};
	
	params["pk_temp_id"] = pk_temp_id;
	params["methodName"] = "deleteItem";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
 	    	{
		$(this).trigger('reloadGrid');
		/*var grid = $("#list4"),
		  intervalId = setInterval(
			 function() {
			         grid.trigger("reloadGrid",[{current:true}]);
			   },
			   500);*/
  	
 			}
 	    	)
}


function resBill() {
	document.getElementById("btnSubmit").disabled = true; 
	var params= {};
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#list4').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++) {
	
		var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
		
		if(pk_temp_id=="" || pk_temp_id==null || pk_temp_id==undefined){
			pk_temp_id=0;
		}
		params["pk_temp_id"+i] = pk_temp_id;
		
		var item_id = allRowsInGrid1[i].item_id;
		if(item_id=="" || item_id==null || item_id==undefined){
			item_id=0;
		}
     	params["item_id"+i] = item_id;
     	
     	
		var itemName = allRowsInGrid1[i].itemName;
		/*if(itemName == undefined){
			itemName = "NA";
		}*/
		if(itemName=="" || itemName==null || itemName==undefined){
			itemName="NA";
		}
		params["itemName"+i] = itemName;
		
		var quantity = allRowsInGrid1[i].quantity;
		/*if(quantity == undefined){
			quantity = 0;
		}*/
		if(quantity=="" || quantity==null || quantity==undefined){
			quantity=0;
		}
		var stock = allRowsInGrid1[i].stock;
		

		
		params["quantity"+i] = quantity;
		
		var barcodeNo = allRowsInGrid1[i].barcodeNo;
		/*if(barcodeNo == undefined){
			barcodeNo = 0;
		}*/
		if(barcodeNo=="" || barcodeNo==null || barcodeNo==undefined){
			barcodeNo=0;
		}
		params["barcodeNo"+i] = barcodeNo;
		
		var categoryName = allRowsInGrid1[i].categoryName;
		/*if(categoryName == undefined){
			categoryName = "NA";
		}*/
		if(categoryName=="" || categoryName==null || categoryName==undefined){
			categoryName="NA";
		}
		params["categoryName"+i] = categoryName;

		var salePrice = allRowsInGrid1[i].salePrice;
		/*if(salePrice == undefined){
			salePrice = 0;
		}*/
		if(salePrice=="" || salePrice==null || salePrice==undefined){
			salePrice=0;
		}
		params["salePrice"+i] = salePrice;
		
		var total = allRowsInGrid1[i].total;
		/*if(total == undefined){
			total = 0;
		}*/
  		if(total == "" || total == null || total == undefined){
  			total = 0;
  		}
		params["total"+i] = total;
		
		var hsnSacNo = allRowsInGrid1[i].hsnSacNo;
		/*if(hsnSacNo == undefined){
			hsnSacNo = 0;
		}*/
		if(hsnSacNo=="" || hsnSacNo==null || hsnSacNo==undefined){
			hsnSacNo=0;
		}
		params["hsnSacNo"+i] = hsnSacNo;
		

         
          var TotalQuan = allRowsInGrid1[i].TotalQuan;
    		if(TotalQuan == "" || TotalQuan == null || TotalQuan == undefined){
    			TotalQuan = 0;
      		}
  		params["TotalQuan"+i] = TotalQuan;
  		
  		var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
  		
  		if(buyPriceExTax == "" || buyPriceExTax == null || buyPriceExTax == undefined){
  			buyPriceExTax = 0;
  		}
  		params["buyPriceExTax"+i] = buyPriceExTax;
  		
  		 
		var vat = allRowsInGrid1[i].vat;
		/*if(vat == undefined){
			vat = 0;
		}*/
		if(vat=="" || vat==null || vat==undefined){
			vat=0;
		}
		params["vat"+i] = vat;
		
		var igst = allRowsInGrid1[i].igst;
		/*if(igst == undefined){
			igst = 0;
		}*/
		if(igst=="" || igst==null || igst==undefined){
			igst=0;
		}
		params["igst"+i] = igst;
		
		var taxAmount = allRowsInGrid1[i].taxAmount;
		/*if(taxAmount == undefined){
			taxAmount = 0;
		}*/
		if(taxAmount == "" || taxAmount == null || taxAmount == undefined){
			taxAmount = 0;
  		}
		params["taxAmount"+i] = taxAmount;
		
		

		
		//var discountGrid = allRowsInGrid1[i].discountGrid;
		/*if(discountGrid == undefined){
			discountGrid = 0;
		}*/
		//params["discountGrid"+i] = discountGrid;
		
		//var discountAmt = allRowsInGrid1[i].discountAmt;
		/*if(discountAmt == undefined){
			discountAmt = 0;
		}
*/		//params["discountAmt"+i] = discountAmt;
		
		
	  }
	
    var paymentMode = $('#paymentMode').val();
    var creditdescription = $('#creditdescription').val();
    var paidAmt = $('#paidAmt').val();
    
    var Customername = $('#CustomerId').val();
    
    if(creditdescription == "" || creditdescription == null || creditdescription == undefined){
    	creditdescription="NA";
    }
    if(paidAmt == "" || paidAmt == null || paidAmt == undefined){
    	paidAmt = 0;
    }
    if(Customername == "" || Customername == null || Customername == undefined){
    	Customername="NA";
    }
    
	    var contactNo = $('#contactNo').val();
	    /*if(contactNo == ""){
	    	contactNo = 0;
	    }*/
	    var vehicleName = $('#vehicleName').val();
	    
	    var ownerName=$('#ownerName').val();
	    /*if(ownerName == ""){
	    	ownerName = "NA";
	    }*/
	    var carNo=$('#carNo').val();
	   /* if(carNo == ""){
	    	carNo = 0;
	    }*/
	    var totalAmount=$('#totalAmount').val();
	    
		if(totalAmount == "" || totalAmount == null || totalAmount == undefined){
			totalAmount = 0;
  		}
	    
	    /*if(totalAmount == ""){
	    	totalAmount = 0;
	    }*/
	   /* var discount=$('#discount').val();
	    if(discount == ""){
	    	discount = 0;
	    }*/
	   /* var laberCharges=$('#laberCharges').val();
	    if(laberCharges == ""){
	    	laberCharges = 0;
	    }
	    var grossTotal=$('#grossTotal').val();
	    */
	    var carID=$('#carID').val();
	    /*if(carID == ""){
	    	carID = 0;
	    }*/
	    var grossTotal=$('#spareGrossTotal').val();
	   /* if(grossTotal == ""){
	    	grossTotal = 0;
	    }*/
	    var wholeTotal=$('#wholeTotal').val();
	    
	    var discount=$('#discount').val();
	    //alert("++++++++++++D"+discount)
	    if(discount == "" || discount == null || discount == undefined){
	    	discount = 0;
  		}
	    	 params["discount"] = discount;
	    	//alert("discount"+discount)
	    	
	    	
	    var description=$('#description').val();
		if(description == "" || description == null || description == undefined){
			description = "NA";
  		}
	    params["description"] = description;
	    
	    var kmReading=$('#KmReader').val();
	    var vehiclecolor=$('#vehiclecolor').val();
	    var gstNo=$('#gstNo').val();
	    if(gstNo == "" || gstNo == null || gstNo == undefined){
	    	gstNo = "0";
  		}
	    //
	    params["Customername"] = Customername;
	    params["kmReading"] = kmReading;
	    params["vehiclecolor"] = vehiclecolor;
	    params["gstNo"] = gstNo;
		params["vehicleName"]=vehicleName;
	
	    params["paymentMode"] = paymentMode;
	    params["creditdescription"] = creditdescription;
	    params["paidAmt"] = paidAmt;
	    
		params["contactNo"] = contactNo;
		params["ownerName"] = ownerName;
		params["count"] = count;
		//alert("count first++++  " +count2)
		params["carNo"] = carNo;
		params["totalAmount"] = totalAmount;
		//params["discount"] = discount;
		//params["laberCharges"] = laberCharges;
		params["grossTotal"] = grossTotal;
		params["carID"] = carID;
		params["wholeTotal"] = wholeTotal;
		/*if(count != 0){
		setTimeout(function(){ window.open("Car_bill_PDF.jsp"); alert("dfhsdahd"); }, 500);
		}*/
		
		///////////////////////
		//
	
		params["methodName"] = "registerBill";
		
		$.post('/SMT/jsp/utility/controller.jsp', params,
				function(data) {
					alert(data);
					//window.open("Car_bill_PDF.jsp");
					window.open("BillingPdfNew.jsp");
					location.reload(true);

				}).error(function(jqXHR, textStatus, errorThrown) {
			if (textStatus === "timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
		
		
	
}
function shreedon(){
	 window.open("Car_bill_PDF.jsp"); 
	 alert("dfhsdahd");
}


////////////getting product for grid//////////
function getproductgrid(){ 
	var productId = document.getElementById("productId").value;
	var splitText = productId.split(" => ");
	var productId1 = splitText[0];
	var carNo = $('#carNo').val();
	
	if(carNo == ""){
		alert("Select Car First !!!");
		
	}
	else{
	var params= {};
	

	params["methodName"] ="getProdGrid";
	params["productId1"]=productId1;
	params["carNo"]=carNo;
	
	document.getElementById('productId').value = "";
	var count=0;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	    	{
		 var result = data.length;

		 if(result <= "20"){
			 alert("Stock NOT AVAILABLE !!!");
			 return true;
		 }	
		getitemDataByCarNo();
			
			})
	}

}



function getitemDataByCarNo(){ 

var carNo = $('#carNo').val();
//alert(carNo);
var params= {};

params["carNo"]=carNo;
params["methodName"] ="getItemDetailByCarNo";



var count=0;
var newrow;
var rowId;

$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
 {	
	var jsonData = $.parseJSON(data);
	
	$("#list4").jqGrid("clearGridData", true);
	//$("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
   //$("#list4").jqGrid("clearGridData", false);
    
    $.each(jsonData,function(i,v)
    {
    	//MULTIPLE GRID GROSS TOTAL CAHNGES BY SAGAR
    	
    	var gTotal = 0;
    	
    	if(v.length > 0)
    	{
	    	for (var p = 0; p < v.length; p++) 
			{
	    		gTotal = +gTotal + +v[p].total;
			}
	    	
	    	document.getElementById("totalAmount").value = gTotal;
	    	document.getElementById("spareGrossTotal").value = gTotal;
	    	document.getElementById("wholeTotal").value = gTotal;
    	}
    	else
    	{
	    	document.getElementById("totalAmount").value = 0;
	    	document.getElementById("spareGrossTotal").value = 0;
	    	document.getElementById("wholeTotal").value = 0;
    	}
    	
    	//MULTIPLE GRID GROSS TOTAL CAHNGES BY SAGAR
    	
    	 /*count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#list4").jqGrid('getGridParam','data');
		     var ids = jQuery("#list4").jqGrid('getDataIDs');
		   
			
			  var prodName,com,packing,unit;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].ItemName;
				  
				
				 var rowId = ids[j];
				 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				 newrow = true;
				if (prodName == jsonData.offer.ItemName ) {
			    	
			    	newrow=false;
					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#jqGrid");
				    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
				}
			 }
			  
			  if(newrow == true)
				 {
					
				  //$("#list4").addRowData(i,jsonData[i]);
				  $("#list4").addRowData(count,jsonData.offer);
					
				 }
    
*/	  $("#list4").jqGrid({
		datatype: "local",
		
		colNames:['pk_temp_id','item_id','BarcodeNO','CategoryName','ItemName','HSN/SAC', 'Quantity', 'UnitPrice',"Total SP","SPExTax","SPIncTax",'GST%','IGST%','Tax Amt','Discount','Discount Amt','Total','Stock'],
		colModel:[ 
		          
		          
             {
                name:'pk_temp_id',
                hidden:true,
              
             },    
		     {
		    	 name:'item_id',
		    	 hidden:true,
		     },
		    
		 	{
		    	 name:'barcodeNo',
		    	 width:70,				    	
		    	 
		     },
		     {	name:'categoryName',
		    	 width:120,
				
			},
		           
		    {	name:'itemName',
		    	 width:120,
				
			},
			{	name:'hsnSacNo',
		    	 width:100,
			},
			
			{	name:'quantity',
				width:70,
				editable: true
			},
			
			{	name:'salePrice',
				width:100,
				editable: true
			},
			
			 {
	        	   name: "TotalQuan",
	        	   width: 150,
	        	   //editable: true,
	        	 
	           },
	           
	           {
	        	   name: "buyPriceExTax",
	        	   width: 150,
	        	   //editable: true,
	        	 
	           },
	           
	           {
	        	   name: "buyPriceIncxTax",
	        	   width: 150,
	        	   hidden:true,
	        	   //editable: true,
	        	 
	           },
			
			
			{	name:'vat',
				editable: true,
				//hidden:true,
			},
			{	name:'igst',
				editable: true,
				//hidden:true,
			},
			{	name:'taxAmount',
				//hidden:true,
			},
			
			{	name:'discountGrid',
				width:100,
				//editable: true
				hidden:true,
				
			},
			
			{	name:'discountAmt',
				width:100,
				hidden:true,
				
				
			},
			
			{	
				
				//name :'TotalQuan',
				name:'total',
				width:150,
				formatter: 'number',
			//	formatter: sumFmatter
			},
			{	name:'stock',
				width:100,
				hidden:true,
				
				
			}
			
		],
			
		
		sortorder : 'desc',
		loadonce: false,
		viewrecords: true,
		width: 900,
        //height: 200,
        shrinkToFit: true,
        hoverrows: true,
        rownumbers: true,
        rowNum: 10,
        'cellEdit':true,
           afterSaveCell: function () 
           {
        	   // $(this).trigger('reloadGrid');
        	var rowId =$("#list4").jqGrid('getGridParam','selrow');  
            var rowData = jQuery("#list4").getRowData(rowId);
         	var quantity = rowData['quantity'];
         	var salePrice = rowData['salePrice'];
         	var gst = rowData['vat'];
        	var igst = rowData['igst'];
        	var discount = rowData['discountGrid'];
         	var discountAmt = rowData['discountAmt'];
        	var stock = rowData['stock'];
        	
        	var vatAmt = 0;
        	var totAmt = 0;
        	var buyPriceExTax = rowData['buyPriceExTax'];
        	var discount1 = 0;
        	var finaltota = 0;
        	var BPExTax = 0;
        	var taxAmount=0;
        	var BpIncTax=0;
        	var BPIncTaxFinal=0;
        	
        	if(gst != "")
			{
				var IDecs = /^[0-9]+$/;
				if(gst.match(IDecs))
				{
					(gst > Number(0))
					{
					
					}

				}
			else{
				var abc ="0";
				var pqr ="0"
				alert(" Please Enter GST Number OR IGST Number ");
				$("#list4").jqGrid("setCell",rowId, "igst", abc);

				$("#list4").jqGrid("setCell",rowId, "gst", abc);
				$("#list4").jqGrid("setCell",rowId, "taxAmount", pqr);
				return false;
				}
			
			}
        	
        	if(igst != "")
			{
				var IDecs1 = /^[0-9]+$/;
				if(igst.match(IDecs1))
				{
					(igst > Number(0))
					{
					
					}

				}
			else{
				var abc ="0";
				var pqr ="0"
				alert(" Please Enter GST Number OR IGST Number ");
				$("#list4").jqGrid("setCell",rowId, "igst", abc);

				$("#list4").jqGrid("setCell",rowId, "gst", abc);
				$("#list4").jqGrid("setCell",rowId, "taxAmount", pqr);
				return false;
				}
			
			}
        	
        	if(igst >0 && gst > 0 )
			{
			var abc ="0";
			alert(" Please Enter GST Number OR IGST Number");
			$("#list4").jqGrid("setCell",rowId, "igst", abc);

			$("#list4").jqGrid("setCell",rowId, "gst", abc);
			return false;
			}
        	
        	if(+quantity > +stock){
    			var a ="0";
    			alert("Stock not available");
    			$("#list4").jqGrid("setCell",rowId, "quantity", a);
    			return false;
        	}
        	
        	//tota = quantity * salePrice;
        	totAmt = quantity * salePrice;
        	$("#list4").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
        	
        	/*var totalIncDisc= (tota*(discount/100));
        	var finalTotal= totAmt-totalIncDisc;
        	$("#list4").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
         
        	*/
         
        	/*if(gst != "0")
        	{
        		vatAmt =  ((tota*gst)/100);
        		totAmt = +tota + +vatAmt;
        	}
        	if(igst != "0")
        	{
        		vatAmt =  ((tota*igst)/100);
        		totAmt = +tota + +vatAmt;
        	}*/
        	
        	if(igst ==null || igst==0 || igst==""){
        		
            	
            	//var calculateVatTotal = (gst / 100)*finalTotal;
            	//var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
        		BPExTax=totAmt/(1+(gst/100));
        		taxAmount=totAmt-BPExTax;
        		//BpIncTax=BPExTax+taxAmount;
        		BpIncTax=((totAmt*(gst))/100);
        		BPIncTaxFinal=BpIncTax+totAmt;
            	
            	}
            	else if(igst !=null || igst!=0|| igst!=""){
            		
            		//var calculateVatTotal = (igst / 100)*finalTotal;
                	//var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
            		BPExTax=totAmt/(1+(igst/100));
            		taxAmount=totAmt-BPExTax;
            		BpIncTax=((totAmt*(igst))/100);
            		BPIncTaxFinal=BpIncTax+totAmt;
                	
            		
                	
            	}
        	
        	/*if(discount != "0"){
        		discount1 = (BPExTax*(discount/100));
        		finaltota = +BPExTax - +discount1;
        		
        		
        	}
        	else
        		{
        		discount1 = (BPExTax*(discount/100));
        		finaltota = +BPExTax - +discount1;
        		
        		}*/
        	
        	$("#list4").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
        	$("#list4").jqGrid("setCell", rowId, "buyPriceIncxTax", BPIncTaxFinal.toFixed(2));
        	//$("#list4").jqGrid("setCell", rowId, "discountAmt", discount1);
        	$("#list4").jqGrid("setCell", rowId, "taxAmount", taxAmount.toFixed(2));
         	$("#list4").jqGrid("setCell", rowId, "total", totAmt.toFixed(2));
         	var Total = 0;
        	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			var allRowsInGrid1 = $('#list4').getGridParam('data');
			var AllRows=JSON.stringify(allRowsInGrid1);
            for (var k = 0; k < count; k++) 
            {
        	var Total1 = allRowsInGrid1[k].total;
        	if(Total1 != undefined)
        	{
        		Total = +Total + +Total1;
        	}
            }
                document.getElementById("totalAmount").value = Math.round(Total);
                
                var totAmount = Math.round(Total);
         	    var dis = document.getElementById("discount").value;
         	    if(dis != "0"){
         	    	document.getElementById("spareGrossTotal").value = totAmount.toFixed(2);
         //	    	document.getElementById("wholeTotal").value = totAmount.toFixed(2);
         	    }
         	    else{
         	    	document.getElementById("spareGrossTotal").value = (+totAmount - +dis);
         //	    	document.getElementById("wholeTotal").value = (+totAmount - +dis);
         	  }
         	    
          	   var spareGrossTotal = document.getElementById("spareGrossTotal").value;
         	   var grossTotal = document.getElementById("grossTotal").value;
               var grossTotalOil = document.getElementById("grossTotalOil").value;
               if(grossTotal == "" || grossTotal == null || grossTotal == undefined){
            	   grossTotal=0;
               }
               if(grossTotalOil == "" || grossTotalOil == null || grossTotalOil == undefined){
            	   grossTotalOil=0;
               }
               GrandGrossTotalOil =Number(spareGrossTotal) + Number(grossTotal) + Number(grossTotalOil);
       			document.getElementById("wholeTotal").value =GrandGrossTotalOil; 
         	    
         	   updateNewData();
//         	   deleteNewData();
                /*var totalAmount = document.getElementById("spareGrossTotal").value;
                var ServicetotalAmount1 = document.getElementById("ServicetotalAmount").value;
                 GrandGrossTotal =Number(totalAmount) + Number(ServicetotalAmount1);
        		document.getElementById("grossTotal").value =GrandGrossTotal; 
        		*/
               /* var totAmount = Math.round(Total);
         	    var dis = document.getElementById("discount").value;
         	    if(dis != "0"){
         	    	document.getElementById("grossTotal").value = totAmount;
         	    }
         	    else
         	    {
         	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
         	    }*/
        	},
       
		pager: "#jqGridPager",
		
	});
	  
/*	  if(count==0 || count==null)
		{
			  $("#list4").addRowData(i,jsonData[i]);
			  //$("#jqGrid").addRowData(0,jsonData.offer);
		}
*/		
	
	$("#list4").addRowData(i+1,jsonData[i]);
	  //$("#list4").addRowData(i,jsonData[i]);
	 //
 
	 $('#list4').navGrid('#jqGridPager',
                
                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
                
                {
                    editCaption: "The Edit Dialog",
                   
                    afterSubmit: function() {
                		$('#list4').trigger( 'reloadGrid' );
					},
					
					 recreateForm: true,
					 checkOnUpdate : true,
					 checkOnSubmit : true,
	                 closeAfterEdit: true,
					
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                
                {
                	afterSubmit: function() {
                		$('#list4').trigger( 'reloadGrid' );
					},
                    closeAfterAdd: true,
                    recreateForm: true,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                
                {
                	closeAfterdel:true,
                	checkOnUpdate : true,
					checkOnSubmit : true,
					recreateForm: true,
                	
					
					afterSubmit : function()
					{
				    	var rowId =$("#list4").jqGrid('getGridParam','selrow');  
                    	var rowData = jQuery("#list4").getRowData(rowId);
                    	var quantity = rowData['quantity'];
                    	var salePrice = rowData['salePrice'];
                        var pkTempId = rowData['pk_temp_id'];
                	
                        deleteNewData(pkTempId);
					},
					
					afterComplete: function () {
                		
	                	
	                    	//var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	                    	//var rowData = jQuery("#list4").getRowData(rowId);
	                    	/*var quantity = rowData['quantity'];
	                    	var salePrice = rowData['salePrice'];*/
	                        //pk_temp_id = rowData['pk_temp_id'];
	                        
                	
                    
                		var rowId =$("#list4").jqGrid('getGridParam','selrow');  
                        var rowData = jQuery("#list4").getRowData(rowId);
                     	var quantity = rowData['quantity'];
                     	var salePrice = rowData['salePrice'];
                     	pk_temp_id = rowData['pk_temp_id'];
                     	var gst = rowData['vat'];
                    	var igst = rowData['igst'];
                    	var discount = rowData['discountGrid'];
                     	var discountAmt = rowData['discountAmt'];
                    	
                    	var vatAmt = 0;
                    	var totAmt = 0;
                    	var buyPriceExTax = rowData['buyPriceExTax'];
                    	var discount1 = 0;
                    	var finaltota = 0;
                    	var BPExTax = 0;
                    	var taxAmount=0;
                    	
                    	/*if(gst != "")
            			{
            				var IDecs = /^[0-9]+$/;
            				if(gst.match(IDecs))
            				{
            					(gst > Number(0))
            					{
            					
            					}

            				}
            			else{
            				var abc ="0";
            				var pqr ="0"
            				alert(" Please Enter GST Number OR IGST Number ");
            				$("#list4").jqGrid("setCell",rowId, "igst", abc);

            				$("#list4").jqGrid("setCell",rowId, "gst", abc);
            				$("#list4").jqGrid("setCell",rowId, "taxAmount", pqr);
            				return false;
            				}
            			
            			}*/
                    	
                    	/*if(igst != "")
            			{
            				var IDecs1 = /^[0-9]+$/;
            				if(igst.match(IDecs1))
            				{
            					(igst > Number(0))
            					{
            					
            					}

            				}
            			else{
            				var abc ="0";
            				var pqr ="0"
            				alert(" Please Enter GST Number OR IGST Number ");
            				$("#list4").jqGrid("setCell",rowId, "igst", abc);

            				$("#list4").jqGrid("setCell",rowId, "gst", abc);
            				$("#list4").jqGrid("setCell",rowId, "taxAmount", pqr);
            				return false;
            				}
            			
            			}*/
                    	/*
                    	if(igst >0 && gst > 0 )
            			{
            			var abc ="0";
            			alert(" Please Enter GST Number OR IGST Number");
            			$("#list4").jqGrid("setCell",rowId, "igst", abc);

            			$("#list4").jqGrid("setCell",rowId, "gst", abc);
            			return false;
            			}*/
                    	
                    	
                    	//tota = quantity * salePrice;
                    	totAmt = quantity * salePrice;
                    	$("#list4").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
                    	
                    	/*var totalIncDisc= (tota*(discount/100));
                    	var finalTotal= totAmt-totalIncDisc;
                    	$("#list4").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
                     
                    	*/
                     
                    	/*if(gst != "0")
                    	{
                    		vatAmt =  ((tota*gst)/100);
                    		totAmt = +tota + +vatAmt;
                    	}
                    	if(igst != "0")
                    	{
                    		vatAmt =  ((tota*igst)/100);
                    		totAmt = +tota + +vatAmt;
                    	}*/
                    	
                    	if(igst ==null || igst==0 || igst==""){
                    		
                        	
                        	//var calculateVatTotal = (gst / 100)*finalTotal;
                        	//var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                    		BPExTax=totAmt/(1+(gst/100));
                    		taxAmount=totAmt-BPExTax;
                    		
                        	
                        	}
                        	else if(igst !=null || igst!=0|| igst!=""){
                        		
                        		//var calculateVatTotal = (igst / 100)*finalTotal;
                            	//var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                        		BPExTax=totAmt/(1+(igst/100));
                        		taxAmount=totAmt-BPExTax;
                        		
                            	
                        	}
                    	
                    	if(discount != "0"){
                    		discount1 = (BPExTax*(discount/100));
                    		finaltota = +BPExTax - +discount1;
                    		//totAmt = +tota;
                    	}
                    	else
                    		{
                    		discount1 = (BPExTax*(discount/100));
                    		finaltota = +BPExTax - +discount1;
                    		
                    		}
                    	
                    	$("#list4").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
                    	$("#list4").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
                    	$("#list4").jqGrid("setCell", rowId, "taxAmount", taxAmount.toFixed(2));
                     	$("#list4").jqGrid("setCell", rowId, "total", totAmt.toFixed(2));
                     	var Total = 0;
                    	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
            			var allRowsInGrid1 = $('#list4').getGridParam('data');
            			var AllRows=JSON.stringify(allRowsInGrid1);
                        for (var k = 0; k < count; k++) 
                        {
                    	var Total1 = allRowsInGrid1[k].total;
                    	if(Total1 != undefined)
                    	{
                    		Total = +Total + +Total1;
                    	}
                        }

                        document.getElementById("totalAmount").value = Math.round(Total);
                        
                        var totAmount = Math.round(Total);
                 	    var dis = document.getElementById("discount").value;
                 	    if(dis != "0"){
                 	    	document.getElementById("spareGrossTotal").value = totAmount;
                 	  //  	document.getElementById("wholeTotal").value = totAmount;
                 	    }
                 	    else{
                 	    	document.getElementById("spareGrossTotal").value = (+totAmount - +dis);
                 	    //	document.getElementById("wholeTotal").value = (+totAmount - +dis);
                 	    }
                 	    
                 	   var spareGrossTotal = document.getElementById("spareGrossTotal").value;
                 	   var grossTotal = document.getElementById("grossTotal").value;
                       var grossTotalOil = document.getElementById("grossTotalOil").value;
                       if(grossTotal == "" || grossTotal == null || grossTotal == undefined){
                    	   grossTotal=0;
                       }
                       if(grossTotalOil == "" || grossTotalOil == null || grossTotalOil == undefined){
                    	   grossTotalOil=0;
                       }
                       GrandGrossTotalOil =Number(spareGrossTotal) + Number(grossTotal) + Number(grossTotalOil);
               			document.getElementById("wholeTotal").value =GrandGrossTotalOil; 
                 	    
                 	    
                           /* var totAmount = Math.round(Total);
                     	    var dis = document.getElementById("discount").value;
                     	    if(dis != "0"){
                     	    	document.getElementById("grossTotal").value = totAmount;
                     	    }
                     	    else
                     	    {
                     	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
                     	    }*/
                    	},
						
					reloadAftersubmit:true,	
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                		
                });
	 
	 
		   });
		
		})
    

}



////////////getting service for grid//////////+++++++++++++++++++++++++

function getproductgrid1(){ 

	var productIdService = document.getElementById("productIdService").value;
	/*var splitText = value.split(" => ");
	var productId1 = splitText[0];
	*/
	
	var params= {};
	
	params["productIdService"]=productIdService;
	params["methodName"] ="fetchprodService";
	
	document.getElementById('productIdService').value = null;
	var count=0;
	var newrow;
	var rowId;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	    	{
		 var jsonData = $.parseJSON(data);
		 var result = data.length;

		 if(result <= "20"){
			 alert("Stock NOT AVAILABLE !!!");
			 return true;
		 }
		 
	     $.each(jsonData,function(i,v)
			{
	         count = jQuery("#list5").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#list5").jqGrid('getGridParam','data');
		     var ids = jQuery("#list5").jqGrid('getDataIDs');
		     
			  var prodName,com,bar;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].categoryName;
				  bar = rowdata[j].barcodeNo;
				 var rowId = ids[j];
				 var rowData = jQuery('#list5').jqGrid ('getRowData', rowId);
				
				if (prodName == jsonData.offer.itemName && com == jsonData.offer.categoryName && bar == jsonData.offer.barcodeNo) {
			    	
			    	newrow=false;
					alert("Item Already Inserted !!!");
					var grid = jQuery("#list5");
				    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
				}
			 }
			  
			  if(newrow == true)
				 {
					
				  //$("#list4").addRowData(i,jsonData[i]);
				  $("#list5").addRowData(count,jsonData.offer);
					
				 }
		
		
		$("#list5").jqGrid({
			datatype: "local",
			
			colNames:['pk_temp_id','item_id','ItemName','HSN/SAC','Quantity','SalePrice',"Total SP","SPExTax","SPIncTax",'GST%','IGST%','Tax Amt','Discount','DiscountAmt','Total Amt'],
			colModel:[ 
			          
			          
                 {
	                name:'pk_temp_id',
	                hidden:true,
                 },    
			     {
			    	 name:'item_id',
			    	 hidden:true,
			     },
			    
			 	
			           
			    {	name:'itemName',
			    	 width:170,
					
				},
				 {	name:'hsnSacNo',
			    	 width:100,
					
				},
				
				{	name:'quantity',
					width:70,
					editable: true
					
				},
				
				{	name:'salePrice',
					width:100,
					editable: true
					
				},
				
				{
		        	   name: "TotalQuan",
		        	   width: 150,
		        	   //editable: true,
		        	 
		           },
		           
		           {
		        	   name: "buyPriceExTax",
		        	   width: 150,
		        	   //editable: true,
		        	 
		           },
		           
		           {
		        	   name: "buyPriceIncxTax",
		        	   width: 150,
		        	   //hidden:true,
		        	   //editable: true,
		        	 
		           },

				
				
				
				{	name:'vat',
					width:80,
					editable: true
				},
				{	name:'igst',
					width:80,
					editable: true
				},
				{	name:'taxAmount',
					width:150,
					//formatter: 'number',
				},
				
				{	name:'discountGrid',
					width:100,
					//editable: true
					hidden:true
					
				},
				
				{	name:'discountAmt',
					width:100,
					hidden:true
					
					
				},
				{	name:'total',
					width:150,
					formatter: 'number',
				//	formatter: sumFmatter
					
				},
				
			],
				
			
			sortorder : 'desc',
			loadonce: false,
			viewrecords: true,
			width: 1250,
           // height: 200,
           // rowheight: 300,
			shrinkToFit: true,
            hoverrows: true,
	        rownumbers: true,
            rowNum: 10,
            'cellEdit':true,
	           afterSaveCell: function () {
	        	   // $(this).trigger('reloadGrid');
	        	var rowId =$("#list5").jqGrid('getGridParam','selrow');  
                var rowData = jQuery("#list5").getRowData(rowId);
             	var quantity = rowData['quantity'];
             	var salePrice = rowData['salePrice'];
             	var discount = rowData['discountGrid'];
             	var discountAmt = rowData['discountAmt'];
             	var gst = rowData['vat'];
            	var igst = rowData['igst'];

            	var vatAmt = 0;
            	var totAmt = 0;
            	var buyPriceExTax = rowData['buyPriceExTax'];
            	var discount1 = 0;
            	var finaltota = 0;
            	var BPExTax = 0;
            	var taxAmount=0;
            	var BpIncTax=0;
            	var BPIncTaxFinal=0;
            	
            	if(gst != "")
				{
					var IDecs = /^[0-9]+$/;
					if(gst.match(IDecs))
					{
						(gst > Number(0))
						{
						
						}

					}
				else{
					var abc ="0";
					var pqr ="0"
					alert(" Please Enter GST Number OR IGST Number ");
					$("#list5").jqGrid("setCell",rowId, "igst", abc);

					$("#list5").jqGrid("setCell",rowId, "gst", abc);
					$("#list5").jqGrid("setCell",rowId, "taxAmount", pqr);
					return false;
					}
				
				}
            	
            	if(igst != "")
				{
					var IDecs1 = /^[0-9]+$/;
					if(igst.match(IDecs1))
					{
						(igst > Number(0))
						{
						
						}

					}
				else{
					var abc ="0";
					var pqr ="0"
					alert(" Please Enter GST Number OR IGST Number ");
					$("#list5").jqGrid("setCell",rowId, "igst", abc);

					$("#list5").jqGrid("setCell",rowId, "gst", abc);
					$("#list5").jqGrid("setCell",rowId, "taxAmount", pqr);
					return false;
					}
				
				}
            	
            	if(igst >0 && gst > 0 )
				{
				var abc ="0";
				alert(" Please Enter GST Number OR IGST Number");
				$("#list5").jqGrid("setCell",rowId, "igst", abc);

				$("#list5").jqGrid("setCell",rowId, "gst", abc);
				return false;
				}
            	//tota = quantity * salePrice;
            	totAmt = quantity * salePrice;
            	$("#list5").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
            	 
            	/*var totalIncDisc= (tota*(discount/100));
            	var finalTotal= totAmt-totalIncDisc;
            	$("#list5").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
             */
            	/*if(gst != "0"){
            		//vatAmt =  ((totalIncDisc*gst)/100);
            		vatAmt = (gst / 100)*totalIncDisc;
            		totAmt = +totalIncDisc + +vatAmt;
            	}
            	if(igst != "0"){
            		vatAmt =  ((totalIncDisc*igst)/100);
            		totAmt = +totalIncDisc + +vatAmt;
            	}*/
            	
            	if(igst ==null || igst==0 || igst==""){
            		
                	
            		BPExTax=totAmt/(1+(gst/100));
            		var totalWithVatAmtTot= Math.round(BPExTax * 100.0) / 100.0;
            		taxAmount=totAmt-BPExTax;
            		BpIncTax=((totAmt*(gst))/100);
            		BPIncTaxFinal=BpIncTax+totAmt;
            		
                	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
                	}
                	else if(igst !=null || igst!=0|| igst!=""){
                		
                		BPExTax=totAmt/(1+(igst/100));
                		var totalWithVatAmtTot= Math.round(BPExTax * 100.0) / 100.0;
                		taxAmount=totAmt-BPExTax;
                		BpIncTax=((totAmt*(igst))/100);
                		BPIncTaxFinal=BpIncTax+totAmt;
                    	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
                	}
            	

            	if(discount != "0"){
            		discount1 = (BPExTax*(discount/100));l
            		finaltota = +BPExTax - +discount1;
            		//totAmt = +tota;
            	}
            	else
            		{
            		discount1 = (BPExTax*(discount/100));
            		finaltota = +BPExTax - +discount1;
            		
            		}
            	$("#list5").jqGrid("setCell", rowId, "buyPriceExTax", totalWithVatAmtTot.toFixed(2));
            	$("#list5").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
            	$("#list5").jqGrid("setCell", rowId, "buyPriceIncxTax", BPIncTaxFinal.toFixed(2));
            	$("#list5").jqGrid("setCell", rowId, "taxAmount", BpIncTax.toFixed(2));
             	$("#list5").jqGrid("setCell", rowId, "total", BPIncTaxFinal.toFixed(2));
		
             	var Total = 0;
            	var count = jQuery("#list5").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#list5').getGridParam('data');
				var AllRows=JSON.stringify(allRowsInGrid1);
				
				
                for (var k = 0; k < count; k++) 
                {
            	var Total1 = allRowsInGrid1[k].total;
             	
            	if(Total1 != undefined){
            		Total = +Total + +Total1;
            	}
                }
                    document.getElementById("ServicetotalAmount").value = Math.round(Total);
                    
              //      document.getElementById("grossTotal").value = Math.round(Total);
                   
                    var totAmount = Math.round(Total);
             	    var dis = document.getElementById("discountservice").value;
             	    if(dis != "0"){
             	    	document.getElementById("grossTotal").value = totAmount;
             	    }
             	    else{
             	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
             	    }
             	   var spareGrossTotal = document.getElementById("spareGrossTotal").value;
             	   var grossTotal = document.getElementById("grossTotal").value;
                   var grossTotalOil = document.getElementById("grossTotalOil").value;
                   
                   if(grossTotal =="" || grossTotal == null || grossTotal==undefined){
                	   grossTotal=0;
                   }
                   if(grossTotalOil =="" || grossTotalOil == null || grossTotalOil==undefined){
                	   grossTotalOil=0;
                   }
                   GrandGrossTotalOil =Number(spareGrossTotal) + Number(grossTotal) + Number(grossTotalOil);
           		document.getElementById("wholeTotal").value =GrandGrossTotalOil; 
        
                    
                    
                    /* var totalAmount = document.getElementById("spareGrossTotal").value;
                    var ServicetotalAmount1 = document.getElementById("ServicetotalAmount").value;
                     GrandGrossTotal =Number(totalAmount) + Number(ServicetotalAmount1);
            		document.getElementById("grossTotal").value =GrandGrossTotal;*/ 
                    //document.getElementById("ServicetotalAmount").value = Math.round(Total);
                   
                  /*  var totAmount = Math.round(Total);
             	    var dis = document.getElementById("discount").value;
             	    if(dis != "0"){
             	    	document.getElementById("grossTotal").value = totAmount;
             	    }
             	    else{
             	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
             	    }
             	*/
	        	},
           
			pager: "#jqGridPager5",
			
			
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#list5").addRowData(0,jsonData.offer);
		}
		 $('#list5').navGrid('#jqGridPager5',
	                
	                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
	                
	                {
	                    editCaption: "The Edit Dialog",
	                    afterSubmit: function() {
	                		$('#list5').trigger( 'reloadGrid' );
						},
						
						 recreateForm: true,
						 checkOnUpdate : true,
						 checkOnSubmit : true,
		                 closeAfterEdit: true,
						
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	afterSubmit: function() {
	                		$('#list5').trigger( 'reloadGrid' );
						},
	                    closeAfterAdd: true,
	                    recreateForm: true,
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                },
	                
	                {
	                	closeAfterdel:true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
	                	afterComplete: function () {
	                		
		                	
	                    	//var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	                    	//var rowData = jQuery("#list4").getRowData(rowId);
	                    	/*var quantity = rowData['quantity'];
	                    	var salePrice = rowData['salePrice'];*/
	                        //pk_temp_id = rowData['pk_temp_id'];
	                        
	                		var rowId =$("#list5").jqGrid('getGridParam','selrow');  
	                        var rowData = jQuery("#list5").getRowData(rowId);
	                     	var quantity = rowData['quantity'];
	                     	var salePrice = rowData['salePrice'];
	                     	var discount = rowData['discountGrid'];
	                     	var discountAmt = rowData['discountAmt'];
	                     	var gst = rowData['vat'];
	                    	var igst = rowData['igst'];

	                    	var vatAmt = 0;
	                    	var totAmt = 0;
	                    	var buyPriceExTax = rowData['buyPriceExTax'];
	                    	var discount1 = 0;
	                    	var finaltota = 0;
	                    	var BPExTax = 0;
	                    	var taxAmount=0;


	                    	var BpIncTax=0;
	                    	        	var BPIncTaxFinal=0;
	                    	/*
	                    	if(gst != "")
	        				{
	        					var IDecs = /^[0-9]+$/;
	        					if(gst.match(IDecs))
	        					{
	        						(gst > Number(0))
	        						{
	        						
	        						}

	        					}
	        				else{
	        					var abc ="0";
	        					var pqr ="0"
	        					alert(" Please Enter GST Number OR IGST Number ");
	        					$("#list5").jqGrid("setCell",rowId, "igst", abc);

	        					$("#list5").jqGrid("setCell",rowId, "gst", abc);
	        					$("#list5").jqGrid("setCell",rowId, "taxAmount", pqr);
	        					return false;
	        					}
	        				
	        				}*/
	                    	
	                    	/*if(igst != "")
	        				{
	        					var IDecs1 = /^[0-9]+$/;
	        					if(igst.match(IDecs1))
	        					{
	        						(igst > Number(0))
	        						{
	        						
	        						}

	        					}
	        				else{
	        					var abc ="0";
	        					var pqr ="0"
	        					alert(" Please Enter GST Number OR IGST Number ");
	        					$("#list5").jqGrid("setCell",rowId, "igst", abc);

	        					$("#list5").jqGrid("setCell",rowId, "gst", abc);
	        					$("#list5").jqGrid("setCell",rowId, "taxAmount", pqr);
	        					return false;
	        					}
	        				
	        				}*/
	                    	
	                    	/*if(igst >0 && gst > 0 )
	        				{
	        				var abc ="0";
	        				alert(" Please Enter GST Number OR IGST Number");
	        				$("#list5").jqGrid("setCell",rowId, "igst", abc);

	        				$("#list5").jqGrid("setCell",rowId, "gst", abc);
	        				return false;
	        				}*/
	                    	
	                    	//tota = quantity * salePrice;
	                    	totAmt = quantity * salePrice;
	                    	$("#list5").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
	                    	 
	                    	/*var totalIncDisc= (tota*(discount/100));
	                    	var finalTotal= totAmt-totalIncDisc;
	                    	$("#list5").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
	                     */
	                    	/*if(gst != "0"){
	                    		//vatAmt =  ((totalIncDisc*gst)/100);
	                    		vatAmt = (gst / 100)*totalIncDisc;
	                    		totAmt = +totalIncDisc + +vatAmt;
	                    	}
	                    	if(igst != "0"){
	                    		vatAmt =  ((totalIncDisc*igst)/100);
	                    		totAmt = +totalIncDisc + +vatAmt;
	                    	}*/
	                    	
	                    	if(igst ==null || igst==0 || igst==""){
	                    		
	                        	
	                    		BPExTax=totAmt/(1+(gst/100));
	                    		taxAmount=totAmt-BPExTax;
	                    		BpIncTax=((totAmt*(gst))/100);
	                    		BPIncTaxFinal=BpIncTax+totAmt;
	                        	
	                    		
	                        	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
	                        	}
	                        	else if(igst !=null || igst!=0|| igst!=""){
	                        		
	                        		BPExTax=totAmt/(1+(igst/100));
	                        		taxAmount=totAmt-BPExTax;
	                        		BpIncTax=((totAmt*(igst))/100);
	                        		BPIncTaxFinal=BpIncTax+totAmt;
	                            	
	                            	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
	                        	}
	                    	

	                    	if(discount != "0"){
	                    		discount1 = (BPExTax*(discount/100));
	                    		finaltota = +BPExTax - +discount1;
	                    		//totAmt = +tota;
	                    	}
	                    	else
	                    		{
	                    		discount1 = (BPExTax*(discount/100));
	                    		finaltota = +BPExTax - +discount1;
	                    		
	                    		}
	                    	$("#list5").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
	                    	$("#list5").jqGrid("setCell", rowId, "buyPriceIncxTax", BPIncTaxFinal.toFixed(2));
	                    	$("#list5").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
	                    	$("#list5").jqGrid("setCell", rowId, "taxAmount", BpIncTax.toFixed(2));
	                     	$("#list5").jqGrid("setCell", rowId, "total", BPIncTaxFinal.toFixed(2));
	        		
	                     	var Total = 0;
	                    	var count = jQuery("#list5").jqGrid('getGridParam', 'records');
	        				var allRowsInGrid1 = $('#list5').getGridParam('data');
	        				var AllRows=JSON.stringify(allRowsInGrid1);
	        				
	        				
	                        for (var k = 0; k < count; k++) 
	                        {
	                    	var Total1 = allRowsInGrid1[k].total;
	                     	
	                    	if(Total1 != undefined){
	                    		Total = +Total + +Total1;
	                    	}
	                        }
	                //        document.getElementById("ServicetotalAmount").value = Math.round(Total);
	                        
	               //         document.getElementById("grossTotal").value = Math.round(Total);
	                  
	                        
	                        //      document.getElementById("grossTotal").value = Math.round(Total);
	                        	
	                        document.getElementById("ServicetotalAmount").value = Math.round(Total);
	                        
	                              var totAmount = Math.round(Total);
	                       	    var dis = document.getElementById("discountservice").value;
	                       	    if(dis != "0"){
	                       	    	document.getElementById("grossTotal").value = totAmount;
	                       	    }
	                       	    else{
	                       	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
	                       	    }
	                       	   var spareGrossTotal = document.getElementById("spareGrossTotal").value;
	                       	   var grossTotal = document.getElementById("grossTotal").value;
	                             var grossTotalOil = document.getElementById("grossTotalOil").value;
	                             if(grossTotal =="" || grossTotal == null || grossTotal==undefined){
	                          	   grossTotal=0;
	                             }
	                             if(grossTotalOil =="" || grossTotalOil == null || grossTotalOil==undefined){
	                          	   grossTotalOil=0;
	                             }
	                             GrandGrossTotalOil =Number(spareGrossTotal) + Number(grossTotal) + Number(grossTotalOil);
	                     		document.getElementById("wholeTotal").value =GrandGrossTotalOil; 
	                     		
	                        /*var totalAmount = document.getElementById("totalAmount").value;
	                            var ServicetotalAmount1 = document.getElementById("ServicetotalAmount").value;
	                             GrandGrossTotal =Number(totalAmount) + Number(ServicetotalAmount1);
	                    		document.getElementById("grossTotal").value =GrandGrossTotal; */
	                            //document.getElementById("ServicetotalAmount").value = Math.round(Total);
	                            
	                          /*  var totAmount = Math.round(Total);
	                     	    var dis = document.getElementById("discount").value;
	                     	    if(dis != "0"){
	                     	    	document.getElementById("grossTotal").value = totAmount;
	                     	    }
	                     	    else{
	                     	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
	                     	    }
	                     	*/
	        	        	},
						
						reloadAftersubmit:true,	
	                    errorTextFormat: function (data) {
	                        return 'Error: ' + data.responseText
	                    }
	                		
	                });
		 
		 
			   });
			
			})
	    

	}

/////////service billing saving in database//////

function resBillService() {
	document.getElementById("btnSubmit").disabled = true; 
	var params= {};
	
	    var contactNo = $('#contactNo').val();
	    var ownerName=$('#ownerName').val();
	    var carNo=$('#carNo').val();
	   var totalAmount=$('#totalAmount').val();
	   var carID=$('#carID').val();
	    var grossTotal=$('#grossTotal').val();
	   var wholeTotal=$('#wholeTotal').val();
		 var bill = $('#bill').val();
	   
		//var params= {};
			var count1 = jQuery("#list5").jqGrid('getGridParam', 'records');
			var allRowsInGrid1 = $('#list5').getGridParam('data');
			var AllRows=JSON.stringify(allRowsInGrid1);
			for (var i = 0; i < count1; i++) 
			{
			
				var itemName1 = allRowsInGrid1[i].itemName;
				if(itemName1=="" || itemName1==null || itemName1==undefined){
					itemName1="NA";
				}
				params["itemName1"+i] = itemName1;
				
				var quantity1 = allRowsInGrid1[i].quantity;
				if(quantity1=="" || quantity1==null || quantity1==undefined){
					quantity1=0;
				}
				params["quantity1"+i] = quantity1;
				
				var salePrice1 = allRowsInGrid1[i].salePrice;
				if(salePrice1=="" || salePrice1==null || salePrice1==undefined){
					salePrice1=0;
				}
				params["salePrice1"+i] = salePrice1;
				
				var total1 = allRowsInGrid1[i].total;
				if(total1=="" || total1==null || total1==undefined){
					total1=0;
				}
				params["total1"+i] = total1;
				
				var hsnSacNo1 = allRowsInGrid1[i].hsnSacNo;
				if(hsnSacNo1=="" || hsnSacNo1==null || hsnSacNo1==undefined){
					hsnSacNo1=0;
				}
				params["hsnSacNo1"+i] = hsnSacNo1;
				
				var vat1 = allRowsInGrid1[i].vat;
				if(vat1=="" || vat1==null || vat1==undefined){
					vat1=0;
				}
				params["vat1"+i] = vat1;
				
				var igst1 = allRowsInGrid1[i].igst;
				if(igst1=="" || igst1==null || igst1==undefined){
					igst1=0;
				}
				params["igst1"+i] = igst1;
				
				var taxAmount1 = allRowsInGrid1[i].taxAmount;
				if(taxAmount1=="" || taxAmount1==null || taxAmount1==undefined){
					taxAmount1=0;
				}
				params["taxAmount1"+i] = taxAmount1;
				
				var discountGrid1 = allRowsInGrid1[i].discountGrid;
				if(discountGrid1=="" || discountGrid1==null || discountGrid1==undefined){
					discountGrid1=0;
				}
				params["discountGrid1"+i] = discountGrid1;
				
				var discountAmt1 = allRowsInGrid1[i].discountAmt;
				if(discountAmt1=="" || discountAmt1==null || discountAmt1==undefined){
					discountAmt1=0;
				}
				params["discountAmt1"+i] = discountAmt1;
				
				var TotalQuan = allRowsInGrid1[i].TotalQuan;
				if(TotalQuan=="" || TotalQuan==null || TotalQuan==undefined){
					TotalQuan=0;
				}
		  		params["TotalQuan"+i] = TotalQuan;
		  		
		  		var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
		  		if(buyPriceExTax == "" || buyPriceExTax == null || buyPriceExTax == undefined){
		  			buyPriceExTax = 0;
		  		}
		  		
		  		params["buyPriceExTax"+i] = buyPriceExTax;
		  	
				
				
			  }
			
			 var serdescription=$('#serdescription').val();
			 if(serdescription=="" || serdescription==null || serdescription==undefined){
				 serdescription="NA";
			 }
			 
			 var ServicetotalAmount=$('#ServicetotalAmount').val();
			 if(ServicetotalAmount=="" || ServicetotalAmount==null || ServicetotalAmount==undefined){
				 ServicetotalAmount=0;
			 }
			 
			 var discountservice = $('#discountservice').val();
			 if(discountservice == "" || discountservice == null || discountservice == undefined){
				 discountservice = 0;
			 }
			 
			 
			 params["count1"] = count1;
				//alert("count second++++  " +count1)
			params["ServicetotalAmount"] = ServicetotalAmount;
			params["discountservice"] = discountservice;
			params["serdescription"] = serdescription;
	    params["bill"] = bill;
//
		params["contactNo"] = contactNo;
		params["ownerName"] = ownerName;
		
		
		params["carNo"] = carNo;
		params["totalAmount"] = totalAmount;
		
		params["grossTotal"] = grossTotal;
		params["carID"] = carID;
		params["wholeTotal"] = wholeTotal;
		
		//
		
	
		params["methodName"] = "registerBillService";
		
		$.post('/SMT/jsp/utility/controller.jsp', params,
				function(data) {
					alert(data);
					//window.open("Car_bill_PDF.jsp");
					window.open("BillingPdfNew.jsp");
					location.reload(true);
					
				}).error(function(jqXHR, textStatus, errorThrown) {
			if (textStatus === "timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
		
		
	
}






///update method code - --------------	-----


function updateNewData(){
	

	var params= {};
		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		var allRowsInGrid1 = $('#list4').getGridParam('data');
		var AllRows=JSON.stringify(allRowsInGrid1);
		for (var i = 0; i < count; i++)
		
		{
		
			var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
			params["pk_temp_id"+i] = pk_temp_id;
			
			var item_id = allRowsInGrid1[i].item_id;
	     	params["item_id"+i] = item_id;
	     	

			var itemName = allRowsInGrid1[i].itemName;
			
			params["itemName"+i] = itemName;
			
			var quantity = allRowsInGrid1[i].quantity;
			params["quantity"+i] = quantity;
		
			var stock = allRowsInGrid1[i].stock;
			
			/*if(+quantity > +stock){
				alert("stock not available");
				return false;
			}*/
			
			params["salePrice"+i] = salePrice;
			
			var salePrice = allRowsInGrid1[i].salePrice;
			params["salePrice"+i] = salePrice;
			
			var total = allRowsInGrid1[i].total;
			params["total"+i] = total;
			

	          var TotalQuan = allRowsInGrid1[i].TotalQuan;
	  		params["TotalQuan"+i] = TotalQuan;
	  		
			
	  		var vat = allRowsInGrid1[i].vat;
			params["vat"+i] = vat;
			
			var igst = allRowsInGrid1[i].igst;
			params["igst"+i] = igst;
			
			var taxAmount = allRowsInGrid1[i].taxAmount;
			params["taxAmount"+i] = taxAmount;
			
			
			var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
			params["buyPriceExTax"+i] = buyPriceExTax;
			
	
	params["count"] = count;
	  
		params["methodName"] = "updateGridDatanw";
		
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		    	{  
			
			   return true;
				    }
		    	).error(function(jqXHR, textStatus, errorThrown){
		    		if(textStatus==="timeout") {
		    			$(loaderObj).hide();
		    			$(loaderObj).find('#errorDiv').show();
		    		}
		    	});
		
		}
}


//delete

function deleteNewData(pkTempId){
	

	var params= {};
		var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		var rowId = $("#list4").jqGrid('getGridParam','selrow');
		var ids = jQuery("#list4").jqGrid('getDataIDs');
		var allRowsInGrid1 = $('#list4').getGridParam('data');
		var AllRows=JSON.stringify(allRowsInGrid1);
		var rowData = jQuery("#list4").getRowData(rowId);
		var pkTempId = rowData['pk_temp_id'];
		
		
		
/*		for (var i = 0; i < count; i++)
		
		{
*/		
//			var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
//			params["pk_temp_id"+i] = pk_temp_id;
//			alert(pk_temp_id);
/*			var item_id = allRowsInGrid1[i].item_id;
	     	params["item_id"+i] = item_id;
	     	

			var itemName = allRowsInGrid1[i].itemName;
			
			params["itemName"+i] = itemName;
			
			var quantity = allRowsInGrid1[i].quantity;
			params["quantity"+i] = quantity;
		
			var salePrice = allRowsInGrid1[i].salePrice;
			params["salePrice"+i] = salePrice;
			
			var total = allRowsInGrid1[i].total;
			params["total"+i] = total;
			

	          var TotalQuan = allRowsInGrid1[i].TotalQuan;
	  		params["TotalQuan"+i] = TotalQuan;
	  		
			
	  		var vat = allRowsInGrid1[i].vat;
			params["vat"+i] = vat;
			
			var igst = allRowsInGrid1[i].igst;
			params["igst"+i] = igst;
			
			var taxAmount = allRowsInGrid1[i].taxAmount;
			params["taxAmount"+i] = taxAmount;
			
			
			var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
			params["buyPriceExTax"+i] = buyPriceExTax;*/
			
	/////
//	params["count"] = count;
	params["pkTempId"] = pkTempId;
//	alert(pkTempId);
	params["methodName"] = "deleteGridDatanw";
		
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		    	{  
			
			   return false;
				    }
		    	).error(function(jqXHR, textStatus, errorThrown){
		    		if(textStatus==="timeout") {
		    			$(loaderObj).hide();
		    			$(loaderObj).find('#errorDiv').show();
		    		}//
		    	});
		
		}
//}

