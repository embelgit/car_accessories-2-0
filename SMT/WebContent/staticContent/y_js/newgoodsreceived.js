/*
 * Date: 29-06-17
 * name: Meghraj Menkudle
 * fucntion Name : validateRegGoodReceive()
 * perpose : Validate the data which is comes form purchase recevied form

*/

function validateRegGoodReceive(){
	
 			var billNo= $('#billNo').val();
 			var supplierId= $('#supplierId').val();
 			var contactPerson= $('#contactPerson').val();
 			var pDate= $('#pDate').val();
 			var expence= $('#expence').val();
 			var totalAmount= $('#resolution').val();
 			
 			var contactPersonNamePattern = /^[a-zA-Z ]{2,50}$/;
 			var contactPersonNamePatternRes = contactPersonNamePattern.test(contactPerson);
 			
 			//var billNoPattern = /^[0-9/]+$/;
 			//var billNoPatternRes = billNoPattern.test(billNo);
 			
 			var expencePattern = /^\d+$/;
 			var expencePatternRes = expencePattern.test(expence);
 			
 			 if(billNo != null && billNo != "" && billNo != " ")
				{
				
					 if(supplierId != null && supplierId != "" && supplierId != " ")
						{
							 
						 if(contactPerson != null && contactPerson != "" && contactPerson != " ")
							{
							 if(contactPersonNamePatternRes){
								 
								 if(pDate != null && pDate != "" && pDate != " ")
									{
										
										//	 if(totalAmount != null && totalAmount != "" && totalAmount != " " )
										//		{
												 	//If validation is success than controller will go to regGoodReceive()
												 	regGoodReceive();
										//		}
											/* 	else{
											 		alert(" Please select item from item list and modify into table by proper way. Total amount is not dispayed !");
												}*/
									       }
									 	
								 	else{
								 		alert("Please select purchase date !");
									}
							 }
							 else{
								 alert("Enter only Contact person Name without Special Symbols and digit ! name must be in between 2 - 50 character");
							 }
							}
						 	else{
						 		alert("Please Enter Contact person Name !");
							}
						 
						}
					 	else{
					 		alert("Please select supplier name !");
						}
				    }
				
			 	else{
			 		alert("Please Enter Bill Number !");
				}
 			
 			
 		}

