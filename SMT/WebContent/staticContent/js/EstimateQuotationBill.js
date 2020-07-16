
////////////////////product grid for estimate quotation bill/////////////
function getProdGrid()
{ 
		var value = document.getElementById("key").value;
		var carNo = $('#carNo').val();
		
		var params= {};
		
		params["key"]=value;
		params["methodName"] ="fetchCust1";
		document.getElementById('key').value = null;
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
		         count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
			     var rowdata =$("#list4").jqGrid('getGridParam','data');
			     var ids = jQuery("#list4").jqGrid('getDataIDs');
			     
				  var prodName,com,bar;
				  for (var j = 0; j < count; j++) 
				  {
					  prodName = rowdata[j].itemName;
					  com = rowdata[j].categoryName;
					  bar = rowdata[j].barcodeNo;
					 var rowId = ids[j];
					 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
					
					if (prodName == jsonData.offer.itemName && com == jsonData.offer.categoryName && bar == jsonData.offer.barcodeNo) {
				    	
				    	newrow=false;
						alert("Item Already Inserted !!!");
						var grid = jQuery("#list4");
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
			
			
			$("#list4").jqGrid({
				datatype: "local",
				
				colNames:['pk_temp_id','item_id','BarcodeNO','CatName','ItemName','HSN/SAC','Quantity','SalePrice','Discount','DiscountAmt','GST%','IGST%','Tax Amt','Total Amt'],
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
				    	 width:170,
						
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
					
					{	name:'discountGrid',
						width:100,
						editable: true
						
					},
					
					{	name:'discountAmt',
						width:100,
						
						
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
						formatter: 'number',
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
		        	var rowId =$("#list4").jqGrid('getGridParam','selrow');  
	                var rowData = jQuery("#list4").getRowData(rowId);
	             	var quantity = rowData['quantity'];
	             	var salePrice = rowData['salePrice'];
	             	var discount = rowData['discountGrid'];
	             	var discountAmt = rowData['discountAmt'];
	             	var gst = rowData['vat'];
                	var igst = rowData['igst'];
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
                		
                    	
                    	var calculateVatTotal = (gst / 100)*finalTotal;
                    	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                    	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
                    	}
                    	else if(igst !=null || igst!=0|| igst!=""){
                    		
                    		var calculateVatTotal = (igst / 100)*finalTotal;
	                    	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
	                    	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
                    	}
                	
                	$("#list4").jqGrid("setCell", rowId, "taxAmount", calculateVatTotal);
	             	$("#list4").jqGrid("setCell", rowId, "total", totalWithVatAmt);
	             	var Total = 0;
                	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
    				var allRowsInGrid1 = $('#list4').getGridParam('data');
    				var AllRows=JSON.stringify(allRowsInGrid1);
                    for (var k = 0; k < count; k++) {
                	var Total1 = allRowsInGrid1[k].total;
	             	
                	if(Total1 != undefined){
                		Total = +Total + +Total1;
                	}
                    }
                        document.getElementById("totalAmount").value = Math.round(Total);
                      /*  var totAmount = Math.round(Total);
	             	    var dis = document.getElementById("discount").value;
	             	    if(dis != "0"){
	             	    	document.getElementById("grossTotal").value = totAmount;
	             	    }
	             	    else{
	             	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
	             	    }*/
	             	
		        	},
	           
				pager: "#jqGridPager",
				
				
				
			});
			
		
			//$("#list4").addRowData(i+1,jsonData[i]);
			if(count==0 || count==null)
			{
				 // $("#list4").addRowData(i,jsonData[i]);
				  $("#list4").addRowData(0,jsonData.offer);
			}
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
		    	             	var discount = rowData['discountGrid'];
		    	             	var discountAmt = rowData['discountAmt'];
		    	             	var gst = rowData['vat'];
		                    	var igst = rowData['igst'];
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
		                    		
		                        	
		                        	var calculateVatTotal = (gst / 100)*finalTotal;
		                        	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
		                        	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
		                        	}
		                        	else if(igst !=null || igst!=0|| igst!=""){
		                        		
		                        		var calculateVatTotal = (igst / 100)*finalTotal;
		    	                    	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
		    	                    	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
		                        	}
		                    	
		                    	$("#list4").jqGrid("setCell", rowId, "taxAmount", calculateVatTotal);
		    	             	$("#list4").jqGrid("setCell", rowId, "total", totalWithVatAmt);
		    	             	var Total = 0;
		                    	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		        				var allRowsInGrid1 = $('#list4').getGridParam('data');
		        				var AllRows=JSON.stringify(allRowsInGrid1);
		                        for (var k = 0; k < count; k++) {
		                    	var Total1 = allRowsInGrid1[k].total;
		    	             	
		                    	if(Total1 != undefined){
		                    		Total = +Total + +Total1;
		                    	}
		                        }
		                            document.getElementById("totalAmount").value = Math.round(Total);
		                          /*  var totAmount = Math.round(Total);
		    	             	    var dis = document.getElementById("discount").value;
		    	             	    if(dis != "0"){
		    	             	    	document.getElementById("grossTotal").value = totAmount;
		    	             	    }
		    	             	    else{
		    	             	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
		    	             	    }*/
		    	             	
		    		        	},
		    	           
		                		
		                });
			 
			 
				   });
				
 			})
}

///////////////////////////////////saving data of estimate quotation in database/////////////////////////

