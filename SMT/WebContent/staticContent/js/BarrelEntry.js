   
function calculateTotal()
{
	var NoBarrel=$('#NoBarrel').val();
	var perlitre=$('#perlitre').val();

	var TotalBarrel=+NoBarrel* +perlitre;
	
	document.getElementById('TotalBarrel').value=TotalBarrel;

}
//
function getgst1(){
	var params= {};
	
	var input = document.getElementById('supplierId1'),
	list = document.getElementById('supplierId_drop'),
	i,supplierId10;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplierId10 = list.options[i].getAttribute('data-value');
		}
	}
	
	$("#gst1").append($("<input/>").attr("value","").text());


	params["productId"]= supplierId10;
	params["methodName"] = "getgstt";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
				  document.getElementById("gst1").value = v.panNo;

		      
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
 	    	

	
}


function productdel(){
	document.getElementById("btn").disabled = true;	
	var params= {};
	var itemName= $('#itemName').val();
	
	
	var input = document.getElementById('catId'),
    list = document.getElementById('catId_drop'),
    i,catId;
    for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	catId = list.options[i].getAttribute('data-value');
    
    }
    
    }
   
    var hsnsacno = $("#hsnsacno").val();
 	var modelName = $("#modelName").val();
 	var categoryName = $("#catId").val();
 	var NoBarrel = $("#NoBarrel").val();
 	//var perlitre = $("#perlitre").val();
 	var TotalBarrel = $("#TotalBarrel").val();
 	//alert("category+++++"+category)
 
 	params["itemName"] = itemName;
 	params["hsnsacno"] = hsnsacno;
   
    params["modelName"] = modelName;
    params["NoBarrel"] = NoBarrel;
    //params["perlitre"] = perlitre;
    params["TotalBarrel"] = TotalBarrel;

    params["catId"] =catId;
    params["categoryName"] =categoryName;
	
	        
	 	   params["methodName"] = "doBarrelDetail";
	 	    
	 	    
	 	    
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

//////////////////Barrel purchase oil item name grid/////////////////