function regGoodReceive(){
	document.getElementById("btnSubmit").disabled = true; 
	var params= {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++) {
	
		var itemName = allRowsInGrid1[i].itemName;
     	params["itemName"+i] = itemName;
     	
     	var hsnsacno = allRowsInGrid1[i].hsnsacno;
     	params["hsnsacno"+i] = hsnsacno;
     	
//     	var vat = allRowsInGrid1[i].vat * 2;
     	var vat = allRowsInGrid1[i].vat;
     	params["vat"+i] = vat;
     	
     	var igst = allRowsInGrid1[i].igst;
     	params["igst"+i] = igst;
     	
     	var gstamt = allRowsInGrid1[i].gstamt;
     	params["gstamt"+i] = gstamt;
		
     	var catName = allRowsInGrid1[i].catName;
     	params["catName"+i] = catName;
     	
		var quantity = allRowsInGrid1[i].quantity;
     	params["quantity"+i] = quantity;
     	
     	
		var buyPrice = allRowsInGrid1[i].buyPrice;
		params["buyPrice"+i] = buyPrice;
		
		
		var buyPriceEx = allRowsInGrid1[i].buyPriceEx;
		params["buyPriceEx"+i] = buyPriceEx;
		
		if((buyPrice=="" || buyPrice == null || buyPrice == 0) && (buyPriceEx=="" || buyPriceEx == null || buyPriceEx == 0)){
			alert("please enter buy price or BPETax in grid");
			document.getElementById("btnSubmit").disabled = false; 
			return false;
		}
		
		var TotalQuan = allRowsInGrid1[i].TotalQuan;
		params["TotalQuan"+i] = TotalQuan;
		
		
		var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
		params["buyPriceExTax"+i] = buyPriceExTax;
		
		var salePrice = allRowsInGrid1[i].salePrice;
		params["salePrice"+i] = salePrice; 
		
		if(salePrice=="" || salePrice == undefined || salePrice == null || salePrice == 0){
			alert("please enter sale price in grid");
			document.getElementById("btnSubmit").disabled = false; 
			return false;
		}
		//good good
		if(+salePrice < +buyPrice){
			alert("Please Enter Sale Price greater than Buy Price");
			document.getElementById("btnSubmit").disabled = false; 
			return false;
		}
		
		var discount = allRowsInGrid1[i].discount;
		params["discount"+i] = discount;
		//done
		var actualprice = allRowsInGrid1[i].actualprice;
		if(actualprice == undefined){
			actualprice = 0;
		}
		params["actualprice"+i] = actualprice;
		
		var Total = allRowsInGrid1[i].Total;
		if(Total == undefined){
			Total = 0;
		}
		params["Total"+i] = Total;
		
		
		
	}
	
	
	var input = document.getElementById('supplierId'),
	list = document.getElementById('supplierId_drop'),
	i,supplierId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplierId = list.options[i].getAttribute('data-value');
		}
	}
	
	    var billNo = $('#billNo').val();
	    var contactPerson=$('#contactPerson').val();
	    var vat=$('#vat').val();
	    var pDate = $('#pDate').val();
	    var extraDiscount = $('#extraDiscount').val();
	    if(extraDiscount == ""){
	    	extraDiscount = 0;
	    }
	    var expence=$('#expence').val();
	    if(expence == ""){
	    	expence = 0;
	    }
	    var txPerexpence= $('#txPerexpence').val();
	    if(txPerexpence == ""){
	    	txPerexpence = 0;
	    }
		var finalExpenses= $('#finalExpenses').val();
		if(finalExpenses == ""){
			finalExpenses = 0;
	    }
	    var resolution=$('#resolution').val();
	   
	
		params["billNo"] = billNo;
		params["contactPerson"] = contactPerson;
		params["vat"] = vat;
		
		params["pDate"] = pDate;
		params["count"] = count;
		params["extraDiscount"] = extraDiscount;
		params["expence"] = expence;
		params["txPerexpence"] = txPerexpence;
		params["finalExpenses"] = finalExpenses;
		params["resolution"] = resolution;
		params["supplierId"] = supplierId;
		
		
		params["methodName"] = "regGoodReceive";
		
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		    	{  
			
			    alert(data);
			    location.reload();
			   
				    }
		    	).error(function(jqXHR, textStatus, errorThrown){
		    		if(textStatus==="timeout") {
		    			$(loaderObj).hide();
		    			$(loaderObj).find('#errorDiv').show();
		    		}
		    	});

	
	
	
	
}









