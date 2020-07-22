
function validateGenerateBillCOPY(){
	
	var BillNo = $('#BillNo').val(); 
	
	var input = document.getElementById('BillNo'), list = document
	.getElementById('seedBillNo'), i, billNo;

	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		billNo = list.options[i].getAttribute('data-value');
	}
	}
	
	if(BillNo != null && BillNo != "" && BillNo != " "){
		if(billNo != null){
			generateBillCOPY();
		}
	 	else{
	 		alert("Invalid Bill Number ! Please select correct Bill number form avaliable list");
		}
	}
 	else{
 		alert("Please select Bill Number first !");
	}
}

function generateBillCOPY() {

	var input = document.getElementById('BillNo'), list = document
	.getElementById('seedBillNo'), i, billNo;

for (i = 0; i < list.options.length; ++i) {
if (list.options[i].value === input.value) {
	billNo = list.options[i].getAttribute('data-value');
}
}
var params = {};
params["billNo"] = billNo;
	
	var params = {};
	params["billNo"] = billNo;

	params["methodName"] = "CustBillCOPY";

	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
				//window.open("Car_bill_PDF_COPY.jsp");
		//		window.open("BillingPdfNew.jsp");
				window.open("customerbillcopy.jsp");
			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function validateGenerateBillCOPYForOtherBill(){
	
	var BillNo = $('#BillNo').val(); 
	
	var input = document.getElementById('BillNo'), list = document
	.getElementById('seedBillNo'), i, billNo;

	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		billNo = list.options[i].getAttribute('data-value');
	}
	}
	
	if(BillNo != null && BillNo != "" && BillNo != " "){
		if(billNo != null){
			generateBillCOPY1();
		}
	 	else{
	 		alert("Invalid Bill Number ! Please select correct Bill number form avaliable list");
		}
	}
 	else{
 		alert("Please select Bill Number first !");
	}
}

function generateBillCOPY1() {

	var input = document.getElementById('BillNo'), 
	list = document.getElementById('seedBillNo'), i, billNo;

	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		billNo = list.options[i].getAttribute('data-value');
	}
	}

	
	var params = {};
	params["billNo"] = billNo;

	params["methodName"] = "OtherBillCOPY";

	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
			//	window.open("Other_Bill_CopyPDF.jsp");
				window.open("otherbillcopy.jsp");

			}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}


function validateGenerateBillCOPYForCreditBill() {

	var input = document.getElementById('BillNo'), 
	list = document.getElementById('seedBillNo'), i, billNo,custName;
//,gstTinNo
	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		billNo = list.options[i].getAttribute('data-value');
		custName = list.options[i].getAttribute('value1');
		gstTinNo = list.options[i].getAttribute('myvalue');
	}
	}

	
	var params = {};
	params["billNo"] = billNo;
//	params["gstTinNo"] = gstTinNo;
	params["custName"] = custName;

	params["methodName"] = "BillCOPYForCreditBill";

	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
//				window.open("CreditCustomerBillCopy.jsp");
				window.open("customerbillcopy.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

//


function validateGenerateBillCOPYess(){
	
	var BillNo = $('#BillNoe').val(); 
	
	var input = document.getElementById('BillNoe'), list = document
	.getElementById('seedBillNoe'), i, billNo;

	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		billNo = list.options[i].getAttribute('data-value');
	}
	}
	
	if(BillNo != null && BillNo != "" && BillNo != " "){
		if(billNo != null){
			generateBillCOPYess();
		}
	 	else{
	 		alert("Invalid Bill Number ! Please select correct Bill number form avaliable list");
		}
	}
 	else{
 		alert("Please select Bill Number first !");
	}
}

function generateBillCOPYess() {

	var input = document.getElementById('BillNoe'), list = document
	.getElementById('seedBillNoe'), i, billNo;

for (i = 0; i < list.options.length; ++i) {
if (list.options[i].value === input.value) {
	billNo = list.options[i].getAttribute('data-value');
}
}
var params = {};
params["billNo"] = billNo;
	
	var params = {};
	params["billNo"] = billNo;

	params["methodName"] = "CustBillCOPYess";

	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
				location.reload(true);
				//window.open("Car_bill_PDF_COPY.jsp");
		//		window.open("BillingPdfNew.jsp");
//				window.open("customerbillcopy.jsp");
				window.open("estimatebillcopypdf.jsp");
	
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}