function getProductList1()
{
	//var itemName = document.getElementById('itemName').value;
	
	/*var input = document.getElementById('itemName1'),
    list = document.getElementById('itemId_drop1'),
    i,catName,itemName, hsnsacno;
    for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	itemName = list.options[i].getAttribute('data-value');
    	//catName = list.options[i].getAttribute('data-value');
    	//itemName = list.options[i].getAttribute('myvalue');
    	//hsnsacno = list.options[i].getAttribute('myvalue1');
    }
   }*/
	
	var input = document.getElementById('itemName1'),
    list = document.getElementById('itemId_drop1'),
    i,itemName,model;
    for (i = 0; i < list.options.length; ++i) {
    if (list.options[i].value === input.value) {
    	itemName = list.options[i].getAttribute('data-value');
    //	model = list.options[i].getAttribute('data-value');
    	
    }
   }
    

/*
    var productId = $('#itemName1').val();
    	
    	var splitText = productId.split("  ");
    	
    	var proName = splitText[0];
    	var catname = splitText[1];*/
    //var itemName=itemName.split(",")[0];
    	//var modelName=model.split(",")[1];
    
    itemparams={};
	//alert("ITEMID"+itemName)
	itemparams["itemName"]= itemName;
	//itemparams["modelName"]= modelName;
	//itemparams["hsnsacno"]= hsnsacno;
	
	document.getElementById('itemName1').value = null;
	var count=0;
	var newrow;
	var rowId;
	itemparams["methodName"] = "getProductInGrid1";
	$.post('/SMT/jsp/utility/controller.jsp',itemparams,
			function(data)
			{ 
				var jsonData = $.parseJSON(data);
			
			 count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#jqGrid1").jqGrid('getGridParam','data');
		     var ids = jQuery("#jqGrid1").jqGrid('getDataIDs');
			 
			
			  var ori_quantity,offerId,mod;
			  for (var j = 0; j < count; j++) 
			  {
				offerId = rowdata[j].itemName;
				mod = rowdata[j].modelName;
				
				
				 var rowId = ids[j];
				 var rowData = jQuery('#jqGrid1').jqGrid ('getRowData', rowId);
				
				if (offerId==jsonData.offer.itemName && mod==jsonData.offer.modelName) {
			    	ori_quantity = +rowdata[j].quantity+1;
			    	alert("Product already entered !");
			//    	$("#jqGrid").jqGrid("setCell", rowId, "quantity", ori_quantity);
			    	var grid = jQuery("#jqGrid1");
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
					
					 $("#jqGrid1").addRowData(count,jsonData.offer);
					
				 }
			 
			 
				$("#jqGrid1").jqGrid({
					datatype:"local",
					editurl: 'clientArray',
					colNames: ["ItemName","Category Name","Model Name","HSN/SAC","No.of.barrel","oil per litre","Total Litre","Qty In Litres","BPETax","BuyPrice","Total BP","BPExTax","BPIncTax","SalePrice","GST %","IGST %","TAX AMT","Discount %","DisAmt","Total","--S--"],

					colModel: [
					           { 	
					        	   name: "itemName",//PARTICULARS
					        	   width:200,
					        	 
					           },
					          
					           {
					        	   name:  "categoryName",
					        	   width: 170,
					        	   
					           },
					           {
					        	   name:  "modelName",
					        	   width: 120,
					//        	   hidden: true
					        	   
					           },
					           {
					        	   name:  "hsnsacno",
					        	   width: 120,
					        	   
					           },
					           
					           {
					        	   name:  "NumberofBarrel",
					        	   width: 120,
					        	   editable: true,
					        	  
					        	   
					           },
					           
					           {
					        	   name:  "oilperlitre",
					        	   width: 120,
					        	   hidden: true
					        	   
					           },
					           
					           {
					        	   name:  "TotalLitre",
					        	   width: 120,
					        	   
					           },
					           
					           
					           {
					        	   name:  "quantity",
					        	   width: 100,
					        	   //editable: true,
					        	   //required:true
					        	   hidden: true
					           },

					           
					           
					           {
					        	   name: "buyPriceEx",
					        	   width: 150,
					        	   editable: true,
					        	 
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
					           {
					        	   name: "discount",
					        	   width: 150,
					        	   //editable: true,
					        	   hidden: true
					        	 
					           },
					           
					           {
					        	   name: "discountAmt",
					        	   width: 150,
					        	   //editable: true,
					        	   hidden: true
					        	 
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
					        	   	var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
					        	   	var rowData = jQuery("#jqGrid1").getRowData(rowId);
			                    	var quantity = rowData['NumberofBarrel'];
			                    	var buyPrice = rowData['buyPrice'];
			                    	var discount = rowData['discount'];
			                    	var gst = rowData['vat'];
			                    	var igst = rowData['igst'];
			                    	var buyPriceExTax = rowData['buyPriceExTax'];
			                    	var buyPriceEx = rowData['buyPriceEx'];
			                    	var vatAmt = 0;
			                    	var discount1 = 0;
			                    	var tota = 0;
			                    	var totAmt = 0;
			                    	var ctot = 0;
			                    	var finaltota = 0;
			                    	var BPIncTax=0;
			                    	var BPExTax = 0;
			                    	var BPExTax1 = 0;
			                    	var taxAmount=0;
			                    	
			                    	
			                    	if(buyPrice != "0" && buyPriceEx ==0){
			                    	//tota = quantity * buyPrice;
			                    	totAmt = quantity * buyPrice;
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
			                    	/*}
			                    	else{
			                    		totAmt = quantity * buyPriceEx;
				                    	$("#jqGrid1").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
		                    		
			                    		
			                    	}*/
			                    	/*if(discount != "0"){
			                    		discount1 = ((tota*discount)/100);
			                    		tota = +tota - +discount1;
			                    		totAmt = +tota;
			                    	}*/
			                    	
			                    	if(gst != "0" && igst ==0){
			                    		//vatAmt =  ((tota*(gst))/100);
			                    		//totAmt = +tota + +vatAmt;
			                    		BPExTax=totAmt/(1+(gst/100));
			                    		taxAmount=totAmt-BPExTax;
			                    		
			                    		
			                    	}
			                    	if(igst != "0" && gst == 0){
			                    		//vatAmt =  ((tota*igst)/100);
			                    		//totAmt = +tota + +vatAmt;
			                    		BPExTax=totAmt/(1+(igst/100));
			                    		taxAmount=totAmt-BPExTax;

			                    	}
			                    	if(gst !=0 && igst !=0){
			                    		alert("please enter either gst or igst");
			                    		var abc = 0;
				                    	$("#jqGrid1").jqGrid("setCell", rowId, "vat", abc);
				                    	$("#jqGrid1").jqGrid("setCell", rowId, "igst", abc);
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
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
			                    	
			                    	
			                    	
			                    	//buy price ex tax user
		                    		
		                    		if(buyPriceEx != "0" && buyPrice == 0){
		                    		
		                    		
		                    			totAmt = quantity * buyPriceEx;
				                    	$("#jqGrid1").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
				                    	$("#jqGrid1").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
				                    	
				                    	
				                    	if(discount != "0"){
				                    		
				                    		discount1 = ((totAmt*discount)/100);
				                    		tota = +totAmt - +discount1;
				                    		$("#jqGrid1").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
				                    		//finaltota = +BPExTax1 - +discount1;
				                    		//totAmt = +tota;
				                    	}
				                    	else
				                    		{
				                    		
				                    		discount1 = ((totAmt*discount)/100);
				                    		tota = +totAmt - +discount1;
				                    		$("#jqGrid1").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
				                    		//discount1 = (BPExTax1*(discount/100));
				                    		//finaltota = +BPExTax1 - +discount1;
				                    		
				                    		}
		                    		

				                    	if(gst != "0" && igst ==0){
				                    		
				                    		taxAmount=((tota*(gst))/100);
				                    		BPIncTax=taxAmount+tota;
				                    		$("#jqGrid1").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
				                    		
				                    		
				                    		
				                    	}
				                    	if(igst != "0" && gst == 0){
				                    		
				                    		taxAmount=((tota*igst)/100);
				                    		BPIncTax=taxAmount+tota;
				                    		$("#jqGrid1").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
				                    		
				                    	}
				                    	
				                    	if(gst !=0 && igst !=0){
				                    		alert("please enter either gst or igst");
				                    		var abc = 0;
					                    	$("#jqGrid1").jqGrid("setCell", rowId, "vat", abc);
					                    	$("#jqGrid1").jqGrid("setCell", rowId, "igst", abc);
					                    	return false;
				                    	}
				                    	

				                    	
		                    		
		                    		}
		                    		
		                    		if(buyPriceEx !=0 && buyPrice !=0){
			                    		alert("please enter either BP or BPExtax");
			                    		var abc = 0;
				                    	$("#jqGrid1").jqGrid("setCell", rowId, "vat", abc);
				                    	$("#jqGrid1").jqGrid("setCell", rowId, "igst", abc);
				                    	return false;
			                    	}
			                    		
			                    	
			                    	
			                    	
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "buyPriceIncTax", BPIncTax.toFixed(2));
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
			          //          	$("#jqGrid1").jqGrid("setCell", rowId, "Total", finaltota.toFixed(2));
			                    	var Total = 0;
			                    	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
			        				var allRowsInGrid1 = $('#jqGrid1').getGridParam('data');
			        				var AllRows=JSON.stringify(allRowsInGrid1);
			                            for (var k = 0; k < count; k++) {
			                    	var Total1 = allRowsInGrid1[k].Total;
			                    	if(Total1 != undefined){
			                    		Total = +Total + +Total1;
			                    	} 
			                        }
			                            document.getElementById("resolutionOil").value = Math.round(Total);
			                            document.getElementById("resolutionOil1").value = Math.round(Total);
			                            var totAmount = Math.round(Total);
			                            
			                            var extraDiscount = document.getElementById("extraDiscount1").value;
			                            if(extraDiscount != "0"){
			    	             	    	document.getElementById("resolutionOil").value = totAmount;
			    	             	    }
			    	             	    else{
			    	             	    	var disAmount =  (extraDiscount/100)*totAmount;
			    	            			var gross = +totAmount - +disAmount;
			    	            			document.getElementById("resolutionOil").value = Math.round(gross);
			    	             	    }
			                            
			    	             	    var expence = document.getElementById("expence1").value;
			    	             	    if(expence != "0"){
			    	             	    	document.getElementById("resolutionOil").value = totAmount;
			    	             	    }
			    	             	    else{
			    	             	    	document.getElementById("resolutionOil").value = (+totAmount + +expence);
			    	             	    }
					        	},
					        	  
					           pager: "#jqGridPager"
			      });
				
				var lastSelection;

	            function editRow(id) {
	                if (id && id !== lastSelection) {
	                    var grid = $("#jqGrid1");
	                    grid.jqGrid('restoreRow',lastSelection);
	                    grid.jqGrid('editRow',id, {keys: true} );
	                    lastSelection = id;
	                }
	            }
					        	

				
				if(count==0 || count==null)
				{
					$("#jqGrid1").addRowData(0,jsonData.offer);
				}
				
				$('#jqGrid1').navGrid('#jqGridPager',
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


								
								   var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
			                       var rowData = jQuery("#jqGrid1").getRowData(rowId);
			                    	var quantity = rowData['quantity'];
			                    	var buyPrice = rowData['buyPrice'];
			                    	
			                    	var tota = quantity * buyPrice;

			                    	$("#jqGrid1").jqGrid("setCell", rowId, "Total", tota);
								
			                    	
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
		                		
		                		
							 	var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
				        	   	var rowData = jQuery("#jqGrid1").getRowData(rowId);
		                    	var quantity = rowData['NumberofBarrel'];
		                    	var buyPrice = rowData['buyPrice'];
		                    	var discount = rowData['discount'];
		                    	var gst = rowData['vat'];
		                    	var igst = rowData['igst'];
		                    	var buyPriceExTax = rowData['buyPriceExTax'];
		                    	var buyPriceEx = rowData['buyPriceEx'];
		                    	var vatAmt = 0;
		                    	var discount1 = 0;
		                    	var tota = 0;
		                    	var totAmt = 0;
		                    	var ctot = 0;
		                    	var finaltota = 0;
		                    	var BPIncTax=0;
		                    	var BPExTax = 0;
		                    	var BPExTax1 = 0;
		                    	var taxAmount=0;
		                    	
		                    	if(buyPrice != "0" && buyPriceEx ==0){
			                    	
		                    	
		                    	//tota = quantity * buyPrice;
		                    	totAmt = quantity * buyPrice;
		                    	$("#jqGrid1").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
		                   
		                    	/*}
		                    	else{
		                    		
		                    		totAmt = quantity * buyPriceEx;
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
	                    		
		                    	}*/
		                    	/*if(discount != "0"){
		                    		discount1 = ((tota*discount)/100);
		                    		tota = +tota - +discount1;
		                    		totAmt = +tota;
		                    	}*/
		                    	
		                    	if(gst != "0" && igst ==0){
		                    		//vatAmt =  ((tota*(gst))/100);
		                    		//totAmt = +tota + +vatAmt;
		                    		BPExTax=totAmt/(1+(gst/100));
		                    		taxAmount=totAmt-BPExTax;
		                    		
		                    		
		                    	}
		                    	if(igst != "0" && gst == 0){
		                    		//vatAmt =  ((tota*igst)/100);
		                    		//totAmt = +tota + +vatAmt;
		                    		BPExTax=totAmt/(1+(igst/100));
		                    		taxAmount=totAmt-BPExTax;

		                    	}
		                    	/*if(gst !=0 && igst !=0){
		                    		alert("please enter either gst or igst");
		                    		var abc = 0;
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "vat", abc);
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "igst", abc);
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
		                    	$("#jqGrid1").jqGrid("setCell", rowId, "buyPriceExTax", BPExTax.toFixed(2));
		                    	$("#jqGrid1").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
		                    	$("#jqGrid1").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
		                    	$("#jqGrid1").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
		                    	
		                    	
		                    	
		                    	//buy price ex tax user
	                    		
	                    		if(buyPriceEx != "0" && buyPrice == 0){
	                    		
	                    		
	                    			totAmt = quantity * buyPriceEx;
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "TotalQuan", totAmt.toFixed(2));
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "Total", totAmt.toFixed(2));
			                    	
			                    	if(discount != "0"){
			                    		
			                    		discount1 = ((totAmt*discount)/100);
			                    		tota = +totAmt - +discount1;
			                    		$("#jqGrid1").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
			                    		//finaltota = +BPExTax1 - +discount1;
			                    		//totAmt = +tota;
			                    	}
			                    	else
			                    		{
			                    		
			                    		discount1 = ((totAmt*discount)/100);
			                    		tota = +totAmt - +discount1;
			                    		$("#jqGrid1").jqGrid("setCell", rowId, "discountAmt", discount1.toFixed(2));
			                    		//discount1 = (BPExTax1*(discount/100));
			                    		//finaltota = +BPExTax1 - +discount1;
			                    		
			                    		}
	                    		

			                    	if(gst != "0" && igst ==0){
			                    		
			                    		taxAmount=((tota*(gst))/100);
			                    		BPIncTax=taxAmount+tota;
			                    		$("#jqGrid1").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
			                    		
			                    		
			                    		
			                    	}
			                    	if(igst != "0" && gst == 0){
			                    		
			                    		taxAmount=((tota*igst)/100);
			                    		BPIncTax=taxAmount+tota;
			                    		$("#jqGrid1").jqGrid("setCell", rowId, "Total", BPIncTax.toFixed(2));
			                    		
			                    	}
			                    	
			                    	

			                    	
	                    		
	                    		}
	                    		
	                    		/*if(buyPriceEx !=0 && buyPrice !=0){
		                    		alert("please enter either BP or BPExtax");
		                    		var abc = 0;
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "vat", abc);
			                    	$("#jqGrid1").jqGrid("setCell", rowId, "igst", abc);
			                    	return false;
		                    	}
		                    		*/
		                    	
		                    	
		                    	
		                    	$("#jqGrid1").jqGrid("setCell", rowId, "buyPriceIncTax", BPIncTax.toFixed(2));
		                    	$("#jqGrid1").jqGrid("setCell", rowId, "discountAmt", discount1);
		                    	$("#jqGrid1").jqGrid("setCell", rowId, "gstamt", taxAmount.toFixed(2));
		                    	//$("#jqGrid1").jqGrid("setCell", rowId, "Total", finaltota);
		                    	var Total = 0;
		                    	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
		        				var allRowsInGrid1 = $('#jqGrid1').getGridParam('data');
		        				var AllRows=JSON.stringify(allRowsInGrid1);
		                            for (var k = 0; k < count; k++) {
		                    	var Total1 = allRowsInGrid1[k].Total;
		                    	if(Total1 != undefined){
		                    		Total = +Total + +Total1;
		                    	} 
		                        }
		                            document.getElementById("resolutionOil").value = Math.round(Total);
		                            document.getElementById("resolutionOil1").value = Math.round(Total);
		                            var totAmount = Math.round(Total);
		                            
		                            var extraDiscount = document.getElementById("extraDiscount1").value;
		                            if(extraDiscount != "0"){
		    	             	    	document.getElementById("resolutionOil").value = totAmount;
		    	             	    }
		    	             	    else{
		    	             	    	var disAmount =  (extraDiscount/100)*totAmount;
		    	            			var gross = +totAmount - +disAmount;
		    	            			document.getElementById("resolutionOil").value = Math.round(gross);
		    	             	    }
		                            
		    	             	    var expence = document.getElementById("expence1").value;
		    	             	    if(expence != "0"){
		    	             	    	document.getElementById("resolutionOil").value = totAmount;
		    	             	    }
		    	             	    else{
		    	             	    	document.getElementById("resolutionOil").value = (+totAmount + +expence);
		    	             	    }
		                		
		                		
							},
							errorTextFormat: function (data) {
								return 'Error: ' + data.responseText
							},
							onSelectRow: function(id) {
								if (id && id !== lastSel) {
									jQuery("#jqGrid1").saveRow(lastSel, true, 'clientArray');
									jQuery("#jqGrid1").editRow(id, true);
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

//oil barrel grid details and form storing in database
function validateRegGoodReceiveOil(){
	
		var billNo= $('#billNo1').val();
		var supplierId= $('#supplierId1').val();
		var contactPerson= $('#contactPerson1').val();
		var pDate= $('#pDate1').val();
		var expence= $('#expence1').val();
		var totalAmount= $('#resolutionOil').val();
		
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
										 	regGoodReceiveOil();
								//		}
									 	/*else{
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

function regGoodReceiveOil(){
document.getElementById("btnSubmit1").disabled = true; 


/*var input1 = document.getElementById('itemName1'),
list1 = document.getElementById('itemId_drop1'),
i,itemId,catname;
for (i = 0; i < list1.options.length; ++i) {
if (list1.options[i].value === input1.value) {
	//itemId = list1.options[i].getAttribute('data-value');
	catname = list1.options[i].getAttribute('data-value');
}
}

var purchaseId=itemId.split(",")[0];
var prodId=itemId.split(",")[1];
alert("BRANDNAME++++++"+prodId)*/




var params= {};
var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
var allRowsInGrid1 = $('#jqGrid1').getGridParam('data');
var AllRows=JSON.stringify(allRowsInGrid1);
for (var i = 0; i < count; i++) {

var itemName = allRowsInGrid1[i].itemName;
	params["itemName"+i] = itemName;
	
	var hsnsacno = allRowsInGrid1[i].hsnsacno;
	params["hsnsacno"+i] = hsnsacno;
	
//	var vat = allRowsInGrid1[i].vat * 2;
	var vat = allRowsInGrid1[i].vat;
	params["vat"+i] = vat;
	
	var igst = allRowsInGrid1[i].igst;
	
	if(igst == undefined){
		igst = 0;
	}
	params["igst"+i] = igst;
	
	var gstamt = allRowsInGrid1[i].gstamt;
	params["gstamt"+i] = gstamt;

	var catName = allRowsInGrid1[i].categoryName;
	params["catName"+i] = catName;
	
    var quantity = allRowsInGrid1[i].quantity;
	params["quantity"+i] = quantity;
	
	
var buyPrice = allRowsInGrid1[i].buyPrice;
params["buyPrice"+i] = buyPrice;

var buyPriceEx = allRowsInGrid1[i].buyPriceEx;
params["buyPriceEx"+i] = buyPriceEx;


if((buyPrice=="" || buyPrice == null || buyPrice == 0) && (buyPriceEx=="" || buyPriceEx == null || buyPriceEx == 0)){
	alert("please enter buy price or BPETax in grid");
	document.getElementById("btnSubmit1").disabled = false; 
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
	document.getElementById("btnSubmit1").disabled = false; 
	return false;
}

/*if(+salePrice < +buyPrice){
	alert("Please Enter Sale Price greater than Buy Price");
	document.getElementById("btnSubmit1").disabled = false; 
	return false;
}*/

var NumberofBarrel = allRowsInGrid1[i].NumberofBarrel;
params["NumberofBarrel"+i] = NumberofBarrel; 

var TotalLitre = allRowsInGrid1[i].TotalLitre;
params["TotalLitre"+i] = TotalLitre; 

var discount = allRowsInGrid1[i].discount;
params["discount"+i] = discount;

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

var modelName = allRowsInGrid1[i].modelName;
//alert("MDL++++++"+modelName)
params["modelName"+i] = modelName;


}


var input = document.getElementById('supplierId1'),
list = document.getElementById('supplierId_drop'),
i,supplierId;
for (i = 0; i < list.options.length; ++i) {
if (list.options[i].value === input.value) {
	supplierId = list.options[i].getAttribute('data-value');
}
}


var gst1 = $('#gst1').val();

var supp = $('#supplierId1').val();

var billNo = $('#billNo1').val();
var contactPerson=$('#contactPerson1').val();
var vat=$('#vat1').val();
var pDate = $('#pDate1').val();
var extraDiscount = $('#extraDiscount1').val();
if(extraDiscount == ""){
	extraDiscount = 0;
}
var expence=$('#expence1').val();
if(expence == ""){
	expence = 0;
}
var txPerexpence= $('#txPerexpence1').val();
if(txPerexpence == ""){
	txPerexpence = 0;
}
var finalExpenses= $('#finalExpenses1').val();
if(finalExpenses == ""){
	finalExpenses = 0;
}
var resolution=$('#resolutionOil').val();

params["gst1"] = gst1;
params["billNo"] = billNo;
params["contactPerson"] = contactPerson;
params["vat"] = vat;
params["supp"] = supp;
params["pDate"] = pDate;
params["count"] = count;
params["extraDiscount"] = extraDiscount;
params["expence"] = expence;
params["txPerexpence"] = txPerexpence;
params["finalExpenses"] = finalExpenses;
params["resolution"] = resolution;
params["supplierId"] = supplierId;


params["methodName"] = "regGoodReceiveOil";

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

////billing oil module grid///////////

function getProductInGridBillingOil()
{
	
	var value = document.getElementById("itemName1").value;
	var splitText = value.split(" => ");
	var productId1 = splitText[0];
	var mod = splitText[1];
	var cat = splitText[2];
	//var carNo = $('#carNo').val();
	
	var params= {};
	
	params["productId"]=productId1;
	params["mod"] = mod;
	params["cat"] = cat;
	params["methodName"] ="getProductInGridBillingOil";
	
	document.getElementById('itemName1').value = null;
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
	         count = jQuery("#listOil").jqGrid('getGridParam', 'records'); 
		     var rowdata =$("#listOil").jqGrid('getGridParam','data');
		     var ids = jQuery("#listOil").jqGrid('getDataIDs');
		     
			  var prodName,com,bar,mod;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].itemName;
				  com = rowdata[j].categoryName;
				  mod = rowdata[j].modelName;
				  //bar = rowdata[j].barcodeNo;
				 var rowId = ids[j];
				 var rowData = jQuery('#listOil').jqGrid ('getRowData', rowId);
				
				if (prodName == jsonData.offer.itemName && com == jsonData.offer.categoryName && mod == jsonData.offer.modelName) {
			    	
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
			
			colNames:['pk_temp_id','item_id','CatName','ItemName','Brand Name','HSN/SAC','No.of.barrels','Total litres','Qty in ltr','SalePrice',"Total SP","SPExTax",'GST%','IGST%','Tax Amt','Discount','DiscountAmt','Total Amt'],
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
				 {	name:'modelName',
			    	 width:140,
					
				},
				 {	name:'hsnsacno',
			    	 width:90,
					
				},
				 {	name:'NumberofBarrel',
			    	 width:100,
			    	 hidden:true,
					
				},
				 {	name:'TotalLitre',
			    	 width:100,
					
				},
				
				{	name:'quantitydouble',
					width:100,
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
		        	   width: 130,
		        	   //editable: true,
		        	 
		           },
		           
		           {
		        	   name: "buyPriceExTax",
		        	   width: 130,
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

    var paymentMode = $('#paymentMode').val();
    
    var Customername = $('#CustomerId').val();
    
    if(paymentMode=="Credit" && Customername=="")
    {

    	return false;
    }
	
    var count1 = jQuery("#list5").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#list5').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count1; i++) 
	{
		var quantity1 = allRowsInGrid1[i].quantity;
		if(quantity1=="" || quantity1==null || quantity1==undefined || quantity1==0){
	//		alert("Please enter quantity in service grid");
			return false;
		}
		
		var salePrice1 = allRowsInGrid1[i].salePrice;
		
		if(salePrice1=="" || salePrice1==null || salePrice1==undefined || salePrice1==0){
	//		alert("Please enter sale price in service grid");
			return false;
		}

	}
    
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
		if(pk_temp_id=="" || pk_temp_id==null || pk_temp_id==undefined){
			pk_temp_id=0;
		 }
     	params["pk_temp_id"+i] = pk_temp_id;
		
		var item_id = allRowsInGrid1[i].pkProductId;
		if(item_id=="" || item_id==null || item_id==undefined){
			item_id=0;
		 }
		params["item_id"+i] = item_id;
     	
		var itemName = allRowsInGrid1[i].itemName;
		if(itemName=="" || itemName==null || itemName==undefined){
			itemName="NA";
		 }
		params["itemName"+i] = itemName;
		
		var quantity = allRowsInGrid1[i].quantitydouble;
		if(quantity=="" || quantity==null || quantity==undefined){
			quantity=0;
		 }
		params["quantity"+i] = quantity;
		
		/*var barcodeNo = allRowsInGrid1[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		*/
		var categoryName = allRowsInGrid1[i].categoryName;
		if(categoryName=="" || categoryName==null || categoryName==undefined){
			categoryName="NA";
		 }
		params["categoryName"+i] = categoryName;

		var salePrice = allRowsInGrid1[i].salePrice;
		//alert("salePrice++++"+salePrice)
		if(salePrice=="" || salePrice==null || salePrice==undefined){
			salePrice=0;
		 }
		params["salePrice"+i] = salePrice;
		
		var total = allRowsInGrid1[i].total;
		if(total=="" || total==null || total==undefined){
			total=0;
		 }
		params["total"+i] = total;
		
		var hsnSacNo = allRowsInGrid1[i].hsnsacno;
		if(hsnSacNo=="" || hsnSacNo==null || hsnSacNo==undefined){
			hsnSacNo=0;
		 }
		params["hsnSacNo"+i] = hsnSacNo;
		
		var vat = allRowsInGrid1[i].vat;
		if(vat=="" || vat==null || vat==undefined){
			vat=0;
		 }
		params["vat"+i] = vat;
		
		var igst = allRowsInGrid1[i].igst;
		if(igst=="" || igst==null || igst==undefined){
			igst=0;
		 }
		params["igst"+i] = igst;
		
		var taxAmount = allRowsInGrid1[i].taxAmt;
		if(taxAmount=="" || taxAmount==null || taxAmount==undefined){
			taxAmount=0;
		 }
		params["taxAmount"+i] = taxAmount;
		
		var discountGrid = allRowsInGrid1[i].discount;
		if(discountGrid=="" || discountGrid==null || discountGrid==undefined){
			discountGrid=0;
		 }
		params["discountGrid"+i] = discountGrid;
		
		var discountAmt = allRowsInGrid1[i].discountAmt;
		if(discountAmt=="" || discountAmt==null || discountAmt==undefined){
			discountAmt=0;
		 }
		params["discountAmt"+i] = discountAmt;
		
		var NumberofBarrel = allRowsInGrid1[i].NumberofBarrel;
		if(NumberofBarrel=="" || NumberofBarrel==null || NumberofBarrel==undefined){
			NumberofBarrel=0;
		 }
		params["NumberofBarrel"+i] = NumberofBarrel;
		
		var TotalLitre = allRowsInGrid1[i].TotalLitre;
		if(TotalLitre=="" || TotalLitre==null || TotalLitre==undefined){
			TotalLitre=0;
		 }
		params["TotalLitre"+i] = TotalLitre;
		
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
	
	    var oildescription=$('#oildescription').val();
	    if(oildescription=="" || oildescription==null || oildescription==undefined){
	    	oildescription="NA";
	    }
	    

	    var totalAmount=$('#totalAmountOil').val();
	    if(totalAmount == "" || totalAmount == null || totalAmount == undefined){
	    	totalAmount = 0;
	    }
	    var discount=$('#discountOil').val();
	    if(discount == "" || discount == null || discount == undefined){
	    	discount = 0;
	    }
	    var grossTotal=$('#grossTotalOil').val();
	    if(grossTotal == "" || grossTotal == null || grossTotal == undefined){
	    	grossTotal = 0;
	    }
	    var wholeTotal=$('#wholeTotal').val();
	    var bill=$('#bill').val();
	    
	    var Customername = $('#CustomerId').val();
	    if(Customername=="" || Customername==null || Customername==undefined){
			Customername="NA";
		}
	    var gstNo = $('#gstNo').val();
	    if(gstNo=="" || gstNo==null || gstNo==undefined){
			gstNo="0";
		}
	    var ownerName=$('#ownerName').val();
	    
		params["Customername"] = Customername;
		params["gstNo"]  =gstNo;
		params["ownerName"] = ownerName;
	    params["bill"] = bill;
		params["count"] = count;
		params["totalAmount"] = totalAmount;
		params["discount"] = discount;
		params["grossTotal"] = grossTotal;
		params["wholeTotal"] = wholeTotal;
		params["oildescription"] = oildescription;
		
	    params["methodName"] = "registerOtherBill1";
	    
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

////List of barrel entry form//////

function getAllMAinItem(){
	
	
	var params= {};
	
	params["methodName"] = "getAllMAinItemOil";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		
		$('#itemName').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		
		
		$(document).ready(function() {
		 var total =   $('#itemName').DataTable( {
			 
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
                    {"data": "categoryName", "width": "5%", "defaultContent": ""},
		            {"data": "item_name", "width": "5%", "defaultContent": ""},
		            {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
		            {"data": "modelName", "width": "5%", "defaultContent": ""},
		            {"data": "NumberofBarrel", "width": "5%", "defaultContent": ""},
		            {"data": "TotalLitre", "width": "5%", "defaultContent": ""},
		            
		            
		        ],
		      
		        
		    } );
		} );
		
	var mydata = catmap;
	$('#itemName').dataTable().fnAddData(mydata);
	
		}

	);
	
}	



//Update Barrel entry details

function updateProduct(){
	
var itemName = $('#itemName').val();
	
	if(itemName != null && itemName != "" && itemName != " ")
		{
		updateProduct1();
		}
	else{
			alert("Please Enter Product name");
		}

}



function updateProduct1(){

	
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

/********* get Product Details for edit ************/
function getProductDetails(){
	var params= {};
	
	var input = document.getElementById('product'),
     list = document.getElementById('sup_drop'),
     	i,fkRootSupId;
	 		for (i = 0; i < list.options.length; ++i) {
			     if (list.options[i].value === input.value) {
			    	 fkRootSupId = list.options[i].getAttribute('data-value');
			     }
	 		}
	
	$("#itemName").append($("<input/>").attr("value","").text());
	$("#modelName").append($("<input/>").attr("value","").text());
	$("#hsnsacno").append($("<input/>").attr("value","").text());
	
	$("#NoBarrel").append($("<input/>").attr("value","").text());
	$("#TotalBarrel").append($("<input/>").attr("value","").text());
	
	params["productId"]= fkRootSupId;
	params["methodName"] = "getProductDetailsToEditOil";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
				  document.getElementById("itemName").value = v.ProName;
			      document.getElementById("modelName").value = v.ModelName;
			      document.getElementById("hsnsacno").value = v.hsnsacno;
			      document.getElementById("NoBarrel").value = v.NumberofBarrel;
			      document.getElementById("TotalBarrel").value = v.TotalLitre;
		      
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});
 	    	
}