package com.smt.helper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Query;
import org.hibernate.Session;

import com.smt.bean.SupplierPaymentDetail;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.SupplierPaymentDao;
import com.smt.hibernate.SupplierPaymentBean;
import com.smt.utility.HibernateUtility;



public class SupplierCashBankHelper {

	Double bal  ;
	
	public void regSupplierCashBank(HttpServletRequest request,
			HttpServletResponse response) {

		System.out.println("In helper");
			
			String supplier = request.getParameter("supplier");
			
			String billNo = request.getParameter("billNo");
			
			String totalAmount = request.getParameter("totalAmount");
			
			String bankName = request.getParameter("bankName");
			
			String paymentType = request.getParameter("paymentType");
			
			String paymentMode = request.getParameter("paymentMode");
			
			String chequeNum = request.getParameter("chequeNum");
			
			String cardNum = request.getParameter("cardNum");
			
			String accNum = request.getParameter("accNum");
			
			String personname = request.getParameter("personname");
			
			String nameOnCheck = request.getParameter("nameOnCheck");
			
			String supPay = request.getParameter("supPay");
			
			
			SupplierPaymentBean bean = new SupplierPaymentBean();
			
			
			bean.setSupplier(Long.parseLong(supplier));
			bean.setBillNo(billNo);
			
			bean.setPersonname(personname);
			
			System.out.println("paymentMode "+paymentMode);
			
			//payment details
			if(paymentMode==null){
				bean.setPaymentMode("N/A");
			}
			else{
				bean.setPaymentMode(paymentMode);
			}
		 
		if(paymentMode.equals("cheque")){
			
			 if(chequeNum==null){
					bean.setChequeNum("N/A");
				}
				else{
					bean.setChequeNum(chequeNum);
				}
			 
			 if(nameOnCheck==null){
					bean.setNameOnCheck("N/A");
				}
				else{
					bean.setNameOnCheck(nameOnCheck);
				}
			 }
		else if(paymentMode.equals("card")){
			
				int cardNumLength = cardNum.length();
				 if(cardNumLength > 0){
						
						bean.setCardNum(Long.parseLong(cardNum));
					}
					else{
						bean.setCardNum(null);
					}
		}
	
		else if(paymentMode.equals("neft")){
			 if(bankName==null){
					bean.setBankName("N/A");
				}
				else{
					bean.setBankName(bankName);
				}
			 
		 int accNumLength = accNum.length();
		 if(accNumLength > 0){
			 bean.setAccNum(Long.parseLong(accNum));	
			
			}
			else{
				 bean.setAccNum(null);
			}
		}	
		 
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = new Date();
			System.out.println(dateFormat1.format(dateobj));
		
			bean.setInsertDate(dateobj);
			
			
			HibernateUtility hbu = HibernateUtility.getInstance();
			Session session = hbu.getHibernateSession();
			
			//Query to get latest paid amount
			Query query = session
					.createSQLQuery("SELECT balance ,bill_no from supplier_payment WHERE bill_no =:billNo ORDER BY  pk_supplier_payment_id  DESC LIMIT 1 ;");
			query.setParameter("billNo",billNo);
			List<Object[]> list = query.list();
			
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				Object[] objects = (Object[]) iterator.next();
				String newBal = objects[0].toString();
					//BigDecimal bigDecimal = new BigDecimal(newBal);
	                bal= Double.valueOf(newBal);
				System.out.println(bal);
			}
			
	
		
			if (bal==null) {
				
				Double balance = Double.parseDouble(totalAmount);
				
				if(paymentType.equals("credit"))
				{
					Double newBal = balance - Double.parseDouble(supPay);
					
					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(supPay));
                    if(balance.equals(Double.parseDouble(supPay))){
						GoodReciveDao Npay = new GoodReciveDao();
						Npay.DeActivePaymentDone(billNo,supplier);
						System.out.println("deactivation done");
					}
				}
				
				else{
					if(paymentType.equals("debit"))
					{
						Double newBal = balance + Double.parseDouble(supPay);
						
						bean.setBalance(newBal);
						bean.setPaymentType(paymentType);
						bean.setCredit(Double.parseDouble(supPay));
					}
					else{
					
					bean.setCredit(0.0);
					}
				}
				
				
				
					bean.setTotalAmount(Double.parseDouble(totalAmount));
					
			SupplierPaymentDao dao = new SupplierPaymentDao();
			dao.regSupPayment(bean);
			}
			
			else{
				
				Double balance = Double.parseDouble(totalAmount);
				
				
				
				if(paymentType.equals("credit"))
				{
					Double newBal = bal - Double.parseDouble(supPay);
					
					bean.setBalance(newBal);
					bean.setPaymentType(paymentType);
					bean.setCredit(Double.parseDouble(supPay));
					if(bal.equals(Double.parseDouble(supPay))){
						GoodReciveDao Npay = new GoodReciveDao();
						Npay.DeActivePaymentDone(billNo,supplier);
					}
					
				}
				
				else{
					if(paymentType.equals("debit"))
					{
						Double newBal = bal + Double.parseDouble(supPay);
						/*System.out.println("debit balance = "+supPay);
						System.out.println("current balace = "+balance);
						System.out.println("debit balance = " +newBal);*/
						bean.setBalance(newBal);
						bean.setPaymentType(paymentType);
						bean.setCredit(Double.parseDouble(supPay));
					}
					else{
					
					bean.setCredit(0.0);
					}
				}

				bean.setTotalAmount(Double.parseDouble(totalAmount));
				
				SupplierPaymentDao dao = new SupplierPaymentDao();
				dao.regSupPayment(bean);
				
			}
			
		}

	public List getSupplierPaymentDetailsBySingleDate(
			HttpServletRequest request, HttpServletResponse response) {
		String fDate = request.getParameter("fDate");
		System.out.println(fDate+"Single Date");
		
         Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
 		
         SupplierPaymentDao dao = new SupplierPaymentDao();
 		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsForSingleDate(fDate);
 		
 		
 		return supList;

	}

	public List getSupplierPaymentByTwoDate(HttpServletRequest request,
			HttpServletResponse response) {

		
		String fDate = request.getParameter("fisDate");
        String tDate = request.getParameter("endDate");
		
        Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
		
        SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> sup1List = dao.getSupplierDetailsDateWise(fDate,tDate);
		
		
		return sup1List;
	
	}

	public List getSupplierPaymentDetailsByBillNumber(
			HttpServletRequest request, HttpServletResponse response) {

		String billNo = request.getParameter("billNo");
		String fkSupplierId = request.getParameter("fkSupplierId");
		
         Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
 		
         SupplierPaymentDao dao = new SupplierPaymentDao();
 		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsAsBill(billNo,fkSupplierId);
 		
 		
 		return supList;

	
	}

	public List getSupplierPaymentDetailsByNames(HttpServletRequest request,
			HttpServletResponse response) {
		String fkSupplierId = request.getParameter("fkSupplierId");
		
        Map<Long,SupplierPaymentDetail> map = new HashMap<Long,SupplierPaymentDetail>();
		
        SupplierPaymentDao dao = new SupplierPaymentDao();
		List<SupplierPaymentDetail> supList = dao.getCreditCustPaymentDetailsAsBill(fkSupplierId);
		
		
		return supList;
	}
		
	
	}