function regEstimateCustbill1(){
	
	if(document.custord.CustomerId.value == "")
	{
		alert("Select Customer Name.");
		return false;
	}	
	regEstimateCustbill();
	}

function regEstimateCustbill(){
	document.getElementById("btnSubmit").disabled = true; 
	var params= {};
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#list4').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++) {
	
		var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
     	params["pk_temp_id"+i] = pk_temp_id;
		
		var item_id = allRowsInGrid1[i].item_id;
     	params["item_id"+i] = item_id;
     	
		var itemName = allRowsInGrid1[i].itemName;
		params["itemName"+i] = itemName;
		
		var quantity = allRowsInGrid1[i].quantity;
		params["quantity"+i] = quantity;
		
		var barcodeNo = allRowsInGrid1[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var categoryName = allRowsInGrid1[i].categoryName;
		params["categoryName"+i] = categoryName;

		var salePrice = allRowsInGrid1[i].salePrice;
		params["salePrice"+i] = salePrice;
		
		var total = allRowsInGrid1[i].total;
		params["total"+i] = total;
		
		var hsnSacNo = allRowsInGrid1[i].hsnSacNo;
		params["hsnSacNo"+i] = hsnSacNo;
		
		var vat = allRowsInGrid1[i].vat;
		params["vat"+i] = vat;
		
		var igst = allRowsInGrid1[i].igst;
		params["igst"+i] = igst;
		
		var taxAmount = allRowsInGrid1[i].taxAmount;
		params["taxAmount"+i] = taxAmount;
		
		var discountGrid = allRowsInGrid1[i].discountGrid;
		params["discountGrid"+i] = discountGrid;
		
		var discountAmt = allRowsInGrid1[i].discountAmt;
		params["discountAmt"+i] = discountAmt;
		

		var TotalQuan = allRowsInGrid1[i].TotalQuan;
		params["TotalQuan"+i] = TotalQuan;
		
		
		var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
		params["buyPriceExTax"+i] = buyPriceExTax;
		
		
		
	}
	
	 var input = document.getElementById('CustomerId'),
     list = document.getElementById('cust_drop'),
     i,fkRootCustId,gstTinNo;
	 
	 for (i = 0; i < list.options.length; ++i) 
	 {
		 if (list.options[i].value === input.value) {
			 fkRootCustId = list.options[i].getAttribute('data-value');
			 gstTinNo = list.options[i].getAttribute('myvalue');
			 }
	     }
	    var input1 = document.getElementById('CustomerId').value;
	    var totalAmount=$('#spareGrossTotal').val();
	    var discount=$('#discount').val();
	    if(discount == ""){
	    	discount = 0;
	    }
	    
	    var grossTotal=$('#grossTotal').val();
	    var contactNo=$('#contactNo').val();
	    var CustomerId=$('#CustomerId').val();
	    var carNo=$('#carNo').val();
	  /* ///SERVICE GRID 
	    var count1 = jQuery("#list5").jqGrid('getGridParam', 'records');
		var allRowsInGrid1 = $('#list5').getGridParam('data');
		var AllRows=JSON.stringify(allRowsInGrid1);
		for (var i = 0; i < count1; i++) 
		{
		
			var itemName1 = allRowsInGrid1[i].itemName;
			params["itemName1"+i] = itemName1;
			
			var quantity1 = allRowsInGrid1[i].quantity;
			params["quantity1"+i] = quantity1;
			
			var salePrice1 = allRowsInGrid1[i].salePrice;
			params["salePrice1"+i] = salePrice1;
			
			var total1 = allRowsInGrid1[i].total;
			params["total1"+i] = total1;
			
			var hsnSacNo1 = allRowsInGrid1[i].hsnSacNo;
			params["hsnSacNo1"+i] = hsnSacNo1;
			
			var vat1 = allRowsInGrid1[i].vat;
			params["vat1"+i] = vat1;
			
			var igst1 = allRowsInGrid1[i].igst;
			params["igst1"+i] = igst1;
			
			var taxAmount1 = allRowsInGrid1[i].taxAmount;
			params["taxAmount1"+i] = taxAmount1;
			
			var discountGrid1 = allRowsInGrid1[i].discountGrid;
			params["discountGrid1"+i] = discountGrid1;
			
			var discountAmt1 = allRowsInGrid1[i].discountAmt;
			params["discountAmt1"+i] = discountAmt1;
			
		  }
		 var ServicetotalAmount=$('#ServicetotalAmount').val();
		
		 params["count1"] = count1;
			//alert("count second++++  " +count1)
		params["ServicetotalAmount"] = ServicetotalAmount;
	
    
    params["count"] = count;
		params["totalAmount"] = totalAmount;
	   
	    
	    params["input1"] = input1;
	    params["fkRootCustId"] = fkRootCustId;
	    params["gstTinNo"] = gstTinNo;
		params["count"] = count;
		params["totalAmount"] = totalAmount;
		//params["discount"] = discount;
		
		params["grossTotal"] = grossTotal;
		*/
	    var description=$('#description').val();
	    
	    params["gstTinNo"] = gstTinNo;
	    params["input1"] = input1;
	    params["fkRootCustId"] = fkRootCustId;
	    params["count"] = count;
		params["totalAmount"] = totalAmount;
		params["grossTotal"] = grossTotal;
		params["contactNo"] = contactNo;
		params["CustomerId"] = CustomerId;
		params["discount"] = discount;
		params["description"] = description;
		params["carNo"] = carNo;
	    params["methodName"] = "regEstimateQuotBill";
	    
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		    	{  
			           alert(data);
					   //window.open("CreditCustomerBillPDF.jsp");
			           //window.open("BillingPdfNew.jsp");
			           window.open("EstimateBillingPdf.jsp");
					   location.reload(true);
			
				 }
		    	).error(function(jqXHR, textStatus, errorThrown){
		    		if(textStatus==="timeout") {
		    			$(loaderObj).hide();
		    			$(loaderObj).find('#errorDiv').show();
		    		}
		    	});
	
}

