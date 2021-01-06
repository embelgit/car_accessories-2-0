function getProductListbybill()
{
	//var itemName = document.getElementById('itemName').value;
	
    var bill = $('#billId').val();
	
    itemparams={};
	
	itemparams["bill"]= bill;
	
	var count=0;
	var newrow;
	var rowId;

	itemparams["methodName"] = "getProductInGridbill";
	
	$.post('/SMT/jsp/utility/controller.jsp',itemparams,
			function(data)
			{ 
				var jsonData = $.parseJSON(data);
	//			$("#jqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
				$.each(jsonData,function(i, v)
			 {		    
					  
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
			  if(count== null || count==undefined)
				 {
					
					 $("#jqGrid").addRowData(count,jsonData.offer);
					
				 }
			
				    	  
				    	 var TotalQuan = v.TotalQuan;
				    	 var buyPrice = v.buyPrice;
				    	 var buyPriceEx = v.buyPriceEx;
				    	 var buyPriceExTax = v.buyPriceExTax;
				    	 var buyPriceIncTax = v.buyPriceIncTax;
				    	 var catName =v.catName;
				    	 var vardiscount =v.vardiscount;
				    	 var expence = v.expence;
				    	 var grossTotal = v.grossTotal;
				    	 var gstamt =v.gstamt;
				    	 var hsnsacno = v.hsnsacno;
				    	 var igst = v.igst;
				    	 var itemName = v.itemName; 
				    	  var pkid =v.pkid;
				    	  var quantity = v.quantity;
				    	  var salePrice =v.salePrice;
				    	  var sgst = v.sgst;
				    	  var taxAmount =v.taxAmount;
				    	  var total = v.total;
				    	  var vat = v.vat;
				    	  
				    	  
				$("#jqGrid").jqGrid({
					datatype:"local",
					editurl: 'clientArray',
//					colNames: ["ItemName","Category Name","HSN/SAC","Quantity","BPETax ","BuyPrice","Total BP","BPExTax","BPIncTax","SalePrice","GST %","IGST %","TAX AMT","Discount %","DisAmt","Total","--S--"],
					colNames: ["ItemName","Category Name","HSN/SAC","Quantity","BPETax ","BuyPrice","Total BP","BPExTax","BPIncTax","SalePrice","GST %","IGST %","TAX AMT","Total"],
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
					        	   name: "buyPriceEx",
					        	   width: 150,
					        	   editable: true,
					        	  //background-color:"#eee",
					        	   //color: true
					        	    //style="color: red;"
					        	   //color:"#eee"
					        	   
					        	 
					           },
					           {
					        	   name: "buyPrice",
					        	   width: 150,
					        	   editable: true,
					        	 
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
				                /*
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
					           */
					           
					           {
//					        	   name: "Total",
					        	   name: "total",
					        	   width: 200,
								   formatter: 'number',
								  
					        	//   formatter: calculateTotal
					        	
					           },
					      /*     {
					        	   name: "actualprice",
					        	   width: 100,
					        	   editable: true,
					        	 hidden: true
					           }*/
					           ],


					        /*   sortorder : 'desc',
					           multiselect: false,	
					           loadonce: false,
					           viewrecords: true,
//					           width: 1300,
					           shrinkToFit: true,
							   rowheight: 300,
							   footerrow: true,
				               userDataOnFooter: true,
				               grouping: true,
							   rownumbers:true,
							 //  onSelectRow: editRow,
					           rowNum: 11,
					      */     
								sortorder : 'desc',
								loadonce : false,
								viewrecords : true,
								//width : 1400,
								shrinkToFit : true,
								hoverrows : true,
								rownumbers : true,
						//		rowNum : 10,
								'cellEdit' : true,
								autowidth : true,
								pgbuttons : false,
								pginput : false,
					           
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
			                    //	}
			                    	/*else{
		                    			totAmt = quantity * buyPriceEx;
				                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
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
					                    	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
					                    	
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
			                    	$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
			                    	$("#jqGrid").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
			             //       	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
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
		                    	
		                    	/*}
		                    	else{
		                			totAmt = quantity * buyPriceEx;
			                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
	                    
		                    	}*/
		                    	
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
		              //      	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
		                    	//$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt);
		                    	//buy price ex tax user
		                    				                    		
		                    		if(buyPriceEx != "0" && buyPrice == 0){
		                    		
		                    		
		                    			totAmt = quantity * buyPriceEx;
				                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
				                    	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
				                    	
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
				                    	
				                    	

				                    	
		                    		
		                    		}
		                    		
		                    		/*if(buyPriceEx !=0 && buyPrice !=0){
			                    		alert("please enter either BP or BPExtax");
			                    		var abc = 0;
				                    	$("#jqGrid").jqGrid("setCell", rowId, "vat", abc);
				                    	$("#jqGrid").jqGrid("setCell", rowId, "igst", abc);
				                    	return false;
			                    	}*/
			                    	
		                    		
		                    		
		                    	
		                    	$("#jqGrid").jqGrid("setCell", rowId, "buyPriceIncTax", BPIncTax.toFixed(2));
		                    	$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discAmt.toFixed(2));
		                    	$("#jqGrid").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
		                    	$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
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
			})
 	    	.error(function(jqXHR, textStatus, errorThrown){
 	    		if(textStatus==="timeout") {
 	    			$(loaderObj).hide();
 	    			$(loaderObj).find('#errorDiv').show();
 	    		}
 	    	})
		
	
}








//


function getBillForEditGoodReceive()
{
    var bill = $('#billId').val();
	
    itemparams={};
	
	itemparams["bill"]= bill;
	
	var count=0;
	var newrow;
	var rowId;

	itemparams["methodName"] = "getProductInGridbill";
	
	$.post('/SMT/jsp/utility/controller.jsp',itemparams,function(data) {
				
				$("#jqGrid").jqGrid("clearGridData");

				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				
				
				$.each(jsonData, function(i, v) {

				
        			document.getElementById("resolution").value = v.grossTotal;

        			
        			
					$("#jqGrid").jqGrid({
						datatype:"local",
						editurl: 'clientArray',
						colNames: ["ItemName","Category Name","HSN/SAC","Quantity","BPETax ","BuyPrice","Total BP","BPExTax","BPIncTax","SalePrice","GST %","IGST %","TAX AMT","Discount %","DisAmt","Total","--S--","O.Quan"],
//						colNames: ["ItemName","Category Name","HSN/SAC","Quantity","BPETax ","BuyPrice","Total BP","BPExTax","BPIncTax","SalePrice","GST %","IGST %","TAX AMT","Total"],
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
						        	   name: "buyPriceEx",
						        	   width: 150,
						        	   editable: true,
						        	  //background-color:"#eee",
						        	   //color: true
						        	    //style="color: red;"
						        	   //color:"#eee"
						        	   
						        	 
						           },
						           {
						        	   name: "buyPrice",
						        	   width: 150,
						        	   editable: true,
						        	 
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
						            /*{ 	
						    	           name: "taxAmount",//PARTICULARS
						    	           width: 140,
						    	           //formatter: calculateGst
						            },*/
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
//						        	   name: "Total",
						        	   name: "total",
						        	   width: 200,
									   formatter: 'number',
									  
						        	//   formatter: calculateTotal
						        	
						           },
						           {
						        	   name: "actualprice",
						        	   width: 100,
						        	   editable: true,
						        	 hidden: true
						           },
						           {
						        	   name:  "originalquantity",
						        	   width: 100,
						        	   hidden: true
						        	//   editable: true,
						        	//   required:true
						           }
						           ],
						           
								loadonce: false,
								viewrecords: true,
								width: 1150,
								shrinkToFit: true,
				                rowList : [20,30,50],
				                rownumbers: true,
				                rowNum: 10,
				                'cellEdit':true,
				                //"userdata" : {"Total": "2622.99"},
				                
				                afterSaveCell: function () {
				 	        	   // $(this).trigger('reloadGrid');
				                	
/*				 	        	   var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
				                   var rowData = jQuery("#jqGrid").getRowData(rowId);
				              	   var quantity = rowData['quantity'];
				              	   var availquantity = rowData['availquantity'];
				              	   var buyPrice = rowData['buyPrice'];
				              	   var buyPriceEx = rowData['buyPriceEx'];				              	   
				              	   var tota = 0;
				              	   var afterquantity = quantity - availquantity;
				              	   
				              	   if(buyPrice!=0 && buyPriceEx==0){
				              	   tota = afterquantity * buyPrice;
				              	   }
				              	   else{
				              		 tota = afterquantity * buyPriceEx;
				              	   }*/
				              	   
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
			                    	$("#jqGrid").jqGrid("setCell", rowId, "total", totAmt.toFixed(2));	
			                    	
			                    	/*if(discount != "0"){
			                    		discount1 = (BPExTax*(discount/100));
			                    		finaltota = +BPExTax - +discount1;
			                    		//totAmt = +tota;
			                    	}*/
			                    //	}
			                    	/*else{
		                    			totAmt = quantity * buyPriceEx;
				                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
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
			             //       	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
			                       	$("#jqGrid").jqGrid("setCell", rowId, "total", totAmt.toFixed(2));
			                    	//$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt);
			                    	//buy price ex tax user
			                    				                    		
			                    		if(buyPriceEx != "0" && buyPrice == 0){
			                    		
			                    		
			                    			totAmt = quantity * buyPriceEx;
					                    	$("#jqGrid").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
//					                    	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
					                    	$("#jqGrid").jqGrid("setCell", rowId, "total", totAmt.toFixed(2));				                    	
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
//					                    		$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
					                    		$("#jqGrid").jqGrid("setCell", rowId, "total", BPIncTax.toFixed(2));
					                
					                    		
					                    		
					                    		
					                    	}
					                    	if(igst != "0" && gst == 0){
					                    		
					                    		taxAmount=((tota*igst)/100);
					                    		BPIncTax=taxAmount+tota;
//					                    		$("#jqGrid").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
					                    		$("#jqGrid").jqGrid("setCell", rowId, "total", BPIncTax.toFixed(2));
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
			                    	$("#jqGrid").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
			                    	$("#jqGrid").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
			             //       	$("#jqGrid").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
			                    	var Total = 0;
			                    	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
			        				var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
			        				var AllRows=JSON.stringify(allRowsInGrid1);
			                            for (var k = 0; k < count; k++) {
//			                    	var Total1 = allRowsInGrid1[k].Total;
			                    	var Total1 = allRowsInGrid1[k].total;
			                    	if(Total1 != undefined){
			                    		Total = +Total + +Total1;
			                    	} 
			                        }
			                            document.getElementById("resolution").value = Math.round(Total);
			                          //  document.getElementById("resolution1").value = Math.round(Total);
			                            var totAmount = Math.round(Total);
			                            
			                            /*var extraDiscount = document.getElementById("extraDiscount").value;
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
			    	             	    }*/	
				                	
/*				              	   $("#jqGrid").jqGrid("setCell", rowId, "total", tota);
				              	    var parseTotal=  $(this).jqGrid('getCol', 'total', false, 'sum');
				                	$(this).jqGrid('footerData', 'set', { vat: "Total :" });
				                    $(this).jqGrid('footerData', 'set', { total: parseTotal});*/
				 	        	},
//				                footerrow: true, // set a footer row
					
				                /*gridComplete: function() {
				                	
				                	var parseTotal=  $(this).jqGrid('getCol', 'total', false, 'sum');
				                	$(this).jqGrid('footerData', 'set', { vat: "Total :" });
				                    $(this).jqGrid('footerData', 'set', { total: parseTotal});
				    	        	
				                },*/
							
								pager : "#jqGridPager",
								
							});

					$("#jqGrid").addRowData(i, jsonData[i]);
					
					

					$('#jqGrid')
							.navGrid(
									'#jqGridPager',
									// the buttons to appear on the toolbar of the grid
									 { edit: true, add: true, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
									// options for the Edit Dialog
									{
										editCaption : "The Edit Dialog",
										recreateForm : true,
										checkOnUpdate : true,
										checkOnSubmit : true,
										closeAfteredit : true,
										errorTextFormat : function(data) {
											return 'Error: '
													+ data.responseText
										}
									},
									
									//{},

									// options for the Delete Dailog
									{
										//closeAfterdel : true,
										//refreshAfterdel : true,
										//recreateForm : true,
										//checkOnUpdate : true,
										//checkOnSubmit : true,
										
										//errorTextFormat : function(data) {
										//	return 'Error: '
										//			+ data.responseText
										//			
													
									//	},
									});

				});

			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {

		}
	});

}

//
function regGoodReceive(){
	
    var billNo = $('#billId').val();
    if(billNo=="" || billNo==null || billNo==undefined){
    	alert("Please select bill no");
    	return false;
    }
    
	regGoodReceive1();
}

function regGoodReceive1(){
//	document.getElementById("btnSubmit").disabled = true; 
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
		
		/*if((buyPrice=="" || buyPrice == null || buyPrice == 0) && (buyPriceEx=="" || buyPriceEx == null || buyPriceEx == 0)){
			alert("please enter buy price or BPETax in grid");
			document.getElementById("btnSubmit").disabled = false; 
			return false;
		}*/
		
		var TotalQuan = allRowsInGrid1[i].TotalQuan;
		params["TotalQuan"+i] = TotalQuan;
		
		
		var buyPriceExTax = allRowsInGrid1[i].buyPriceExTax;
		params["buyPriceExTax"+i] = buyPriceExTax;
		
		var salePrice = allRowsInGrid1[i].salePrice;
		params["salePrice"+i] = salePrice; 
		
		/*if(salePrice=="" || salePrice == undefined || salePrice == null || salePrice == 0){
			alert("please enter sale price in grid");
			document.getElementById("btnSubmit").disabled = false; 
			return false;
		}*/
		//good good
		/*if(+salePrice < +buyPrice){
			alert("Please Enter Sale Price greater than Buy Price");
			document.getElementById("btnSubmit").disabled = false; 
			return false;
		}*/
		
		var discount = allRowsInGrid1[i].discount;
		params["discount"+i] = discount;
		//done
		var actualprice = allRowsInGrid1[i].actualprice;
		if(actualprice == undefined){
			actualprice = 0;
		}
		params["actualprice"+i] = actualprice;
		
//		var Total = allRowsInGrid1[i].Total;
		var Total = allRowsInGrid1[i].total;
		if(Total == undefined){
			Total = 0;
		}
		params["Total"+i] = Total;
		
		var originalquantity = allRowsInGrid1[i].originalquantity;
		params["originalquantity"+i] = originalquantity;
		
	}
	

	
//		var gst= $('#gst').val();	
//		var supp = $('#supplierId').val();
	    var billNo = $('#billId').val();
//	    var contactPerson=$('#contactPerson').val();
//	    var vat=$('#vat').val();
	//    var pDate = $('#pDate').val();

	    var resolution=$('#resolution').val();
	   
	
		params["billNo"] = billNo;
//		params["contactPerson"] = contactPerson;
//		params["vat"] = vat;
//		params["gst"] = gst;
//		params["pDate"] = pDate;
		params["count"] = count;
//		params["extraDiscount"] = extraDiscount;
//		params["expence"] = expence;
//		params["txPerexpence"] = txPerexpence;
//		params["finalExpenses"] = finalExpenses;
		params["resolution"] = resolution;
//		params["supplierId"] = supplierId;
//		params["supp"] = supp;
		
		params["methodName"] = "updateGoodReceive";
		
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