function getProductList()
{
	//var itemName = document.getElementById('itemName').value;
	
	var input = document.getElementById('itemName'),
    list = document.getElementById('itemId_drop'),
    i,catName,itemName, hsnsacno;
    for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	catName = list.options[i].getAttribute('data-value');
    	itemName = list.options[i].getAttribute('myvalue');
    	hsnsacno = list.options[i].getAttribute('myvalue1');
    }
   }
	
    itemparams={};
	
	itemparams["itemName"]= itemName;
	itemparams["catName"]= catName;
	itemparams["hsnsacno"]= hsnsacno;
	
	document.getElementById('itemName').value = null;
	var count=0;
	var newrow;
	var rowId;
	itemparams["methodName"] = "getProductInGrid";
	$.post('/SMT/jsp/utility/controller.jsp',itemparams,
			function(data)
			{ 
				var jsonData = $.parseJSON(data);
			
			 count = jQuery("#jqGrid").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#jqGrid").jqGrid('getGridParam','data');
		     var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
			 
			
			  var ori_quantity,offerId;
			  for (var j = 0; j < count; j++) 
			  {
				offerId = rowdata[j].itemName;
				
				 var rowId = ids[j];
				 var rowData = jQuery('#jqGrid').jqGrid ('getRowData', rowId);
				
				if (offerId==jsonData.offer.itemName) {
			    	ori_quantity = +rowdata[j].quantity+1;
			    	alert("Product already entered !");
			//    	$("#jqGrid").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#jqGrid");
			    	grid.trigger("reloadGrid");
			    	newrow=false;
			    	break;
				}
				else
				{
					newrow = true;
				}
			 }
			  
			  if(newrow== true)
				 {
					
					 $("#jqGrid").addRowData(count,jsonData.offer);
					
				 }
			 
			 
				$("#jqGrid").jqGrid({
					datatype:"local",
					editurl: 'clientArray',
					colNames: ["ItemName","Category Name","HSN/SAC","Quantity","BuyPrice","BPETax ","Total BP","BPExTax","BPIncTax","SalePrice","GST %","IGST %","TAX AMT","Discount %","DisAmt","Total","--S--"],

					colModel: [
					           { 	
					        	   name: "itemName",//PARTICULARS
					        	   width:200,
					        	 
					           },
					          
					           {
					        	   name:  "catName",
					        	   width: 170,
					        	   
					           },
					           {
					        	   name:  "hsnsacno",
					        	   width: 120,
					        	   
					           },
					           
					           {
					        	   name:  "quantity",
					        	   width: 100,
					        	   editable: true,
					        	   required:true
					           },

					           {
					        	   name: "buyPrice",
					        	   width: 150,
					        	   editable: true,
					        	 
					           },
					           
					           {
					        	   name: "buyPriceEx",
					        	   width: 150,
					        	   editable: true,
					        	  //background-color:"#eee",
					        	   //color: true
					        	    //style="color: red;"
					        	   //color:"#eee"
					        	   
					        	 
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
					        	   name: "buyPriceIncTax",
					        	   width: 150,
					        	   //editable: true,
					        	 
					           },
					           
					           {
					        	   name: "salePrice",
					        	   width: 150,
					        	   editable: true,
					        	 
					           },

					           { 	
			        	           name: "vat",//PARTICULARS cgst
			        	           width: 100,
			        	           editable: true,
			                    },
			                    /*{ 	
				        	           name: "sgst",//PARTICULARS
				        	           width: 100,
				        	           editable: true,
				                },*/
			                    { 	
				        	           name: "igst",//PARTICULARS
				        	           width: 100,
				        	           editable: true,
				                },
			                    { 	
				        	           name: "gstamt",//PARTICULARS
				        	           width: 140,
				        	           //formatter: calculateGst
				                },
					           {
					        	   name: "discount",
					        	   width: 150,
					        	   //editable: true,
					        	   hidden: true
					        	 
					           },
					           
					           {
					        	   name: "discountAmt",
					        	   width: 150,
					        	   hidden: true
					        	   //editable: true,
					        	 
					           },
					           
					           
					           {
					        	   name: "Total",
					        	   width: 200,
								   formatter: 'number',
								  
					        	//   formatter: calculateTotal
					        	
					           },
					           {
					        	   name: "actualprice",
					        	   width: 100,
					        	   editable: true,
					        	 hidden: true
					           }
					           ],


					           sortorder : 'desc',
					           multiselect: false,	
					           loadonce: false,
					           viewrecords: true,
					           width: 1300,
					           shrinkToFit: true,
							   rowheight: 300,
							  /* footerrow: true,
				               userDataOnFooter: true,
				               grouping: true,*/
							   rownumbers:true,
							 //  onSelectRow: editRow,
					           rowNum: 11,
					           
					           'cellEdit':true,
					           afterSaveCell: function () {
					        	   // $(this).trigger('reloadGrid');
					        	   	var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
					        	   	var rowData = jQuery("#jqGrid").getRowData(rowId);
			                    	var quantity = rowData['quantity'];
			                    	var buyPrice = rowData['buyPrice'];
			                    	var discount = rowData['discount'];
			                    	var gst = rowData['vat'];
			                    	var igst = rowData['igst'];
			                    	//var TotalQuant = rowData['Total'];
			                    	var discAmt=0;
			                    	var buyPriceExTax = rowData['buyPriceExTax'];
			                    	var buyPriceEx = rowData['buyPriceEx'];
			                    	var vatAmt = 0;
			                    	var discount1 = 0;
			                    	var finaltota = 0;
			                    	var totAmt = 0;
			                    	var ctot = 0;
			                    	var BPExTax = 0;
			                    	var BPExTax1 = 0;
			                    	var taxAmount=0;
			                    	var BPIncTax=0;
			                    	
			                    	if(buyPrice != "0" && buyPriceEx ==0){
			                    	//tota = quantity * buyPrice;
			                    	totAmt = quantity * buyPrice;
			                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
			                    	
			                    	/*if(discount != "0"){
			                    		discount1 = (BPExTax*(discount/100));
			                    		finaltota = +BPExTax - +discount1;
			                    		//totAmt = +tota;
			                    	}*/
			                    	
			                    	
			                    	if(gst != "0" && igst ==0){
			                    		
			                    		BPExTax=totAmt/(1+(gst/100));
			                    		taxAmount=totAmt-BPExTax;
			                    		
			                    		
			                    	}
			                    	if(igst != "0" && gst == 0){
			                    		
			                    		BPExTax=totAmt/(1+(igst/100));
			                    		taxAmount=totAmt-BPExTax;
			                    		

			                    	}
			                    	if(gst !=0 && igst !=0){
			                    		alert("please enter either gst or igst");
			                    		var abc = 0;
				                    	$("#jqGrid").jqGrid("setCell", rowId, "vat", abc);
				                    	$("#jqGrid").jqGrid("setCell", rowId, "igst", abc);
				                    	return false;
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
			                    	
			                    	}
			                    	
			                    	$("#jqGrid").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
			                    	$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
			                    	$("#jqGrid").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
			                    	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
			                    	//$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt);
			                    	//buy price ex tax user
			                    				                    		
			                    		if(buyPriceEx != "0" && buyPrice == 0){
			                    		
			                    		
			                    			totAmt = quantity * buyPriceEx;
					                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
			                    		
					                    	if(discount != "0"){
					                    		//discount1 = totAmt-(discount/100);
					                    		//discAmt=totAmt-discount1
					                    		discount1 = ((totAmt*discount)/100);
					                    		tota = +totAmt - +discount1;
					                    		$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
					                    		//finaltota = +BPExTax1 - +discount1;
					                    		//totAmt = +tota;
					                    	}
					                    	else
					                    		{
					                    		//discount1 = totAmt-(discount/100);
					                    		//discAmt=totAmt-discount1
					                    		discount1 = ((totAmt*discount)/100);
					                    		tota = +totAmt - +discount1;
					                    		$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
					                    		//discount1 = (BPExTax1*(discount/100));
					                    		//finaltota = +BPExTax1 - +discount1;
					                    		
					                    		}
			                    		

					                    	if(gst != "0" && igst ==0){
					                    		
					                    		//BPExTax1=(totAmt/(1+(gst/100)));
					                    		//taxAmount=totAmt-BPExTax1;
					                    		//vatAmt =  ((tota*(gst))/100);
					                    		//totAmt = +tota + +vatAmt;
					                    		//taxAmount=(tota*(gst/100));
					                    		taxAmount=((tota*(gst))/100);
					                    		BPIncTax=taxAmount+tota;
					                    		$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
					                    		
					                    		
					                    		
					                    	}
					                    	if(igst != "0" && gst == 0){
					                    		
					                    		taxAmount=((tota*igst)/100);
					                    		BPIncTax=taxAmount+tota;
					                    		$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
					                    		
					                    	}
					                    	
					                    	if(gst !=0 && igst !=0){
					                    		alert("please enter either gst or igst");
					                    		var abc = 0;
						                    	$("#jqGrid").jqGrid("setCell", rowId, "vat", abc);
						                    	$("#jqGrid").jqGrid("setCell", rowId, "igst", abc);
						                    	return false;
					                    	}
					                    	

					                    	
			                    		
			                    		}
			                    		
			                    		if(buyPriceEx !=0 && buyPrice !=0){
				                    		alert("please enter either BP or BPExtax");
				                    		var abc = 0;
					                    	$("#jqGrid").jqGrid("setCell", rowId, "vat", abc);
					                    	$("#jqGrid").jqGrid("setCell", rowId, "igst", abc);
					                    	return false;
				                    	}
				                    	
			                    		
			                    		
			                    	
			                    	$("#jqGrid").jqGrid("setCell", rowId, "buyPriceIncTax", BPIncTax.toFixed(2));
			                    	//$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discAmt);
			                    	$("#jqGrid").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
			                    	//$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax);
			                    	var Total = 0;
			                    	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
			        				var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
			        				var AllRows=JSON.stringify(allRowsInGrid1);
			                            for (var k = 0; k < count; k++) {
			                    	var Total1 = allRowsInGrid1[k].Total;
			                    	if(Total1 != undefined){
			                    		Total = +Total + +Total1;
			                    	} 
			                        }
			                            document.getElementById("resolution").value = Math.round(Total);
			                            document.getElementById("resolution1").value = Math.round(Total);
			                            var totAmount = Math.round(Total);
			                            
			                            var extraDiscount = document.getElementById("extraDiscount").value;
			                            if(extraDiscount != "0"){
			    	             	    	document.getElementById("resolution").value = totAmount;
			    	             	    }
			    	             	    else{
			    	             	    	var disAmount =  (extraDiscount/100)*totAmount;
			    	            			var gross = +totAmount - +disAmount;
			    	            			document.getElementById("resolution").value = Math.round(gross);
			    	             	    }
			                            
			    	             	    var expence = document.getElementById("expence").value;
			    	             	    if(expence != "0"){
			    	             	    	document.getElementById("resolution").value = totAmount;
			    	             	    }
			    	             	    else{
			    	             	    	document.getElementById("resolution").value = (+totAmount + +expence);
			    	             	    }
					        	},
					        	  
					           pager: "#jqGridPager"
			      });
				
				var lastSelection;

	            function editRow(id) {
	                if (id && id !== lastSelection) {
	                    var grid = $("#jqGrid");
	                    grid.jqGrid('restoreRow',lastSelection);
	                    grid.jqGrid('editRow',id, {keys: true} );
	                    lastSelection = id;
	                }
	            }
					        	

				
				if(count==0 || count==null)
				{
					$("#jqGrid").addRowData(0,jsonData.offer);
				}
				
				$('#jqGrid').navGrid('#jqGridPager',
						// the buttons to appear on the toolbar of the grid
						{ edit: true, add:false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
						// options for the Edit Dialog
						{
							editCaption: "The Edit Dialog",
							reloadAfterSubmit : true,
							closeAfterEdit: true,
							recreateForm: true,
							
							afterSubmit: function () {
								//$(this).trigger('reloadGrid');
//								var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');


								
								   var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
			                       var rowData = jQuery("#jqGrid").getRowData(rowId);
			                    	var quantity = rowData['quantity'];
			                    	var buyPrice = rowData['buyPrice'];
			                    	
			                    	var tota = quantity * buyPrice;

			                    	$("#jqGrid").jqGrid("setCell", rowId, "Total", tota);
								
			                    	
							},
							errorTextFormat: function (data) {
								return 'Error: ' + data.responseText
							}
						 },
						
						 {},
						
						 {
							closeAfterdel:true,
							checkOnUpdate : true,
							checkOnSubmit : true,
							recreateForm: true,
							afterComplete: function() {
		                		//$('#jqGrid').trigger( 'reloadGrid' );
								var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
				        	   	var rowData = jQuery("#jqGrid").getRowData(rowId);
		                    	var quantity = rowData['quantity'];
		                    	var buyPrice = rowData['buyPrice'];
		                    	var discount = rowData['discount'];
		                    	var gst = rowData['vat'];
		                    	var igst = rowData['igst'];
		                    	//var TotalQuant = rowData['Total'];
		                    	var discAmt=0;
		                    	var buyPriceExTax = rowData['buyPriceExTax'];
		                    	var buyPriceEx = rowData['buyPriceEx'];
		                    	var vatAmt = 0;
		                    	var discount1 = 0;
		                    	var finaltota = 0;
		                    	var totAmt = 0;
		                    	var ctot = 0;
		                    	var BPExTax = 0;
		                    	var BPExTax1 = 0;
		                    	var taxAmount=0;
		                    	var BPIncTax=0;
		                    	
		                    	if(buyPrice != "0" && buyPriceEx ==0){
		                    	//tota = quantity * buyPrice;
		                    	totAmt = quantity * buyPrice;
		                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
		                    	
		                    	/*if(discount != "0"){
		                    		discount1 = (BPExTax*(discount/100));
		                    		finaltota = +BPExTax - +discount1;
		                    		//totAmt = +tota;
		                    	}*/
		                    	
		                    	
		                    	if(gst != "0" && igst ==0){
		                    		
		                    		BPExTax=totAmt/(1+(gst/100));
		                    		taxAmount=totAmt-BPExTax;
		                    		
		                    		
		                    	}
		                    	if(igst != "0" && gst == 0){
		                    		
		                    		BPExTax=totAmt/(1+(igst/100));
		                    		taxAmount=totAmt-BPExTax;
		                    		

		                    	}
		                    	/*if(gst !=0 && igst !=0){
		                    		alert("please enter either gst or igst");
		                    		var abc = 0;
			                    	$("#jqGrid").jqGrid("setCell", rowId, "vat", abc);
			                    	$("#jqGrid").jqGrid("setCell", rowId, "igst", abc);
			                    	return false;
		                    	}
		                    	*/

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
		                    	
		                    	}
		                    	
		                    	$("#jqGrid").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
		                    	$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
		                    	$("#jqGrid").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
		                    	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
		                    	//$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt);
		                    	//buy price ex tax user
		                    				                    		
		                    		if(buyPriceEx != "0" && buyPrice == 0){
		                    		
		                    		
		                    			totAmt = quantity * buyPriceEx;
				                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
		                    		
				                    	if(discount != "0"){
				                    		//discount1 = totAmt-(discount/100);
				                    		//discAmt=totAmt-discount1
				                    		discount1 = ((totAmt*discount)/100);
				                    		tota = +totAmt - +discount1;
				                    		$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
				                    		//finaltota = +BPExTax1 - +discount1;
				                    		//totAmt = +tota;
				                    	}
				                    	else
				                    		{
				                    		//discount1 = totAmt-(discount/100);
				                    		//discAmt=totAmt-discount1
				                    		discount1 = ((totAmt*discount)/100);
				                    		tota = +totAmt - +discount1;
				                    		$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
				                    		//discount1 = (BPExTax1*(discount/100));
				                    		//finaltota = +BPExTax1 - +discount1;
				                    		
				                    		}
		                    		

				                    	if(gst != "0" && igst ==0){
				                    		
				                    		//BPExTax1=(totAmt/(1+(gst/100)));
				                    		//taxAmount=totAmt-BPExTax1;
				                    		//vatAmt =  ((tota*(gst))/100);
				                    		//totAmt = +tota + +vatAmt;
				                    		//taxAmount=(tota*(gst/100));
				                    		taxAmount=((tota*(gst))/100);
				                    		BPIncTax=taxAmount+tota;
				                    		$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
				                    		
				                    		
				                    		
				                    	}
				                    	if(igst != "0" && gst == 0){
				                    		
				                    		taxAmount=((tota*igst)/100);
				                    		BPIncTax=taxAmount+tota;
				                    		$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
				                    		
				                    	}
				                    	
				                    	/*if(gst !=0 && igst !=0){
				                    		alert("please enter either gst or igst");
				                    		var abc = 0;
					                    	$("#jqGrid").jqGrid("setCell", rowId, "vat", abc);
					                    	$("#jqGrid").jqGrid("setCell", rowId, "igst", abc);
					                    	return false;
				                    	}*/
				                    	

				                    	
		                    		
		                    		}
		                    		
		                    		/*if(buyPriceEx !=0 && buyPrice !=0){
			                    		alert("please enter either BP or BPExtax");
			                    		var abc = 0;
				                    	$("#jqGrid").jqGrid("setCell", rowId, "vat", abc);
				                    	$("#jqGrid").jqGrid("setCell", rowId, "igst", abc);
				                    	return false;
			                    	}*/
			                    	
		                    		
		                    		
		                    	
		                    	$("#jqGrid").jqGrid("setCell", rowId, "buyPriceIncTax", BPIncTax.toFixed(2));
		                    	//$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discAmt);
		                    	$("#jqGrid").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
		                    	//$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax);
		                    	var Total = 0;
		                    	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
		        				var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
		        				var AllRows=JSON.stringify(allRowsInGrid1);
		                            for (var k = 0; k < count; k++) {
		                    	var Total1 = allRowsInGrid1[k].Total;
		                    	if(Total1 != undefined){
		                    		Total = +Total + +Total1;
		                    	} 
		                        }
		                            document.getElementById("resolution").value = Math.round(Total);
		                            document.getElementById("resolution1").value = Math.round(Total);
		                            var totAmount = Math.round(Total);
		                            
		                            var extraDiscount = document.getElementById("extraDiscount").value;
		                            if(extraDiscount != "0"){
		    	             	    	document.getElementById("resolution").value = totAmount;
		    	             	    }
		    	             	    else{
		    	             	    	var disAmount =  (extraDiscount/100)*totAmount;
		    	            			var gross = +totAmount - +disAmount;
		    	            			document.getElementById("resolution").value = Math.round(gross);
		    	             	    }
		                            
		    	             	    var expence = document.getElementById("expence").value;
		    	             	    if(expence != "0"){
		    	             	    	document.getElementById("resolution").value = totAmount;
		    	             	    }
		    	             	    else{
		    	             	    	document.getElementById("resolution").value = (+totAmount + +expence);
		    	             	    }
		                		
							},
							errorTextFormat: function (data) {
								return 'Error: ' + data.responseText
							},
							onSelectRow: function(id) {
								if (id && id !== lastSel) {
									jQuery("#jqGrid").saveRow(lastSel, true, 'clientArray');
									jQuery("#jqGrid").editRow(id, true);
									lastSel = id;
									console.log(id);
								}
							}
						});
				
				/*function validatePositive(value, column) {
                    if (value > 4)
                        return [false, "Please enter a positive value"];
                    else
                        return [true, ""];
                }*/
				

			})
 	    	.error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	})
		
	
}