////////////getting service for grid//////////+++++++++++++++++++++++++

/*function getproductgrid1(){ 

	var productIdService = document.getElementById("productIdService").value;
	var splitText = value.split(" => ");
	var productId1 = splitText[0];
	
	
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
			
			colNames:['pk_temp_id','item_id','ItemName','HSN/SAC','Quantity','SalePrice','Discount','DiscountAmt','GST%','IGST%','Tax Amt','Total Amt'],
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
				
				{	name:'discountGrid',
					width:100,
					//editable: true
					hidden:true
					
				},
				
				{	name:'discountAmt',
					width:100,
					hidden:true
					
					
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
					formatter: 'number',
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
            	var tota = 0;
            	var vatAmt = 0;
            	var totAmt = 0;
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
            	tota = quantity * salePrice;
            	totAmt = quantity * salePrice;
            	
            	var totalIncDisc= (tota*(discount/100));
            	var finalTotal= totAmt-totalIncDisc;
            	$("#list5").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
             
            	if(gst != "0"){
            		//vatAmt =  ((totalIncDisc*gst)/100);
            		vatAmt = (gst / 100)*totalIncDisc;
            		totAmt = +totalIncDisc + +vatAmt;
            	}
            	if(igst != "0"){
            		vatAmt =  ((totalIncDisc*igst)/100);
            		totAmt = +totalIncDisc + +vatAmt;
            	}
            	
            	if(igst ==null || igst==0 || igst==""){
            		
                	
                	var calculateVatTotal = (gst / 100)*finalTotal;
                	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
                	}
                	else if(igst !=null || igst!=0|| igst!=""){
                		
                		var calculateVatTotal = (igst / 100)*finalTotal;
                    	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                    	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
                	}
            	
            	$("#list5").jqGrid("setCell", rowId, "taxAmount", calculateVatTotal);
             	$("#list5").jqGrid("setCell", rowId, "total", totAmt);
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
                    
                    var totalAmount = document.getElementById("totalAmount").value;
                    var ServicetotalAmount1 = document.getElementById("ServicetotalAmount").value;
                     GrandGrossTotal =Number(totalAmount) + Number(ServicetotalAmount1);
            		document.getElementById("grossTotal").value =GrandGrossTotal; 
                    //document.getElementById("ServicetotalAmount").value = Math.round(Total);
                    
                    var totAmount = Math.round(Total);
             	    var dis = document.getElementById("discount").value;
             	    if(dis != "0"){
             	    	document.getElementById("grossTotal").value = totAmount;
             	    }
             	    else{
             	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
             	    }
             	
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
	                		
		                	
	                		var rowId =$("#list5").jqGrid('getGridParam','selrow');  
	                        var rowData = jQuery("#list5").getRowData(rowId);
	                     	var quantity = rowData['quantity'];
	                     	var salePrice = rowData['salePrice'];
	                     	var discount = rowData['discountGrid'];
	                     	var discountAmt = rowData['discountAmt'];
	                     	var gst = rowData['vat'];
	                    	var igst = rowData['igst'];
	                    	var tota = 0;
	                    	var vatAmt = 0;
	                    	var totAmt = 0;
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
	                    	tota = quantity * salePrice;
	                    	totAmt = quantity * salePrice;
	                    	
	                    	var totalIncDisc= (tota*(discount/100));
	                    	var finalTotal= totAmt-totalIncDisc;
	                    	$("#list5").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
	                     
	                    	if(gst != "0"){
	                    		//vatAmt =  ((totalIncDisc*gst)/100);
	                    		vatAmt = (gst / 100)*totalIncDisc;
	                    		totAmt = +totalIncDisc + +vatAmt;
	                    	}
	                    	if(igst != "0"){
	                    		vatAmt =  ((totalIncDisc*igst)/100);
	                    		totAmt = +totalIncDisc + +vatAmt;
	                    	}
	                    	
	                    	if(igst ==null || igst==0 || igst==""){
	                    		
	                        	
	                        	var calculateVatTotal = (gst / 100)*finalTotal;
	                        	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
	                        	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
	                        	}
	                        	else if(igst !=null || igst!=0|| igst!=""){
	                        		
	                        		var calculateVatTotal = (igst / 100)*finalTotal;
	                            	var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
	                            	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
	                        	}
	                    	
	                    	$("#list5").jqGrid("setCell", rowId, "taxAmount", calculateVatTotal);
	                     	$("#list5").jqGrid("setCell", rowId, "total", totAmt);
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
	                            
	                            var totalAmount = document.getElementById("totalAmount").value;
	                            var ServicetotalAmount1 = document.getElementById("ServicetotalAmount").value;
	                             GrandGrossTotal =Number(totalAmount) + Number(ServicetotalAmount1);
	                    		document.getElementById("grossTotal").value =GrandGrossTotal; 
	                            //document.getElementById("ServicetotalAmount").value = Math.round(Total);
	                            
	                            var totAmount = Math.round(Total);
	                     	    var dis = document.getElementById("discount").value;
	                     	    if(dis != "0"){
	                     	    	document.getElementById("grossTotal").value = totAmount;
	                     	    }
	                     	    else{
	                     	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
	                     	    }
	                     	
	                	},

	                		
	                });
		 
		 
			   });
			
			})
}

*/

///product name grid/////////////

function getproductgridEstimate(){
	
	var value = document.getElementById("productId").value;
	var splitText = value.split(" => ");
	var productId1 = splitText[0];
	var carNo = $('#carNo').val();
	
	var params= {};
	
	params["productId"]=productId1;
	params["methodName"] ="fetchprod";
	
	document.getElementById('productId').value = null;
	var count=0;
	var newrow;
	var rowId;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	    	{
		 var jsonData = $.parseJSON(data);
		 /*var result = data.length;

		 if(result <= "20"){
			 alert("Stock NOT AVAILABLE !!!");
			 return true;
		 }
*/		 
	     $.each(jsonData,function(i,v)
			{
	         count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#list4").jqGrid('getGridParam','data');
		     var ids = jQuery("#list4").jqGrid('getDataIDs');
		     
			  var prodName,com,bar;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].categoryName;
				  bar = rowdata[j].barcodeNo;
				 var rowId = ids[j];
				 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				
				if (prodName == jsonData.offer.itemName && com == jsonData.offer.categoryName && bar == jsonData.offer.barcodeNo) {
			    	
			    	newrow=false;
					alert("Item Already Inserted !!!");
					var grid = jQuery("#list4");
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
		
		
		$("#list4").jqGrid({
			datatype: "local",
			
			colNames:['pk_temp_id','item_id','BarcodeNO','CatName','ItemName','HSN/SAC','Quantity','SalePrice',"Total SP","SPExTax",'GST%','IGST%','Tax Amt','Discount','DiscountAmt','Total Amt'],
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
			    	 width:170,
					
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
				/*{	name:'SalePriceExTax',
					width:100,
					editable: true
					
				},*/
				
				
				
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
					formatter: 'number',
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
	        	var rowId =$("#list4").jqGrid('getGridParam','selrow');  
                var rowData = jQuery("#list4").getRowData(rowId);
             	var quantity = rowData['quantity'];
             	var salePrice = rowData['salePrice'];
             	var discount = rowData['discountGrid'];
             	var discountAmt = rowData['discountAmt'];
             	var gst = rowData['vat'];
            	var igst = rowData['igst'];
            	var SalePriceExTax = rowData['SalePriceExTax'];

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
            	
            	//tota = quantity * salePrice;
            	totAmt = quantity * salePrice;
            	$("#list4").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
            	/*var totalIncDisc= (tota*(discount/100));
            	var finalTotal= totAmt-totalIncDisc;
            	$("#list4").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
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
            		
                	
                	//var calculateVatTotal = (gst / 100)*finalTotal;
                	//var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
                	
                	BPExTax=totAmt/(1+(gst/100));
            		taxAmount=totAmt-BPExTax;
            		
                	}
                	else if(igst !=null || igst!=0|| igst!=""){
                		
                		//var calculateVatTotal = (igst / 100)*finalTotal;
                    	//var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
                    	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
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
            	$("#list4").jqGrid("setCell", rowId, "buyPriceExTax",BPExTax.toFixed(2));
            	$("#list4").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
            	$("#list4").jqGrid("setCell", rowId, "taxAmount", taxAmount.toFixed(2));
             	$("#list4").jqGrid("setCell", rowId, "total", totAmt.toFixed(2));
             	var Total = 0;
            	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#list4').getGridParam('data');
				var AllRows=JSON.stringify(allRowsInGrid1);
                for (var k = 0; k < count; k++) {
            	var Total1 = allRowsInGrid1[k].total;
             	
            	if(Total1 != undefined){
            		Total = +Total + +Total1;
            	}
                }
                
                	document.getElementById("totalAmount").value = Math.round(Total);
                    document.getElementById("spareGrossTotal").value = Math.round(Total);
                    var totAmount = Math.round(Total);
                    var totalAmount = document.getElementById("spareGrossTotal").value;
                    var ServicetotalAmount1 = document.getElementById("ServicetotalAmount").value;
                     GrandGrossTotal =Number(totalAmount) + Number(ServicetotalAmount1);
            		document.getElementById("wholeTotal").value =GrandGrossTotal;
             	   /* var dis = document.getElementById("discount").value;
             	    if(dis != "0"){
             	    	document.getElementById("grossTotal").value = totAmount;
             	    }
             	    else{
             	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
             	    }*/
             	
	        	},
           
			pager: "#jqGridPager",
			
			
			
		});
		
	
		//$("#list4").addRowData(i+1,jsonData[i]);
		if(count==0 || count==null)
		{
			 // $("#list4").addRowData(i,jsonData[i]);
			  $("#list4").addRowData(0,jsonData.offer);
		}
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
	                     	var discount = rowData['discountGrid'];
	                     	var discountAmt = rowData['discountAmt'];
	                     	var gst = rowData['vat'];
	                    	var igst = rowData['igst'];
	                    	var SalePriceExTax = rowData['SalePriceExTax'];

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
	        				
	        				}
	                    	*/
	                    	/*if(igst >0 && gst > 0 )
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
	                    		
	                        	
	                        	//var calculateVatTotal = (gst / 100)*finalTotal;
	                        	//var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
	                        	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
	                        	
	                        	BPExTax=totAmt/(1+(gst/100));
	                    		taxAmount=totAmt-BPExTax;
	                    		
	                        	}
	                        	else if(igst !=null || igst!=0|| igst!=""){
	                        		
	                        		//var calculateVatTotal = (igst / 100)*finalTotal;
	                            	//var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal)
	                            	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
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
	                        for (var k = 0; k < count; k++) {
	                    	var Total1 = allRowsInGrid1[k].total;
	                     	
	                    	if(Total1 != undefined){
	                    		Total = +Total + +Total1;
	                    	}
	                        }
	                        	document.getElementById("totalAmount").value = Math.round(Total);
	                            document.getElementById("spareGrossTotal").value = Math.round(Total);
	                            var totAmount = Math.round(Total);
	                            var totalAmount = document.getElementById("spareGrossTotal").value;
	                            var ServicetotalAmount1 = document.getElementById("ServicetotalAmount").value;
	                             GrandGrossTotal =Number(totalAmount) + Number(ServicetotalAmount1);
	                    		document.getElementById("wholeTotal").value =GrandGrossTotal;
	                     	   /* var dis = document.getElementById("discount").value;
	                     	    if(dis != "0"){
	                     	    	document.getElementById("grossTotal").value = totAmount;
	                     	    }
	                     	    else{
	                     	    	document.getElementById("grossTotal").value = (+totAmount - +dis);
	                     	    }*/
	                     	
	        	        	},
	                   
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
if(ownerName==undefined || ownerName==""){
	ownerName="NA"
}
var carNo=$('#carNo').val();
var totalAmount=$('#totalAmount').val();
var carID=$('#carID').val();
var grossTotal=$('#grossTotal').val();
var wholeTotal=$('#wholeTotal').val();
//var params= {};
	var count1 = jQuery("#list5").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#list5').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count1; i++) 
	{
	
		var itemName1 = allRowsInGrid1[i].itemName;
		params["itemName1"+i] = itemName1;
		
		var quantity1 = allRowsInGrid1[i].quantity;
		params["quantity1"+i] = quantity1;
		
		var salePrice1 = allRowsInGrid1[i].salePrice;
		params["salePrice1"+i] = salePrice1;
		
		var total1 = allRowsInGrid1[i].total;
		params["total1"+i] = total1;
		
		var hsnSacNo1 = allRowsInGrid1[i].hsnSacNo;
		params["hsnSacNo1"+i] = hsnSacNo1;
		
		var vat1 = allRowsInGrid1[i].vat;
		params["vat1"+i] = vat1;
		
		var igst1 = allRowsInGrid1[i].igst;
		params["igst1"+i] = igst1;
		
		var taxAmount1 = allRowsInGrid1[i].taxAmount;
		params["taxAmount1"+i] = taxAmount1;
		
		var discountGrid1 = allRowsInGrid1[i].discountGrid;
		params["discountGrid1"+i] = discountGrid1;
		
		var discountAmt1 = allRowsInGrid1[i].discountAmt;
		params["discountAmt1"+i] = discountAmt1;
		
		var TotalQuan = allRowsInGrid1[i].TotalQuan;
  		params["TotalQuan"+i] = TotalQuan;
  		
  		var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
  		if(buyPriceExTax == "" || buyPriceExTax == null || buyPriceExTax == undefined){
  			buyPriceExTax = 0;
  		}
  		
  		params["buyPriceExTax"+i] = buyPriceExTax;
  	
		
		
	  }
	 var ServicetotalAmount=$('#ServicetotalAmount').val();
	 
//	 var discounts =document.getElementById("discountservicee").value;
//	 alert(discounts);
	 var discounts = $('#discountservicee').val();
//	 var discountservice = $('#discountservice').val();
//	 alert(discounts);
	 /*if(discounts = "" || discounts == null || discounts == undefined ){
		 discounts = 0;
	 }*/
//	 alert(discounts);
	 params["count1"] = count1;
		//alert("count second++++  " +count1)
	params["ServicetotalAmount"] = ServicetotalAmount;
	params["discounts"] = discounts;



params["contactNo"] = contactNo;
params["ownerName"] = ownerName;


params["carNo"] = carNo;
params["totalAmount"] = totalAmount;

params["grossTotal"] = grossTotal;
params["carID"] = carID;
params["wholeTotal"] = wholeTotal;




params["methodName"] = "registerBillServiceqq";

$.post('/SMT/jsp/utility/controller.jsp', params,
		function(data) {
			alert(data);
			//window.open("Car_bill_PDF.jsp");
			//window.open("BillingPdfNew.jsp");
			location.reload(true);
			
		}).error(function(jqXHR, textStatus, errorThrown) {
	if (textStatus === "timeout") {
		$(loaderObj).hide();
		$(loaderObj).find('#errorDiv').show();
	}
});



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
	$("#list5").jqGrid("setCell", rowId, "TotalQuan", totAmt);
	 
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
	$("#list5").jqGrid("setCell", rowId, "buyPriceExTax", totalWithVatAmtTot);
	$("#list5").jqGrid("setCell", rowId, "discountAmt", discount1);
	$("#list5").jqGrid("setCell", rowId, "buyPriceIncxTax", BPIncTaxFinal);
	$("#list5").jqGrid("setCell", rowId, "taxAmount", taxAmount);
 	$("#list5").jqGrid("setCell", rowId, "total", BPIncTaxFinal);

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
        
        document.getElementById("grossTotal").value = Math.round(Total);
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
            	$("#list5").jqGrid("setCell", rowId, "TotalQuan", totAmt);
            	 
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
            	$("#list5").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax);
            	$("#list5").jqGrid("setCell", rowId, "buyPriceIncxTax", BPIncTaxFinal);
            	$("#list5").jqGrid("setCell", rowId, "discountAmt", discount1);
            	$("#list5").jqGrid("setCell", rowId, "taxAmount", taxAmount);
             	$("#list5").jqGrid("setCell", rowId, "total", BPIncTaxFinal);
		
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
                
                document.getElementById("grossTotal").value = Math.round(Total);
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


////billing oil module grid///////////

function getProductInGridBillingOil()
{

var value = document.getElementById("itemName1").value;
var splitText = value.split(" =>");
var productId1 = splitText[0];

//var carNo = $('#carNo').val();

var params= {};

params["productId"]=productId1;
params["methodName"] ="getProductInGridBillingOil";

document.getElementById('itemName1').value = null;
var count=0;
var newrow;
var rowId;
$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
    	{
	 var jsonData = $.parseJSON(data);
	 //var result = data.length;
/*
	 if(result <= "20"){
		 alert("Stock NOT AVAILABLE !!!");
		 return true;
	 }*/
	 
     $.each(jsonData,function(i,v)
		{
         count = jQuery("#listOil").jqGrid('getGridParam', 'records'); 
	     var rowdata =$("#listOil").jqGrid('getGridParam','data');
	     var ids = jQuery("#listOil").jqGrid('getDataIDs');
	     
		  var prodName,com,bar;
		  for (var j = 0; j < count; j++) 
		  {
			  prodName = rowdata[j].itemName;
			  com = rowdata[j].categoryName;
			  //bar = rowdata[j].barcodeNo;
			 var rowId = ids[j];
			 var rowData = jQuery('#listOil').jqGrid ('getRowData', rowId);
			
			if (prodName == jsonData.offer.itemName && com == jsonData.offer.categoryName) {
		    	
		    	newrow=false;
				alert("Item Already Inserted !!!");
				var grid = jQuery("#listOil");
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
			  $("#listOil").addRowData(count,jsonData.offer);
				
			 }
	
	
	$("#listOil").jqGrid({
		datatype: "local",
		
		colNames:['pk_temp_id','item_id','CatName','ItemName','HSN/SAC','No.of.barrels','Total litres','Quantity','SalePrice',"Total SP","SPExTax",'GST%','IGST%','Tax Amt','Discount','DiscountAmt','Total Amt'],
		colModel:[ 
		          
		          
             {
                name:'pk_temp_id',
                hidden:true,
             },    
		     {
		    	 name:'pkProductId',
		    	 hidden:true,
		     },
		    
		 	/*{
		    	 name:'barcodeNo',
		    	 width:70,				    	
		    	 
		     },*/
		     {	name:'categoryName',
		    	 width:170,
				
			},
		           
		    {	name:'itemName',
		    	 width:170,
				
			},
			 {	name:'hsnsacno',
		    	 width:100,
				
			},
			 {	name:'NumberofBarrel',
		    	 width:100,
		    	 hidden:true,
				
			},
			 {	name:'TotalLitre',
		    	 width:100,
				
			},
			
			{	name:'quantitydouble',
				width:70,
				editable: true
				
			},
			
			{	name:'salePrice',
				width:100,
				editable: true
				
			},
			/*{	name:'SalePriceExTax',
				width:100,
				editable: true
				
			},*/
			
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
			
			
			{	name:'vat',
				width:80,
				editable: true
			},
			{	name:'igst',
				width:80,
				editable: true
			},
			{	name:'taxAmt',
				width:150,
				//formatter: 'number',
			},
			

			{	name:'discount',
				width:100,
				//editable: true
				hidden:true,
			},
			
			{	name:'discountAmt',
				width:100,
				hidden:true,
				
				
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
        	var rowId =$("#listOil").jqGrid('getGridParam','selrow');  
            var rowData = jQuery("#listOil").getRowData(rowId);
         	var quantity = rowData['quantitydouble'];
         	var litre = rowData['TotalLitre'];
         	var salePrice = rowData['salePrice'];
         	var discount = rowData['discount'];
         	var discountAmt = rowData['discountAmt'];
         	var gst = rowData['vat'];
        	var igst = rowData['igst'];
        	var SalePriceExTax = rowData['SalePriceExTax'];
        	var vatAmt = 0;
        	var totAmt = 0;
        	var buyPriceExTax = rowData['buyPriceExTax'];
        	var discount1 = 0;
        	var finaltota = 0;
        	var BPExTax = 0;
        	var taxAmount=0;
        	
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
				$("#listOil").jqGrid("setCell",rowId, "igst", abc);

				$("#listOil").jqGrid("setCell",rowId, "gst", abc);
				$("#listOil").jqGrid("setCell",rowId, "taxAmt", pqr);
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
				$("#listOil").jqGrid("setCell",rowId, "igst", abc);

				$("#listOil").jqGrid("setCell",rowId, "gst", abc);
				$("#listOil").jqGrid("setCell",rowId, "taxAmt", pqr);
				return false;
				}
			
			}
        	
        	if(igst >0 && gst > 0 )
			{
			var abc ="0";
			alert(" Please Enter GST Number OR IGST Number");
			$("#listOil").jqGrid("setCell",rowId, "igst", abc);

			$("#listOil").jqGrid("setCell",rowId, "gst", abc);
			return false;
			}
        	
        	if(+quantity > +litre){
        			var p ="0"
					alert("Please enter quantity less than total litre");
					$("#listOil").jqGrid("setCell",rowId, "quantitydouble", p);
					return false;

        	}
        	
        	//tota = quantity * salePrice;
        	totAmt = quantity * salePrice;
        	$("#listOil").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
        	/*var totalIncDisc= (tota*(discount/100));
        	var finalTotal= totAmt-totalIncDisc;
        	$("#listOil").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
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
        		
            	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
            	}
            	else if(igst !=null || igst!=0|| igst!=""){
            		
            		BPExTax=totAmt/(1+(igst/100));
            		taxAmount=totAmt-BPExTax;
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
        	$("#listOil").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
        	$("#listOil").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
        	$("#listOil").jqGrid("setCell", rowId, "taxAmt", taxAmount.toFixed(2));
         	$("#listOil").jqGrid("setCell", rowId, "total", totAmt.toFixed(2));
         	var Total = 0;
        	var count = jQuery("#listOil").jqGrid('getGridParam', 'records');
			var allRowsInGrid1 = $('#listOil').getGridParam('data');
			var AllRows=JSON.stringify(allRowsInGrid1);
            for (var k = 0; k < count; k++) {
        	var Total1 = allRowsInGrid1[k].total;
         	
        	if(Total1 != undefined){
        		Total = +Total + +Total1;
        	}
            }
                document.getElementById("totalAmountOil").value = Math.round(Total);
                var totAmount = Math.round(Total);
         	    var dis = document.getElementById("discountOil").value;
         	    if(dis != "0"){
         	    	document.getElementById("grossTotalOil").value = totAmount;
         	    }
         	    else{
         	    	document.getElementById("grossTotalOil").value = (+totAmount - +dis);
         	    }
         	   var spareGrossTotal = document.getElementById("spareGrossTotal").value;
         	   var grossTotal = document.getElementById("grossTotal").value;
               var grossTotalOil = document.getElementById("grossTotalOil").value;
               GrandGrossTotalOil =Number(spareGrossTotal) + Number(grossTotal) + Number(grossTotalOil);
       		document.getElementById("wholeTotal").value =GrandGrossTotalOil; 
         	
        	},
       
		pager: "#jqGridPager7",
		
		
		
	});
	

	
	if(count==0 || count==null)
	{
		 // $("#list4").addRowData(i,jsonData[i]);
		  $("#listOil").addRowData(0,jsonData.offer);
	}
	 $('#listOil').navGrid('#jqGridPager7',
                
                { edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
                
                {
                    editCaption: "The Edit Dialog",
                    afterSubmit: function() {
                		$('#listOil').trigger( 'reloadGrid' );
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
                		$('#listOil').trigger( 'reloadGrid' );
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
                		
                		var rowId =$("#listOil").jqGrid('getGridParam','selrow');  
                        var rowData = jQuery("#listOil").getRowData(rowId);
                     	var quantity = rowData['quantitydouble'];
                     	var salePrice = rowData['salePrice'];
                     	var discount = rowData['discount'];
                     	var discountAmt = rowData['discountAmt'];
                     	var gst = rowData['vat'];
                    	var igst = rowData['igst'];
                    	var SalePriceExTax = rowData['SalePriceExTax'];
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
        					$("#listOil").jqGrid("setCell",rowId, "igst", abc);

        					$("#listOil").jqGrid("setCell",rowId, "gst", abc);
        					$("#listOil").jqGrid("setCell",rowId, "taxAmt", pqr);
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
        					$("#listOil").jqGrid("setCell",rowId, "igst", abc);

        					$("#listOil").jqGrid("setCell",rowId, "gst", abc);
        					$("#listOil").jqGrid("setCell",rowId, "taxAmt", pqr);
        					return false;
        					}
        				
        				}
                    	
                    	if(igst >0 && gst > 0 )
        				{
        				var abc ="0";
        				alert(" Please Enter GST Number OR IGST Number");
        				$("#listOil").jqGrid("setCell",rowId, "igst", abc);

        				$("#listOil").jqGrid("setCell",rowId, "gst", abc);
        				return false;
        				}*/
                    	
                    	//tota = quantity * salePrice;
                    	totAmt = quantity * salePrice;
                    	$("#listOil").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
                    	/*var totalIncDisc= (tota*(discount/100));
                    	var finalTotal= totAmt-totalIncDisc;
                    	$("#listOil").jqGrid("setCell", rowId, "discountAmt", totalIncDisc);
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
                    		
                        	//var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
                        	}
                        	else if(igst !=null || igst!=0|| igst!=""){
                        		
                        		BPExTax=totAmt/(1+(igst/100));
                        		taxAmount=totAmt-BPExTax;
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
                    	$("#listOil").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
                    	$("#listOil").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
                    	$("#listOil").jqGrid("setCell", rowId, "taxAmt", taxAmount.toFixed(2));
                     	$("#listOil").jqGrid("setCell", rowId, "total", totAmt.toFixed(2));
                     	var Total = 0;
                    	var count = jQuery("#listOil").jqGrid('getGridParam', 'records');
        				var allRowsInGrid1 = $('#listOil').getGridParam('data');
        				var AllRows=JSON.stringify(allRowsInGrid1);
                        for (var k = 0; k < count; k++) {
                    	var Total1 = allRowsInGrid1[k].total;
                     	
                    	if(Total1 != undefined){
                    		Total = +Total + +Total1;
                    	}
                        }
                            document.getElementById("totalAmountOil").value = Math.round(Total);
                            var totAmount = Math.round(Total);
                     	    var dis = document.getElementById("discountOil").value;
                     	    if(dis != "0"){
                     	    	document.getElementById("grossTotalOil").value = totAmount;
                     	    }
                     	    else{
                     	    	document.getElementById("grossTotalOil").value = (+totAmount - +dis);
                     	    }
                     	    
                     	   var spareGrossTotal = document.getElementById("spareGrossTotal").value;
                     	   var grossTotal = document.getElementById("grossTotal").value;
                           var grossTotalOil = document.getElementById("grossTotalOil").value;
                           GrandGrossTotalOil =Number(spareGrossTotal) + Number(grossTotal) + Number(grossTotalOil);
                   		document.getElementById("wholeTotal").value =GrandGrossTotalOil; 
                     	
                     	
        	        	},
                });
	 
	 
		   });
		
		})
}

//register oil  in database
function resotherbill(){

resOtherBill();
}
function resOtherBill(){
document.getElementById("btnSubmit").disabled = true; 
var params= {};
var count = jQuery("#listOil").jqGrid('getGridParam', 'records');
var allRowsInGrid1 = $('#listOil').getGridParam('data');
var AllRows=JSON.stringify(allRowsInGrid1);
for (var i = 0; i < count; i++) {

	var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
 	params["pk_temp_id"+i] = pk_temp_id;
	
	var item_id = allRowsInGrid1[i].pkProductId;
 	params["item_id"+i] = item_id;
 	
	var itemName = allRowsInGrid1[i].itemName;
	params["itemName"+i] = itemName;
	
	var quantity = allRowsInGrid1[i].quantitydouble;
	params["quantity"+i] = quantity;
	
	/*var barcodeNo = allRowsInGrid1[i].barcodeNo;
	params["barcodeNo"+i] = barcodeNo;
	*/
	var categoryName = allRowsInGrid1[i].categoryName;
	params["categoryName"+i] = categoryName;

	var salePrice = allRowsInGrid1[i].salePrice;
	//alert("salePrice++++"+salePrice)
	params["salePrice"+i] = salePrice;
	
	var total = allRowsInGrid1[i].total;
	params["total"+i] = total;
	
	var hsnSacNo = allRowsInGrid1[i].hsnsacno;
	params["hsnSacNo"+i] = hsnSacNo;
	
	var vat = allRowsInGrid1[i].vat;
	params["vat"+i] = vat;
	
	var igst = allRowsInGrid1[i].igst;
	params["igst"+i] = igst;
	
	var taxAmount = allRowsInGrid1[i].taxAmt;
	params["taxAmount"+i] = taxAmount;
	
	var discountGrid = allRowsInGrid1[i].discount;
	params["discountGrid"+i] = discountGrid;
	
	var discountAmt = allRowsInGrid1[i].discountAmt;
	params["discountAmt"+i] = discountAmt;
	
	var NumberofBarrel = allRowsInGrid1[i].NumberofBarrel;
	params["NumberofBarrel"+i] = NumberofBarrel;
	
	var TotalLitre = allRowsInGrid1[i].TotalLitre;
	params["TotalLitre"+i] = TotalLitre;
	
	var TotalQuan = allRowsInGrid1[i].TotalQuan;
		params["TotalQuan"+i] = TotalQuan;
		
		var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
		
		if(buyPriceExTax == "" || buyPriceExTax == null || buyPriceExTax == undefined){
			buyPriceExTax = 0;
		}
		params["buyPriceExTax"+i] = buyPriceExTax;
		
		 
	
}

    var totalAmount=$('#totalAmountOil').val();
    var discount=$('#discountOil').val();
    if(discount == "" || discount == null || discount == undefined){
    	discount = 0;
    }
    var grossTotal=$('#grossTotalOil').val();
    var wholeTotal=$('#wholeTotal').val();
    
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["discount"] = discount;
	params["grossTotal"] = grossTotal;
	params["wholeTotal"] = wholeTotal;
	
    params["methodName"] = "registerOtherBill1qq";
    
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	    	{  
		           alert(data);
				   //window.open("Other_Bill_PDF.jsp");
				   location.reload(true);
		
			 }
	    	).error(function(jqXHR, textStatus, errorThrown){
	    		if(textStatus==="timeout") {
	    			$(loaderObj).hide();
	    			$(loaderObj).find('#errorDiv').show();
	    		}
	    	});

}


